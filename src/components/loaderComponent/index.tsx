
import React, { lazy, Suspense } from 'react'
import { registerCharts } from 'components/charts'

const LoaderComponent =  (componentName: string) => {
  const Component = lazy(() => import(`components/charts/${componentName}`))
  const SuspenseComponent = (props: any) => (
    <Suspense fallback={<div>loading...</div>}>
      <Component {...props}/>
    </Suspense>
  )
  return SuspenseComponent
}

export const loaderConfig = (componentName, file) => {
  const defProps = require(`components/charts/${componentName}/${file}`)
  return defProps
}

export default LoaderComponent