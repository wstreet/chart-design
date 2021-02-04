import LineChart from './line'
import editableAttrs from './editableAttrs'
import defaultProps from './defaultProps'
import { memo } from 'react'

// @ts-ignore
LineChart.editableAttrs = editableAttrs
LineChart.defaultProps = defaultProps

export default memo(LineChart)