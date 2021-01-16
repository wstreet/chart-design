import React from 'react'
import { Button } from 'antd'
import classNames from 'classnames'
import ComponentItem from './index'


export default class WDButton extends React.Component<WDButton.Props> {
  render() {
    const selectedCSS = 'wd-component-select-mask'
    const { selected, ...othProps } = this.props
    const cls = classNames(
      'wd-component-mask', 
      { [selectedCSS]: selected }
    );
    return (
      <div className="wd-component-box">
        <div className={cls}></div>
        <Button {...this.props} />
      </div>
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
        },
        {
          attrKey: "block",
          name: "block",
          viewType: "Switch",
        },
        {
          attrKey: "danger",
          name: "danger",
          viewType: "Switch",
        },
        {
          attrKey: "disabled",
          name: "disabled",
          viewType: "Switch",
        },
        {
          attrKey: "ghost",
          name: "ghost",
          viewType: "Switch",
        },
        {
          attrKey: "href",
          name: "href",
          viewType: "Input",
        },
        {
          attrKey: "htmlType",
          name: "htmlType",
          viewType: "Select",
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
          dataSource: []
        },
        {
          attrKey: "loading",
          name: "loading",
          viewType: "Switch"
        },
        {
          attrKey: "shape",
          name: "shape",
          viewType: "Select",
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
          viewType: "Input"
        },
        {
          attrKey: "type",
          name: "type",
          viewType: "Select",
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
          viewType: "TextArea"
        },
        {
          attrKey: "width",
          name: "宽度",
          viewType: "InputNumber"
        }
      ]
    }
  }

}


export namespace WDButton {
  export type getComponentConfig = () => ComponentItem
  export interface Props {
    [key: string]: any
  }
}