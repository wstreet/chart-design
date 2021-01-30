import React, { FC } from 'react'
import LoaderComponent from 'components/loaderComponent'
import pick from 'lodash/pick'
import TargetBox from 'components/targetBox'
import SourceBox from 'components/sourceBox'
import ItemTypes from 'components/itemTypes'
import { EditableAttr } from 'components/componentList'
import { getId } from 'utils/index'
import { findIndex, find } from  'lodash'
import './index.less'

const getDefaultPoint = (componentName: string) => {
  const Component = LoaderComponent(componentName)
  return { 
    id: getId(),
    componentName,
    props: {
      ...Component.defaultProps,
      // 根据鼠标坐标更新组件位置
    },
    editableAttrs: [...Component.editableAttrs]
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

export const Renderer: FC<Renderer.Props> = (props) => {
  const { points } = props

  const onComponentClick = (id: string) => {
    const { getActivePointId } = props
    getActivePointId(id)
  }

  const onResize = (rect, id) => {
    const { updatePoints, points } = props
    const resizePointIndex =  findIndex(points, (p: Renderer.Point) => p.id === id)
    const resizePoint =  find(points, (p: Renderer.Point) => p.id === id)

    if (!resizePoint) {
      return
    }
    resizePoint.props = {
      ...resizePoint.props,
      // 减去margin * 2
      width: rect.width - 24,
      height: rect.height - 24
    }
    points.splice(resizePointIndex, 1, resizePoint)
    updatePoints([ ...points])
  }

  const onDrop = (item: any) => {
    const { componentName, id } = item
    const { updatePoints, points } = props
    const movePointIndex =  findIndex(points, (p: Renderer.Point) => p.id === id)
    const movePoint =  find(points, (p: Renderer.Point) => p.id === id)
    if (movePoint) {
      // move: update movePoint position
      // ...
      points.splice(movePointIndex, 1, movePoint)
    } else {
      // add: 
      points.push(
        getDefaultPoint(componentName)
      )
    }
    updatePoints([ ...points])
  }


  const renderComponent = (
    points: Array<Renderer.Point>
  ): React.ReactNode => {
    const { activePointId } = props
    return points.map(point => {
      const { componentName, props, id } = point
      const Component = LoaderComponent(componentName)
      const style = pick(props, styleKeys)
      return (
        <SourceBox
          key={id}
          id={id}
          type={ItemTypes.BOX}
          componentName={componentName}
          resizable
          selected={id === activePointId}
          onClick={onComponentClick}
          onResize={(rect => onResize(rect, id))}
        >
          <Component
            { ...props }
            style={style}
            
          />
        </SourceBox>
      )
      
    })
  }

  return (
    <TargetBox type={ItemTypes.BOX} onDrop={onDrop}>
      <div className="renderer-container">
        {
          renderComponent(points)
        }
      </div>
    </TargetBox>
  )
}

export namespace Renderer {

  export interface ConfigProps {
    [key: string]: string |number
  }

  export interface Point {
    id: string,
    componentName: string,
    props: ConfigProps,
    editableAttrs: Array<EditableAttr>
  }

  export interface Props {
    points: Array<Point>
    activePointId: string
    updatePoints: (poines: Array<Point>) => void
    getActivePointId: (id: string) => void
  }
}