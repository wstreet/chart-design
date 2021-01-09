import React,  { useEffect, useState } from 'react'
import { Button, Layout  } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import Toolbar from 'components/toolbar'
import Renderer from 'components/renderer'
import LeftSider from 'components/leftSider'
import AttrForm from 'components/attrForm'
import './index.less'


const Item = Toolbar.Item
const { Header, Content, Footer, Sider } = Layout;

const a=  [
  {
    id: 'asad',
    componentName: 'WDButton',
    config: { // 放组件的属性和值，可以在form中修改
      // 组件属性
      type: 'primary',
      children: '哈哈',
      //style
      width: 80,
      border: '2px solid #ccc'
    },
    editableAttrs: [
      {
        attrKey: "width",
        name: "宽度",
        viewType: "InputNumber"
      }
    ]
  }
]

const App = () => {

  const [points, setPoints ] = useState(a)

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
      <Layout id="main">
        <LeftSider />
        <Content className="renderer-content">
          {/* @ts-ignore */}
          <Renderer points={points} setPoints={setPoints} />
        </Content>
        <Sider className="right-sider">
          {/* @ts-ignore */}
          <AttrForm points={points} setPoints={setPoints} />
        </Sider>
      </Layout>
    </Layout>

  )
}

export default App