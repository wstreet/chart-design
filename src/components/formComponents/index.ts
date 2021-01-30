
import {
  Select,
  Input,
  InputNumber,
  Switch,
  Radio
} from 'antd'
import Color from './color'

const { TextArea } = Input
const RadioGroup = Radio.Group

const formComponents =  {
  Input,
  Select: Select,
  InputNumber: InputNumber,
  TextArea,
  Switch,
  Color,
  RadioGroup
}

export default formComponents

