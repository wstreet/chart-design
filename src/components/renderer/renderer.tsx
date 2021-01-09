import React from 'react'
import LoaderComponent from 'components/dynamic'
import pick from 'lodash/pick'
import './index.less'

const styleKeys = [
  'top', 
  'bottom', 
  'right',
  'left',
  'width',
  'height',
]

export class Renderer extends React.Component<Renderer.Props, Renderer.State> {

  renderComponent = (
    points: Array<Renderer.Point>
  ): React.ReactNode => {
    return points.map(point => {
      const { componentName, config, id } = point
      const Component = LoaderComponent(componentName)
      const style = pick(config, styleKeys)
      return <Component
        key={id}
        { ...config }
        style={style}
      />
    })
  }


  render() {
    const { points } = this.props
    return (
      <div className="renderer-container">
        {
          this.renderComponent(points)
        }
      </div>
    )
  }
}

export namespace Renderer {

  export interface Config {
    [key: string]: string |number
  }

  export interface EditableAttr {
    attrKey: string,
    name: string
    viewType: string
  }

  export interface Point {
    id: string,
    componentName: string,
    config: Config,
    editableAttrs: Array<EditableAttr>
  }

  export interface Props {
    points: Array<Point>
    setPoints: (poines: Array<Point>) => void
  }

  export interface State {
    
  }
}