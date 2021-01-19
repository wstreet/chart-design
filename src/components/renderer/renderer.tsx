import React, { FC } from 'react'
import LoaderComponent from 'components/dynamic'
import pick from 'lodash/pick'
import TargetBox from 'components/targetBox'
import SourceBox from 'components/sourceBox'
import ItemTypes from 'components/itemTypes'
import { EditableAttr } from 'components/componentList'
import { getId } from 'utils/index'
import {findIndex, find} from  'lodash'
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

  const onDrop = (item: any) => {
    const { componentName, id } = item
    const { setPoints, points } = props
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
    setPoints([ ...points])
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
        >
          <div onClick={() => onComponentClick(id)}>
            <Component
              { ...props }
              style={style}
              selected={id === activePointId}
            />
          </div>
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
    setPoints: (poines: Array<Point>) => void
    getActivePointId: (id: string) => void
  }
}