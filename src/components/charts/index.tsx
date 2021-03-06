
import lineDefaultProps from './line/defaultProps'
import lineEditableAttrs from './line/editableAttrs'

import './common.less'

export const chartConfig: ChartConfig = {
  line: {
    editableAttrs: lineEditableAttrs,
    defaultProps: lineDefaultProps
  }
}

export const chartList = [
  {
    componentName: 'line',
    label: '折线图',
    img: 'https://gw.alipayobjects.com/mdn/rms_1ad7d9/afts/img/A*OcpTRJ15qpIAAAAAAAAAAABkARQnAQ'
  },
  
]


interface ChartConfig {
  [key: string]: any
}