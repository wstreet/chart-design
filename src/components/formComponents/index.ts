import React from 'react'
import {
  Select,
  Input,
  InputNumber,
  Switch,
} from 'antd'

const { TextArea } = Input

const formComponents =  {
  Input: Input,
  Select: Select,
  InputNumber: InputNumber,
  TextArea,
  Switch
}

export default formComponents

// interface FormComponent {
//   [key: string]: React.ReactNode
// }
