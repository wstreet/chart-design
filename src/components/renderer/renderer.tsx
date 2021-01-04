import React from 'react'
import  { Button, Select } from 'antd'
import './index.less'

export class Renderer extends React.Component<Renderer.Props, Renderer.State> {
  
  options: Renderer.Options = {
    componentMap: {
      // 这里的组件应该再封装一下，支持拖动
      Button,
      Select
    }
  }
  
  getComponent = (name: string): any => {
    let Component = this.options.componentMap[name]
    if (!Component) {
      console.log('组件不存在')
      return () => null
    }
    return Component
  }

  renderComponent = (
    componentList: Renderer.ComponentList
  ):React.ReactNode => {
    return componentList.map(config => {
      const { component, props, id } = config
      const Component = this.getComponent(component)

      const { children, content } = props
      let value = content || ''
      if (children) {
        value = this.renderComponent(children) 
      }
      // if (children) {
      //   return <Component
      //     key={id}
      //     { ...props }
      //   >
      //     {this.renderComponent(children)}
      //   </Component>
      // }

      return <Component
        key={id}
        { ...props }
        children={value}
      />
    })
  }


  render() {
    const { componentList } = this.props
    return (
      <div className="renderer-container">
        {
          this.renderComponent(componentList)
        }
      </div>
    )
  }
}

export namespace Renderer {
  // antd组件的props
  export interface ComponentProps {
    children?: ComponentList
    [propKey: string]: any
  }

  export type Component = (props: ComponentProps) => React.ReactNode

  interface componentMap {
    [componentKey: string]: Component
  }

  export interface Options {
    componentMap: componentMap
  }

  export interface Attr {
    key: string,
    name: string,
    viewType: string,
    defaultValue: string | number
    dataSource?: any
  }
  
  export interface AttrGroup {
    groupTitle: string,
    attrs: Array<Attr>
  }

  export interface ComponentConfig<P, A> {
    id: string,
    component: string,
    componentName: string,
    props: P,
    attrGroups: A[]
  }

  export type ComponentList = Array<ComponentConfig<ComponentProps, AttrGroup>>

  export interface Props {
    componentList: ComponentList
  }

  export interface State {

  }
}