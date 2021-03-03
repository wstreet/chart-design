
import React, { lazy, Suspense } from 'react'

const LoaderComponent =  (componentName: string) => {
  const Component = lazy(() => import(`../components/charts/${componentName}/index.tsx`))
  const SuspenseComponent = (props: any) => (
    <Suspense fallback={<div>loading...</div>}>
      <Component {...props}/>
    </Suspense>
  )
  return SuspenseComponent
}

export const loaderConfig = (componentName: string, file: string) => {
  const defProps = require(`../components/charts/${componentName}/${file}.ts`)
  return defProps
}

export default LoaderComponent