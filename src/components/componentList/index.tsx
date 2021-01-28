// 这里放注册过的组件，主要在leftSider和renderer中使用
// 对组件库的组件进行封装一层,达到以下效果
// 1、可以对外提供可配置的属性
// 2、可以拖拽到画布或者在画布中拖动布局
import { ReactNode } from 'react'
import { ComponentClass } from 'react'
import WDButton from './WDButton'




export const registerComponents: ComponentMap = {}

export const registerComponent = (Component: ComponentWithConfig ) => {
  const config = Component.getComponentConfig()
  const { componentName } = config
  registerComponents[componentName] = config
}

// registerComponent(WDButton)

interface ComponentWithConfig extends ComponentClass {
  getComponentConfig: () => ComponentConfig;
}

interface DefaultProps {
  [key: string]: any
}

interface DataSourceItem {
  label: string,
  value: string
}

export interface EditableAttr {
  attrs: any
  title?: ReactNode
  key?: string
  attrKey: string,
  name: string
  viewType: string,
  valueType: string,
  dataSource?: DataSourceItem[]
}

export interface ComponentConfig {
  label: string,
  componentName: string,
  imgSrc: string,
  defaultProps: DefaultProps
  editableAttrs: EditableAttr[]
}

export interface ComponentMap {
  [key: string]: ComponentConfig
}

