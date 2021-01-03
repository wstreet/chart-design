import React from 'react'
import { ToolbarContext  } from './context'
import { TooltipProps } from 'antd/lib/tooltip'


const ToolbarItemInner: React.FC<ToolbarItemInner.Props> = props => {
  const handleClick = () => {
    if(props.onClick) {
      props.onClick(props.name)
    }

    if (props.name) {
      props.context.onClick(props.name)
    }
  }

  return (
    <div onClick={handleClick}>
      {
        props.children
      }
    </div>
  )
}

export namespace ToolbarItemInner {
  export interface Props extends ToolbarItem.Props  {
    context: ToolbarContext.Contexts
  }
}

export const ToolbarItem: React.FC<ToolbarItem.Props> = (props) => {
  return (
    <ToolbarContext.Consumer>
      {
        context => <ToolbarItemInner context={context} {...props} />
      }
    </ToolbarContext.Consumer>
  )
}

export namespace ToolbarItem {
  export interface Props {
    className?: string
    name?: string
    icon?: React.ReactNode
    text?: string | React.ReactNode
    hidden?: boolean
    disabled?: boolean
    active?: boolean
    children?: React.ReactNode
    tooltip?: string
    tooltipProps?: TooltipProps
    tooltipAsTitle?: boolean
    dropdown?: any
    dropdownArrow?: boolean
    // dropdownProps?: Dropdown.Props
    onClick?: (name?: string) => void
  }
}