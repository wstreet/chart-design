import React, { FC, useCallback } from 'react'
import LoaderComponent from 'components/loaderComponent'
// import pick from 'lodash/pick'
import TargetBox from 'components/targetBox'
// import SourceBox from 'components/sourceBox'
import ItemTypes from 'components/itemTypes'
import { EditableAttr } from 'components/componentList'
import { getId } from 'utils/index'
import { findIndex, find } from  'lodash'
import { useMouse } from "ahooks"
import Draggable from 'react-draggable';
import GridLayout, { ItemCallback } from 'react-grid-layout';
import './index.less'



export const Renderer: FC<Renderer.Props> = (props) => {
  const { points, updatePoints } = props

  // const cursorPosition = useMouse();

  const onComponentClick = (id: string) => {
    const { getActivePointId } = props
    getActivePointId(id)
  }

  const getDefaultPoint = useCallback((componentName: string) => {
    const Component = LoaderComponent(componentName)
    const defaultProps = {
      ...Component.defaultProps,
    }
    return { 
      id: getId(),
      componentName,
      props: {
        ...defaultProps,
        // 根据鼠标坐标更新组件位置
        top: 200,
        left: 500,
      },
      editableAttrs: [...Component.editableAttrs]
    }
  }, [])

  const onResize = useCallback((rect, id) => {
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
  }, [points])

  const onDrop = useCallback((item: any) => {
    const { componentName, id } = item
    const movePointIndex =  findIndex(points, (p: Renderer.Point) => p.id === id)
    const movePoint =  find(points, (p: Renderer.Point) => p.id === id)
    if (movePoint) {
      // move: update movePoint position
      // ...
      points.splice(movePointIndex, 1, movePoint)
    } else {
      // add: update movePoint position
      points.push(
        getDefaultPoint(componentName)
      )
    }
    updatePoints([ ...points])
  }, [points])

  const onDragStart = useCallback((e) => {

  }, [])

  const onDrag = useCallback((e) => {

  }, [])

  const onDragStop = useCallback((e) => {

  }, [])


  const renderComponent = (
    points: Array<Renderer.Point>
  ): React.ReactNode => {
    const { activePointId } = props
    return points.map(point => {
      const { componentName, props, id } = point
      const Component = LoaderComponent(componentName)
      
      return (
        <Component
          key={id}
          { ...props }
        />
      )
    })
  }

  return (
    <TargetBox type={ItemTypes.BOX} onDrop={onDrop}>
      <div className="renderer-container">
        <Draggable
          handle=".handle-box"
          defaultPosition={{x: 0, y: 0}}
          // position={{x: props.left, y: props.top}
          grid={[1, 1]}
          onStop={onDragStop}
        >  
            <div>
            <GridLayout
              cols={24}
              rowHeight={240}
              width={1200}
              margin={[0, 0]}
              // onDragStop={dragStop}
              // onDragStart={onDragStart}
              // onResizeStop={onResizeStop}
              // style={{
              //   backgroundColor: pageData && pageData.bgColor,
              //   backgroundImage:
              //     pageData && pageData.bgImage ? `url(${pageData.bgImage[0].url})` : 'initial',
              //   backgroundSize: 'contain',
              //   backgroundRepeat: 'no-repeat',
              // }}
            >
              {
                renderComponent(points)
              }
            </GridLayout>
          </div>
        </Draggable>
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