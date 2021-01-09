
import React, { lazy, Suspense } from 'react'

const LoaderComponent =  (componentName: string) => {
  const Component = lazy(() => import(`components/componentList/${componentName}`))
  return (props: any) => (
    <Suspense fallback={<div>loading...</div>}>
      <Component {...props}/>
    </Suspense>
  )
}

export default LoaderComponent