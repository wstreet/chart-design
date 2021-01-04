import React,  { useEffect, useState } from 'react'
import { Button, Layout  } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import Toolbar from 'components/toolbar'
import Renderer from 'components/renderer'
import LeftSider from 'components/leftSider'
import componentList from './componentData.json'
import './index.less'


const Item = Toolbar.Item
const { Header, Content, Footer, Sider } = Layout;



const App = () => {
  const onClick = (value: any) => {
    console.log(value)
  }
  return (
    <Layout>
      <Header>
        <div className="logo">Web Design</div>
        <Toolbar prefixCls="a" onClick={onClick}>
          <Item name="aa">
            <Button size="small" type="primary"><EditOutlined /></Button> 
          </Item>
        </Toolbar>
      </Header>
      <Layout>
        <LeftSider />
        <Content className="renderer-content">
          <Renderer componentList={componentList}  />
        </Content>
        <Sider>right sidebar</Sider>
      </Layout>
    </Layout>

  )
}

export default App