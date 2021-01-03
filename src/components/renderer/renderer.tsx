import React from 'react'
import  { Button } from 'antd'
import './index.less'

export class Renderer extends React.Component<Renderer.Props, Renderer.State> {
  
  options: Renderer.Options = {
    componentMap: {
      Button
    }
  }
  
  getComponent = (name: string): any => {
    let Component = this.options.componentMap[name]
    if (!Component) {
      console.log('组件不存在')
      // return <div />
    }
    return Component
  }


  render() {
    const { componentList } = this.props
    return (
      <div className="renderer-container">
        {
          componentList.map(config => {
            const { componentName, props, style = {} } = config
            const Component = this.getComponent(componentName)
            return <Component
              { ...props }
              style={style}
            />
          })
        }
      </div>
    )
  }
}

export namespace Renderer {
  export interface ComponentProps {
    key?: string,
    className?: string
  }

  export type Component = (props: ComponentProps) => React.ReactNode

  interface componentMap {
    [componentName: string]: Component
  }

  export interface Options {
    componentMap: componentMap
  }

  export interface ComponentConfig<T> {
    componentName: string,
    props: T,
    style?: { 
      [name: string]: string 
    }
  }

  export interface Props {
    componentList: Array<ComponentConfig<ComponentProps>>
  }

  export interface State {

  }
}