import React, { ComponentType, useState } from 'react'
import { Tabs, Form } from 'antd'
import Renderer from 'components/renderer'
import formComponents from 'components/formComponents'

const { TabPane } = Tabs;

const tabs = [
  {
    key: 'attrs',
    label: '属性配置'
  },
  {
    key: 'structure',
    label: '页面大纲'
  }
]

export const AttrForm = (props: AttrForm.Props) => {
  const [tabKey, setTabKey] = useState('attrs')

  const onValuesChange = (values: Renderer.Config) => {
    const { points, setPoints } = props
    const changeKey = Object.keys(values)[0]
    points[0].config[changeKey] = Number(values[changeKey])
    setPoints([...points])
  }


  const renderForm: React.ReactNode = (tabKey: string) => {
    const { points } = props
    const activePoint = points[0]
    if (tabKey === 'attrs') {
      
      return (
        <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        initialValues={activePoint.config}
        onValuesChange={onValuesChange}
      >
        {
          activePoint.editableAttrs.map(attr => {
            // @ts-ignore
            const Component = formComponents[attr.viewType]
            return (
              <Form.Item label={attr.name} name={attr.attrKey} key={attr.attrKey}>
                <Component size="small" />
              </Form.Item>
            )
          })
        }
        
        </Form>
      )
    }
    return tabKey
  }

  

  return (
    <Tabs
      activeKey={tabKey}
      onChange={setTabKey}
    >
      {
        tabs.map(tab => (
          <TabPane
            tab={tab.label}
            key={tab.key}
          >
            {
              // @ts-ignore
              renderForm(tab.key)
            }
          </TabPane>
        ))
      }
    </Tabs>
  )
}

export namespace AttrForm {
  export interface Props {
    points: Renderer.Point[]
    setPoints: (points: Renderer.Point[]) => void
  }
}