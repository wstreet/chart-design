import React from 'react'
import { Button } from 'antd'

export default class WDButton extends React.Component {
  render() {
    return <Button {...this.props} />
  }

  static getComponentName() {
    return 'WDButton'
  }
}

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