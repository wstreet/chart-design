import React, { FC, useCallback, useRef, useState } from 'react'
import { useDrag } from 'react-dnd'
import classNames from 'classnames'
import './index.less'

const style = {
  display: 'inline-block'
}


function addEventListener(node, type, callback) {
  node.addEventListener(type, callback);
  return {
    destory() {
      node.removeEventListener(type, callback);
    }
  };
}

export const SourceBox: FC<SourceBox.Props> = (props) => {
  const { 
    componentName, 
    type, 
    children, 
    id, 
    width, 
    resizable = false, 
    selected = false,
    onClick = () => {},
    onResize = () => {}
  } = props
  const [{ opacity }, drag] = useDrag({
    item: {
      id,
      type,
      componentName
    },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
  })

  const chartBoxRef = useRef<HTMLDivElement>(null)

  const handleClick = useCallback(() => {
    onClick(id!)
  }, [id])

  const onMouseDown = useCallback((e) => {
    if (!chartBoxRef.current) {
      return
    }
    const { width, height } = chartBoxRef.current.getBoundingClientRect()
    // mousedown时记录的点
    const originPoint =[e.pageX, e.pageY]
     // 盒子原始宽高
    const originBox =[width, height]

    const destory = addEventListener(document, 'mousemove', (e) => {
      if (!chartBoxRef.current) {
        return
      }
      const { pageX, pageY } = e
      chartBoxRef.current.style.width = `${originBox[0] + pageX - originPoint[0]}px`;
      chartBoxRef.current.style.height = `${originBox[1] + pageY- originPoint[1]}px`
      
    })
    document.addEventListener('mouseup', () => {
      const chartBoxRect = chartBoxRef.current!.getBoundingClientRect()
      destory.destory()

      onResize(chartBoxRect)
    })
  }, [])


  const selectedCSS = 'cd-component-select-mask'
  const cls = classNames(
    'cd-component-mask', 
    { [selectedCSS]: selected }
  );

  if (!resizable) {
    return (
      <div 
        style={{ ...style, opacity, width }} ref={drag}
        onClick={handleClick}
      >
        {children}
      </div>
    )
  }

  return (
    <div
      className="cd-component-box" onClick={handleClick}
      style={{ ...style, opacity, position: 'relative' }}
      ref={chartBoxRef}
    >
      <div className={cls} />
      {children}
      <div
        className={classNames('cd-component-controller-point')} 
        onMouseDown={onMouseDown}
      />
    </div>
  )
}

export namespace SourceBox {
  export interface Props {
    componentName: string,
    type: symbol
    id?: string
    width?: number | string
    height?: number | string
    resizable?: boolean
    selected?: boolean
    onClick?: (id: string) => void
    onResize?: (rect: DOMRect) => void
  }
}