
import React, { lazy, Suspense } from 'react'
import { registerCharts } from 'components/charts'

const LoaderComponent =  (componentName: string) => {
  const Component = lazy(() => import(`components/charts/${componentName}`))
  const SuspenseComponent = (props: any) => (
    <Suspense fallback={<div>loading...</div>}>
      <Component {...props}/>
    </Suspense>
  )

  // @ts-ignore
  SuspenseComponent.defaultProps = registerCharts[componentName].defaultProps || {}
  // @ts-ignore
  SuspenseComponent.editableAttrs = registerCharts[componentName].editableAttrs || []

  return SuspenseComponent
}

export default LoaderComponent