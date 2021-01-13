import React,  { useEffect, useState, useCallback } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Button, Layout  } from 'antd'
import { 
  ClearOutlined, UndoOutlined, RedoOutlined, 
  CopyOutlined, ScissorOutlined, SnippetsOutlined,
  SaveOutlined
} from '@ant-design/icons'
import { useHotkeys } from 'react-hotkeys-hook'
import Toolbar from 'components/toolbar'
import Renderer from 'components/renderer'
import LeftSider from 'components/leftSider'
import AttrForm from 'components/attrForm'
import './index.less'


const Item = Toolbar.Item
const { Header, Content, Footer, Sider } = Layout;

const toolbarActions = {
  CLEAR: 'CLEAR',
  UNDO: 'UNDO',
  REDO: 'REDO',
  COPY: 'COPY',
  CUT: 'CUT',
  PASTE: 'PASTE',
  SAVE: 'SAVE'
}

const a=  [
  {
    id: 'asad',
    componentName: 'WDButton',
    config: { // 放组件的属性和值，可以在form中修改
      // 组件属性
      type: 'primary',
      children: '按钮',
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

const toolbarMenus = [
  {
    id: toolbarActions.CLEAR,
    tooltip: '清空',
    hotKey: 'Ctrl + D',
    icon: <ClearOutlined />
  },
  {
    id: toolbarActions.UNDO,
    tooltip: '撤销',
    hotKey: 'Ctrl + Z',
    icon: <UndoOutlined />
  },
  {
    id: toolbarActions.REDO,
    tooltip: '恢复',
    hotKey: 'Ctrl + Y',
    icon: <RedoOutlined />
  },
  {
    id: toolbarActions.COPY,
    tooltip: '复制',
    hotKey: 'Ctrl + C',
    icon: <CopyOutlined />
  },
  {
    id: toolbarActions.CUT,
    tooltip: '剪切',
    hotKey: 'Ctrl + X',
    icon: <ScissorOutlined />
  },
  {
    id: toolbarActions.PASTE,
    tooltip: '粘贴',
    hotKey: 'Ctrl + V',
    icon: <SnippetsOutlined />
  },
  {
    id: toolbarActions.SAVE,
    tooltip: '保存',
    hotKey: 'Ctrl + S',
    icon: <SaveOutlined />
  },
]

const App = () => {

  const [points, setPoints ] = useState<any>(a)
  const [activeId, setActiveId] = useState<string>('')

  const clearCallback = useCallback((e?: any) => {
    setPoints([])
    if (e) {
      console.log(e)
      e.preventDefault()
    }
  }, [])

  const undoCallback = useCallback((e?: any) => {
    if (e) {
      console.log(e)
      e.preventDefault()
    }
  }, [])
  const redoCallback = useCallback((e?: any) => {
    if (e) {
      console.log(e)
      e.preventDefault()
    }
  }, [])

  const copyCallback = useCallback((e?: any) => {
    if (e) {
      console.log(e)
      e.preventDefault()
    }
  }, [])

  const cutCallback = useCallback((e?: any) => {
    if (e) {
      console.log(e)
      e.preventDefault()
    }
  }, [])

  const pasteCallback = useCallback((e?: any) => {
    if (e) {
      console.log(e)
      e.preventDefault()
    }
  }, [])

  const saveCallback = useCallback((e?: any) => {
    console.log('save')
    if (e) {
      console.log(e)
      e.preventDefault()
    }
  }, [])
  
  // 清空
  useHotkeys('ctrl+d', clearCallback)
  // 撤销
  useHotkeys('ctrl+z', undoCallback)
  // 恢复
  useHotkeys('ctrl+y', redoCallback)
  // 复制
  useHotkeys('ctrl+c', copyCallback)
  // 剪切
  useHotkeys('ctrl+x', cutCallback)
  // 粘贴
  useHotkeys('ctrl+v', pasteCallback)
  // 保存
  useHotkeys('ctrl+s', saveCallback)

  const onClick = useCallback((value: any) => {
    // 处理对应键的逻辑
    switch(value) {
      case toolbarActions.CLEAR:
        clearCallback()
        break
      case toolbarActions.COPY:
        copyCallback()
        break
      case toolbarActions.CUT:
        cutCallback()
        break
      case toolbarActions.PASTE:
        pasteCallback()
        break
      case toolbarActions.REDO:
        redoCallback()
        break
      case toolbarActions.UNDO:
        undoCallback()
          break
      case toolbarActions.SAVE:
        saveCallback()
        break
    }
  }, [])

  return (
    <DndProvider backend={HTML5Backend}>
      <Layout>
      <Header>
        <div className="wd-header">
          <div className="logo">WEB Design</div>
          
        </div>
        {/* <div className="clear"></div> */}
      </Header>
      <Layout id="main">
        <LeftSider />
        <Content className="renderer-content">
          <Toolbar onClick={onClick}>
            {
              toolbarMenus.map(menu => {
                return (
                  <Item
                    {...menu}
                    key={menu.id}
                  >
                    <Button size="small" icon={menu.icon}/> 
                  </Item>
                )
              })
            }
          </Toolbar>
          {/* @ts-ignore */}
          <Renderer points={points} setPoints={setPoints} />
        </Content>
        <Sider className="right-sider">
          {/* @ts-ignore */}
          <AttrForm points={points} activeId={activeId} setPoints={setPoints} />
        </Sider>
      </Layout>
    </Layout>
    </DndProvider>
    

  )
}

export default App