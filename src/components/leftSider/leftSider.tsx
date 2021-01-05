import React, { ReactNode } from 'react';
import { HomeOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons'
import { Popover, Row, Col } from 'antd'
import { registerComponentList } from 'components/componentList'
import './index.less'

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
          icon: <SettingOutlined />,
          name: '区块',
          key: 'block'
        },
        {
          icon: <AppstoreOutlined />,
          name: '样板间',
          key: 'models'
        },
      ],
      activeMenuKey: 'component'
    }
  }


  onSelect = (key: string) => {
    return () => {
      this.setState({
        activeMenuKey: key
      })
    }
  }

  onClick = () => {
    this.setState({
      menus: [...this.state.menus]
    })
  }

  getPopoverContent = () => {
    return (
      <div style={{
        height: 700,
      }}>
        <Row wrap={true} justify="space-between">
          {
            registerComponentList.map(component => (
              <Col span={24} className="component-item">{component.label}</Col>
            ))
          }
        </Row>
       
      </div>
    )
  }


  render() {
    const {activeMenuKey, menus} = this.state
    return (
      <ul className="left-menu-container" onClick={this.onClick} >
        {
          menus.map(menu => {
            return (
              <Popover
                key={menu.key} 
                placement="right" 
                title={menu.name} 
                content={this.getPopoverContent} 
                trigger="click"
              >
                <li
                  className={`menu-item${menu.key === activeMenuKey? ' menu-item-active':''}`}
                  onClick={this.onSelect(menu.key)}
                >
                  <div className="menu-icon">{menu.icon}</div>
                  <div className="menu-name">{menu.name}</div>
                </li>
              </Popover>
            )
          })
        }
      </ul>
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
    activeMenuKey: string
  }
}