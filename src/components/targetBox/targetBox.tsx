import React, { FC } from 'react'
import { useDrop } from 'react-dnd'

export const TargetBox: FC<TargetBox.Props> = (props) => {

  const { onDrop, type, children } = props
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: type,
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })


  return (
    <div ref={drop}>
      {children}
    </div>
  )
}

export namespace TargetBox {
  export interface Props {
    type: symbol,
    onDrop: (item: any) => void
  }
}