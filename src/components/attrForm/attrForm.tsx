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
  const { activePointId, points, updatePoints } = props
  const activePoint: Renderer.Point | undefined = find(points, p => p.id === activePointId)
  const activeIndex: number = findIndex(points, p => p.id === activePointId)

  if (!activePoint) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
  }
  const [tabKey, setTabKey] = useState('attrs')

  const onTabChange = useCallback((key: string) => {
    setTabKey(key)
  }, [])

  const formatValue = (valueType: string, value: any) => {
    switch(valueType) {
      case 'boolean':
        return !!value
      case 'number':
        return Number(value)
      default:
        return typeof value === 'object' ? value.target.value : value
    }
  }

  const updateActivePoint = (key: string, value: any) => {

    const changeAttr = find(activePoint.editableAttrs, attr => attr.attrKey === key)
    if (!changeAttr) {
      return activePoint
    }
    activePoint.props[key] = formatValue(changeAttr.valueType, value)

    return {...activePoint}
  }

  const onValuesChange = (key: string, value: any) => {
    points.splice(activeIndex, 1, updateActivePoint(key, value))
    updatePoints([...points])
  }

  const renderForm: React.ReactNode = useCallback(() => {
    if (tabKey === 'attrs') {
      return (
        <Form
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 12 }}
          layout="horizontal"
          // onValuesChange={onValuesChange}
          initialValues={activePoint.props}
        >
          {
            activePoint.editableAttrs.map(attr => {
              const { viewType, dataSource = [] } = attr
              // @ts-ignore
              const Component = formComponents[viewType]

              const valueProps = {
                [attr.viewType === 'Switch' ? 'checked' : 'value']: activePoint.props[attr.attrKey],
                onChange: (val: any) => onValuesChange(attr.attrKey, val)
              }
           
              return (
                <Form.Item label={attr.name} name={attr.attrKey} key={attr.attrKey} >
                  {
                    viewType !== 'Select'
                    ? <Component size="small" {...valueProps} />
                    : (
                      <Component size="small" {...valueProps} allowClear >
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
  }, [tabKey, activePointId])

  

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
    updatePoints: (points: Renderer.Point[]) => void
  }
}