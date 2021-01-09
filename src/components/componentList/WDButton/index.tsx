import React from 'react'
import { Button } from 'antd'
import ComponentItem from './index'

export default class WDButton extends React.Component {
  render() {
    return <Button {...this.props} />
  }


  static getComponentConfig() {
    return {
      componentName: 'WDButton',
      label: '按钮',
      imgSrc: 'https://gw.alipayobjects.com/zos/alicdn/fNUKzY1sk/Button.svg'
    }
  }

}


export namespace WDButton {
  export type getComponentConfig = () => ComponentItem
}


// export const getComponentConfig = () => {
//   return {
//     componentName: 'WDButton',
//     label: '按钮',
//     imgSrc: 'https://gw.alipayobjects.com/zos/alicdn/fNUKzY1sk/Button.svg'
//   }
// }

// WDButton.attrs = {
//   content: "导出",
//   "type": "primary",
//   "size": "medium",
//   "loading": false,
//   "events": {
//     "onClick": "function onClick() { console.log('onclick) }"
//   },
//   "icon": "",
//   "style": {
        
//   }
// }