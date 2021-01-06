import React, { ReactNode } from 'react';
import { HomeOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons'
import { Tabs, Row, Col, Card } from 'antd'
import { registerComponentList } from 'components/componentList'
import './index.less'

const { TabPane } = Tabs

export class LeftSider extends React.Component<LeftSider.Props, LeftSider.State> {
  constructor(props: LeftSider.Props) {
    super(props)
    this.state = {
      menus: [
        {
          icon: <HomeOutlined />,
          name: '组件',
          key: 'component'
        },
        {
          icon: <AppstoreOutlined />,
          name: '区块',
          key: 'block'
        }
      ],
      tabKey: 'component'
    }
  }


  onChange = (key: string) => {
    this.setState({
      tabKey: key
    })
  }

  onClick = () => {
    this.setState({
      menus: [...this.state.menus]
    })
  }

  getTabContent = (menu: LeftSider.Menu) => {
    const { tabKey } = this.state
    if (tabKey === menu.key) {
      return (
        <div className="tab-content-box">
          <Card title={menu.name} bordered={false}>
            <Row wrap={true} justify="space-between">
              {
                registerComponentList.map(component => (
                  <Col span={24} className="component-item">{component.label}</Col>
                ))
              }
            </Row>
          </Card>
        </div>
      )
    } else {
      return <div className="tab-content-box" >区块</div>
    }
    
  }


  render() {
    const { tabKey, menus } = this.state
    return (
      <div className="left-menu-container">
        <Tabs tabPosition="left" activeKey={tabKey} onChange={this.onChange}>
          {
            menus.map(menu => {
              return (
                <TabPane 
                  tab={(
                    <div> 
                      <div className="left-menu-icon">{ menu.icon }</div> 
                      <div className="left-menu-name">{ menu.name }</div>
                    </div>
                    )
                  } 
                  key={menu.key}
                >
                  { this.getTabContent(menu) }
                </TabPane>
              )
            })
          }
        </Tabs>
      </div>
    )
  }
}


export namespace LeftSider {

  export interface Menu {
    icon: ReactNode,
    name: string,
    key: string
  }

  export interface Props {

  }

  export interface State {
    menus: Menu[],
    tabKey: string
  }
}