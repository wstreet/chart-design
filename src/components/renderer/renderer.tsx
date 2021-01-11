import React from 'react'
import LoaderComponent from 'components/dynamic'
import pick from 'lodash/pick'
import TargetBox from 'components/targetBox'
import SourceBox from 'components/sourceBox'
import ItemTypes from 'components/itemTypes'
import { getId } from 'utils/index'
import './index.less'

const getDefaultPoint = (componentName: string) => {
  return {
    id: getId(),
    componentName,
    config: { // 放组件的属性和值，可以在form中修改
      // 组件属性
      type: 'primary',
      children: '哈哈',
      //style
      width: 80,
      border: '2px solid #ccc'
    },
    editableAttrs: [
      {
        attrKey: "width",
        name: "宽度",
        viewType: "InputNumber"
      }
    ]
  }
}

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
      return (
        <SourceBox
          key={id}
          type={ItemTypes.BOX}
          componentName={componentName}
        >
          <Component
            { ...config }
            style={style}
          />
        </SourceBox>
      )
      
    })
  }

  // @ts-ignore
  onDrop = (item) => {
    const { componentName, id } = item
    const { setPoints, points } = this.props

    setPoints([
      ...points,
      getDefaultPoint(componentName)
    ])
    

  }


  render() {
    const { points } = this.props
    return (
      <TargetBox type={ItemTypes.BOX} onDrop={this.onDrop}>
        <div className="renderer-container">
          {
            this.renderComponent(points)
          }
        </div>
      </TargetBox>
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