
import React from 'react'
import { Select } from 'antd'
const { Option } = Select

export default class WDSelect extends React.Component<WDSelect.Props, WDSelect.State> {
  static defaultProps = {
    dataSource: []
  }

  static getComponentName() {
    return 'WDSelect'
  }

  render() {
    const { dataSource } = this.props
    return (
      <Select {...this.props} >
        {
          dataSource.map(item => (
            <Option value={item.value}>{item.label}</Option>
          ))
        }
      </Select>
    )
  }
}

export namespace WDSelect {
  interface Item {
    label: any,
    value: any,
    [key: string]: any
  }

  export interface Props {
    dataSource: Item[]
    [key: string]: any
  }

  export interface State {
    
  }
}