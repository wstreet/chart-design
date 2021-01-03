import React from 'react'
import { ToolbarContext  } from './context'
import { ToolbarItem } from './item'

export class Toolbar extends React.Component<Toolbar.Props, Toolbar.State> {
  render() {
    const { prefixCls, children, onClick } = this.props

  const baseCls = `${prefixCls}-toolbar`
  const onClickLocal = (key: string, value?: any) => {
    if (onClick) {
      onClick(key, value)
    }
  }
  
  return (
    <div>
      <ToolbarContext.Provider
        value={{
          prefixCls: baseCls,
          onClick: onClickLocal
        }}
      >
          {
            children
          }
      </ToolbarContext.Provider>
     </div>
    )
  }
}

export namespace Toolbar {
  export const Item = ToolbarItem

  export interface Props {
    prefixCls: string,
    children: React.ReactNode
    onClick: (key: string, value?: any) => void
  }

  export interface State {

  }

  export const defaultProps: Props = {
    prefixCls: 'rts',
    children: '',
    onClick: () => {}
  }
}