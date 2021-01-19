import React, { FC } from 'react'
import { useDrag } from 'react-dnd'

const style = {
  display: 'inline-block'
}

export const SourceBox: FC<SourceBox.Props> = (props) => {
  const { componentName, type, children, id, width } = props
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



  return (
    <div 
      style={{ ...style, opacity, width }} ref={drag}
    >
      {children}
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
  }
}