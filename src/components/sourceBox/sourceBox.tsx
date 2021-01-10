import React, { FC } from 'react'
import { useDrag } from 'react-dnd'
import { getId } from 'utils/index'

const style = {}

export const SourceBox: FC<SourceBox.Props> = (props) => {
  console.log(props)
  const { componentName, type, children } = props
  const [{ opacity }, drag] = useDrag({
    item: { 
      id: getId(), 
      type,
      componentName
    },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
  })



  return (
    <div 
      style={{ ...style, opacity }} ref={drag}
    >
      {children}
    </div>
  )
}

export namespace SourceBox {
  export interface Props {
    componentName: string,
    type: symbol
  }
}