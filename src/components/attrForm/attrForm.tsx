import React, { useCallback, useState } from 'react'
import { Tabs, Form, Empty } from 'antd'
import Renderer from 'components/renderer'
import formComponents from 'components/formComponents'
import { find, findIndex } from 'lodash'
import './index.less'

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
  const { activePointId, points, setPoints } = props
  const activePoint: Renderer.Point | undefined = find(points, p => p.id === activePointId)
  const activeIndex: number = findIndex(points, p => p.id === activePointId)

  if (!activePoint) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
  }
  const [tabKey, setTabKey] = useState('attrs')

  const onTabChange = useCallback((key: string) => {
    setTabKey(key)
  }, [])

  const onValuesChange = useCallback((values: Renderer.ConfigProps) => {
    debugger
    const changeKey = Object.keys(values)[0]
    activePoint.props[changeKey] = Number(values[changeKey])
    points.splice(activeIndex, 1, activePoint)
    setPoints([...points])
  }, [points])


  const renderForm: React.ReactNode = useCallback(() => {
    if (tabKey === 'attrs') {
      return (
        <Form
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 12 }}
          layout="horizontal"
          initialValues={activePoint.props}
          onValuesChange={onValuesChange}
        >
          {
            activePoint.editableAttrs.map(attr => {
              const { viewType, dataSource = [] } = attr
              // @ts-ignore
              const Component = formComponents[viewType]
              return (
                <Form.Item label={attr.name} name={attr.attrKey} key={attr.attrKey}>
                  {
                    viewType !== 'Select'
                    ? <Component size="small" />
                    : (
                      <Component size="small">
                        {
                          dataSource.map((item: any) => {
                            const { Option } = Component
                            return <Option key={item.value} value={item.value}>{item.label}</Option>
                          })
                        }
                      </Component>
                    )
                  }
                </Form.Item>
              )
            })
          }

        </Form>
      )
    }
    return tabKey
  }, [tabKey])

  

  return (
    <Tabs
      activeKey={tabKey}
      onChange={onTabChange}
      className="props-config-pane"
    >
      {
        tabs.map(tab => (
          <TabPane
            tab={tab.label}
            key={tab.key}
            disabled={tab.key === 'structure'}
          >
            {
              // @ts-ignore
              renderForm()
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
    activePointId: string
    setPoints: (points: Renderer.Point[]) => void
  }
}