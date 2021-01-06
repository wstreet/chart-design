// 这里放注册过的组件，主要在leftSider和renderer中使用
// 对组件库的组件进行封装一层,达到以下效果
// 1、可以对外提供可配置的属性
// 2、可以拖拽到画布或者在画布中拖动布局

import { ComponentType, ReactNode } from 'react'
import WDButton from './Button'
import WDSelect from './Select'



export const registerComponentList: ComponentList = []

export const registerComponent = (label: string, component:ComponentType ) => {
  registerComponentList.push({
    label,
    component
  })
}

registerComponent('按钮', WDButton)
registerComponent('按钮2', WDButton)
registerComponent('按钮3', WDButton)
registerComponent('按钮4', WDButton)
registerComponent('按钮5', WDButton)
// registerComponent('选择器', WDSelect)


export interface Component {}


export interface ComponentItem {
  label: string,
  component: ComponentType
}

export type ComponentList = ComponentItem[]

