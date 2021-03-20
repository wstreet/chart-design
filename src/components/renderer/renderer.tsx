import React, { FC, useCallback, useMemo, memo } from 'react'
import LoaderComponent from '../loaderComponent'
import classnames from 'classnames'
// import pick from 'lodash/pick'
import TargetBox from '../targetBox'
import ItemTypes from '../itemTypes'
import { EditableAttr } from '../componentList'
import { getId } from '../../utils/index'
import { findIndex, find } from  'lodash'
import { useMouse } from "ahooks"
import Draggable from 'react-draggable';
import { chartConfig } from '../charts'
import './index.less'


function addEventListener(node: Document, type: string, callback: (e: any) => void) {
  node.addEventListener(type, callback);
  return {
    removeEventListener() {
      node.removeEventListener(type, callback);
    }
  };
}


export const Renderer: FC<Renderer.Props> = (props) => {
  const { points, activePointId, updatePoints, getActivePointId } = props
  // const mouse = useMouse()

  const onComponentClick = useCallback((id: string) => {
    getActivePointId(id)
  }, [])

  const getDefaultPoint = useCallback((componentName: string) => {
    const defaultProps = chartConfig[componentName].defaultProps
    const editableAttrs =  chartConfig[componentName].editableAttrs

    return { 
      id: getId(),
      componentName,
      props: {
        ...defaultProps,
      },
      editableAttrs: [...editableAttrs]
    }
  }, [])

  const onResize = useCallback((rect) => {
    const { activePointId } = props
    const resizePointIndex =  findIndex(points, (p: Renderer.Point) => p.id === activePointId)
    const resizePoint =  find(points, (p: Renderer.Point) => p.id === activePointId)

    if (!resizePoint) {
      return
    }
    resizePoint.props = {
      ...resizePoint.props,
      ...rect
    }
    points.splice(resizePointIndex, 1, resizePoint)
    updatePoints([ ...points])
  }, [points, activePointId])

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
    console.log('onDragStart')
  }, [])

  // 修改位置x,y
  const onDragStop = useCallback((e, position, index) => {
    console.log('onDragStop')
    const { x, y } = position;
    const point = points[index]
    if (point.props.x === x && point.props.y === y) {
      return
    }
    point.props.x = x
    point.props.y = y
    updatePoints([...points])
    
  }, [points])

  const onMouseDown = useCallback((e, position: string) => {
    const resizePoint =  find(points, (p: Renderer.Point) => p.id === activePointId)
    if (!resizePoint) {
      return
    }
    const originX = e.pageX
    const originY = e.pageY

    const originWidth = resizePoint.props.width
    const originHeight = resizePoint.props.height
    const originOffsetX = resizePoint.props.x
    const originOffsetY = resizePoint.props.y

    // 操作dom
    const wrapDOM = document.getElementById(`wrap-${activePointId}`)
    const dom = document.getElementById(`${activePointId}`)
    if (!dom || !wrapDOM) {
      return
    }
    const destory = addEventListener(document, 'mousemove', (e) => {
      e.stopImmediatePropagation()
 
      const { pageX, pageY, offsetX, offsetY } = e
      
      if (position === 'R') {
        dom.style.width = `${originWidth + pageX - originX}px`
      }
      if (position === 'B') {
        dom.style.height = `${originHeight + pageY - originY}px`
      }

      if (position === 'L') {
        dom.style.width = `${originWidth + originX - pageX}px`
        // 更新left
        wrapDOM.style.transform = `translate(${offsetX}px, ${originOffsetY}px)`
      }

      if (position === 'T') {
        dom.style.height = `${originHeight + originY - pageY}px`
        // 更新top
        wrapDOM.style.transform = `translate(${originOffsetX}px, ${offsetY}px)`
      }

      if (position === 'RB') {
        dom.style.width = `${originWidth + pageX - originX}px`
        dom.style.height = `${originHeight + pageY - originY}px`
      }
      
    })
    
    const up = (e: { pageX: any; pageY: any; offsetX: any; offsetY: any }) => {
      destory.removeEventListener()
      document.removeEventListener('mouseup', up)

      const { pageX, pageY, offsetX, offsetY } = e
      // update position

      if (position === 'R') {
        const rect = {
          // @ts-ignore
          width: originWidth + pageX - originX,
          // @ts-ignore
          height: originHeight,
          x: originOffsetX,
          y: originOffsetY
        }
        onResize(rect)
      }
      if (position === 'B') {
        const rect = {
          // @ts-ignore
          width: originWidth,
          // @ts-ignore
          height: originHeight + pageY - originY,
          x: originOffsetX,
          y: originOffsetY
        }
        onResize(rect)
      }
      if (position === 'L') {
        const rect = {
          // @ts-ignore
          width: originWidth - (pageX- originX),
          // @ts-ignore
          height: originHeight,
          x: offsetX,
          y: originOffsetY
        }
        onResize(rect)
      }
      if (position === 'RB') {
        const rect = {
          // @ts-ignore
          width: originWidth + pageX - originX,
          // @ts-ignore
          height: originHeight + pageY - originY,
          x: originOffsetX,
          y: originOffsetY
        }
        onResize(rect)
      }
     
    }
    document.addEventListener('mouseup', up)
    e.stopPropagation()
  }, [points])


  const renderComponent = useMemo(() => (
    points: Array<Renderer.Point>
  ): React.ReactNode => {
    return points.map((point, index) => {
      console.log(point)
      const { componentName, props: componentProps, id } = point
      const Component = LoaderComponent(componentName)
      const positionX = componentProps.x as number
      const positionY = componentProps.y as number

      return (
        <Draggable
          key={id} 
          bounds="parent"
          position={{x: positionX, y:positionY }}
          grid={[1, 1]} // snap 1
          onStop={(e, position) => onDragStop(e, position, index)}
          onStart={onDragStart}
        >  
            <div 
              id={`wrap-${id}`}
              className={classnames('drag-item', { 'selected-drag-item': id === activePointId })}
            >
              <div className="drag-item-mask" onClick={() => onComponentClick(id)} />
              <Component
                { ...componentProps }
                id={id}
              />
              {/* <div className="drag-item-anchor-t" onMouseDown={(e) => onMouseDown(e, 'T')} /> */}
              {/* <div className="drag-item-anchor-r" onMouseDown={(e) => onMouseDown(e, 'R')} /> */}
              {/* <div className="drag-item-anchor-b" onMouseDown={(e) => onMouseDown(e, 'B')} /> */}
              {/* <div className="drag-item-anchor-l" onMouseDown={(e) => onMouseDown(e, 'L')} /> */}
              <div className="drag-item-anchor-rb" onMouseDown={(e) => onMouseDown(e, 'RB')} />
            </div>
        </Draggable>
      )
    })
  }, [points, activePointId])

  return (
    <div>
      <TargetBox type={ItemTypes.BOX} onDrop={onDrop}>
        <div className="renderer-container">
          {
            renderComponent(points)
          }
        </div>
      </TargetBox>
      <div className="renderer-footer">renderer footer</div>
    </div>
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