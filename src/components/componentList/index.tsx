// 这里放注册过的组件，主要在leftSider和renderer中使用
// 对组件库的组件进行封装一层,达到以下效果
// 1、可以对外提供可配置的属性
// 2、可以拖拽到画布或者在画布中拖动布局

import { ComponentClass, ReactNode } from 'react'
import WDButton from './WDButton'
import WDSelect from './WDSelect'



export const registerComponents: ComponentMap = {}

export const registerComponent = (Component: ComponentWithConfig ) => {
  const config = Component.getComponentConfig()
  const { componentName } = config
  registerComponents[componentName] = config
}

registerComponent(WDButton)
registerComponent(WDSelect)
registerComponent(WDSelect)

interface ComponentWithConfig extends ComponentClass {
  getComponentConfig: () => ComponentConfig;
}

export interface ComponentConfig {
  label: string,
  componentName: string,
  imgSrc: string
}

export interface ComponentMap {
  [key: string]: ComponentConfig
}

