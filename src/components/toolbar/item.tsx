import React from 'react'
import { ToolbarContext  } from './context'
import { TooltipProps } from 'antd/lib/tooltip'
import { Tooltip } from 'antd'


const ToolbarItemInner: React.FC<ToolbarItemInner.Props> = props => {
  const { id, text, children, context, prefixCls, tooltip, hotKey, onClick } = props
  console.log(id)
  const handleClick = () => {
    if(onClick) {
      onClick(id)
    }

    if (props.id) {
      context.onClick(id)
    }
  }

  const cls = `${prefixCls}-item`

  return (
    <div onClick={handleClick} className={cls}>
      <Tooltip placement="bottom" title={`${tooltip}(${hotKey})`}>
        {
          text || children
        }
      </Tooltip>
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
        context => <ToolbarItemInner context={context} prefixCls={context.prefixCls} {...props} />
      }
    </ToolbarContext.Consumer>
  )
}

export namespace ToolbarItem {
  export interface Props {
    id: string
    hotKey: string,
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
    // dropdown?: any
    // dropdownArrow?: boolean
    // dropdownProps?: Dropdown.Props
    prefixCls?: string
    onClick?: (name?: string) => void
  }
}