
import React from 'react'
import { Select } from 'antd'
import ComponentItem from './index'

const { Option } = Select


export default class WDSelect extends React.Component<WDSelect.Props, WDSelect.State> {
  static defaultProps = {
    dataSource: []
  }

  static getComponentConfig() {
    return {
      componentName: 'WDSelect',
      label: '算则器',
      imgSrc: 'https://gw.alipayobjects.com/zos/alicdn/fNUKzY1sk/Button.svg'
    }
  }

  render() {
    const { dataSource = [] } = this.props
    return (
      <Select {...this.props} >
        {
          dataSource.map((item: WDSelect.Item) => (
            <Option value={item.value}>{item.label}</Option>
          ))
        }
      </Select>
    )
  }
}

export namespace WDSelect {
  export interface Item {
    label: any,
    value: any,
    [key: string]: any
  }

  export interface Props {
    // dataSource: Item[]
    [key: string]: any
  }

  export interface State {
    
  }

  export type getComponentConfig = () => ComponentItem
}