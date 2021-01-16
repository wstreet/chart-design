
import React, { lazy, Suspense } from 'react'
import { registerComponents } from '../componentList'

const LoaderComponent =  (componentName: string) => {
  const Component = lazy(() => import(`components/componentList/${componentName}`))
  const SuspenseComponent = (props: any) => (
    <Suspense fallback={<div>loading...</div>}>
      <Component {...props}/>
    </Suspense>
  )

  SuspenseComponent.defaultProps = registerComponents[componentName].defaultProps || {}
  SuspenseComponent.editableAttrs = registerComponents[componentName].editableAttrs || []

  return SuspenseComponent
}

export default LoaderComponent