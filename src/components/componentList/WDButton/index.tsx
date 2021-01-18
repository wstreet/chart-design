import React from 'react'
import { Button } from 'antd'
import Wrapper from '../wrapper'

// @ts-ignore
@Wrapper
export default class WDButton extends React.Component<WDButton.Props> {
  render() {
    return (
      <Button {...this.props} />
    )
  }


  static getComponentConfig() {
    return {
      componentName: 'WDButton',
      label: '按钮',
      imgSrc: 'https://gw.alipayobjects.com/zos/alicdn/fNUKzY1sk/Button.svg',
      defaultProps: {
        block: false,
        danger: false,
        disabled: false,
        ghost: false,
        href: '#',
        htmlType: 'button',
        icon: '',
        loading: false,
        shape: [],
        size: 'middle',
        target: '',
        type: 'default',
        onClick: '',
        children: '按钮',
        //style
        width: 80,
        border: '2px solid #ccc'
      },
      editableAttrs: [
        {
          attrKey: 'children',
          name: 'text',
          viewType: "Input",
          valueType: 'string'
        },
        {
          attrKey: "block",
          name: "block",
          viewType: "Switch",
          valueType: 'boolean'
        },
        {
          attrKey: "danger",
          name: "danger",
          viewType: "Switch",
          valueType: 'boolean'
        },
        {
          attrKey: "disabled",
          name: "disabled",
          viewType: "Switch",
          valueType: 'boolean'
        },
        {
          attrKey: "ghost",
          name: "ghost",
          viewType: "Switch",
          valueType: 'boolean'
        },
        {
          attrKey: "href",
          name: "href",
          viewType: "Input",
          valueType: 'string'
        },
        {
          attrKey: "htmlType",
          name: "htmlType",
          viewType: "Select",
          valueType: 'boolean',
          dataSource: [
            {
              label: 'button',
              value: 'button'
            },
            {
              label: 'submit',
              value: 'submit'
            },
            {
              label: 'reset',
              value: 'reset'
            }
          ]
        },
        {
          attrKey: "icon",
          name: "icon",
          viewType: "Select",
          valueType: 'string',
          dataSource: []
        },
        {
          attrKey: "loading",
          name: "loading",
          viewType: "Switch",
          valueType: 'boolean'
        },
        {
          attrKey: "shape",
          name: "shape",
          viewType: "Select",
          valueType: 'string',
          dataSource: [
            {
              label: 'circle',
              value: 'circle'
            },
            {
              label: 'round',
              value: 'round'
            }
          ]
        },
        {
          attrKey: "size",
          name: "size",
          viewType: "Select",
          valueType: 'string',
          dataSource: [
            {
              label: 'large',
              value: 'large'
            },
            {
              label: 'middle',
              value: 'middle'
            },
            {
              label: 'small',
              value: 'small'
            }
          ]
        },
        {
          attrKey: "target",
          name: "target",
          viewType: "Input",
          valueType: 'string',
        },
        {
          attrKey: "type",
          name: "type",
          viewType: "Select",
          valueType: 'string',
          dataSource: [
            {
              label: 'default',
              value: 'default'
            },
            {
              label: 'primary',
              value: 'primary'
            },
            {
              label: 'ghost',
              value: 'ghost'
            },
            {
              label: 'dashed',
              value: 'dashed'
            },
            {
              label: 'link',
              value: 'link'
            },
            {
              label: 'text',
              value: 'text'
            }
          ]
        },
        {
          attrKey: "onClick",
          name: "onClick",
          viewType: "TextArea",
          valueType: 'string',
        },
        {
          attrKey: "width",
          name: "宽度",
          viewType: "InputNumber",
          valueType: 'number',
        }
      ]
    }
  }

}


export namespace WDButton {
  export type getComponentConfig = () => any
  export interface Props {
    [key: string]: any
  }
}