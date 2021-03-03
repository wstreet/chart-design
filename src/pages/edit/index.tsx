import React,  { useEffect, useState, useCallback } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Button, Layout, Menu } from 'antd'
import { 
  ClearOutlined, UndoOutlined, RedoOutlined, 
  CopyOutlined, ScissorOutlined, SnippetsOutlined,
  SaveOutlined, RightOutlined, LeftOutlined,
  OrderedListOutlined, GithubOutlined, DeleteOutlined
} from '@ant-design/icons'
import _ from 'lodash'
import { useHotkeys } from 'react-hotkeys-hook'
import Toolbar from '../../components/toolbar'
import Renderer, { doManger } from '../../components/renderer'
import LeftSider from '../../components/leftSider'
import AttrForm from '../../components/attrForm'
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
  SAVE: 'SAVE',
  DEL: 'DEL'
}


const App = () => {

  const [points, setPoints ] = useState<any>([])
  const [expand, setExpand] = useState(true)
  
  const [activePointId, setActivePointId] = useState<string>('')

  useEffect(() => {
    doManger.add([])
  }, [])

  const toolbarMenus = [
    {
      id: toolbarActions.CLEAR,
      tooltip: '清空',
      hotKey: 'Ctrl + D',
      icon: <ClearOutlined />,
    },
    {
      id: toolbarActions.UNDO,
      tooltip: '撤销',
      hotKey: 'Ctrl + Z',
      icon: <UndoOutlined />,
      disabled: !doManger.canUndo()
    },
    {
      id: toolbarActions.REDO,
      tooltip: '恢复',
      hotKey: 'Ctrl + Y',
      icon: <RedoOutlined />,
      disabled: !doManger.canRedo()
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
    {
      id: toolbarActions.DEL,
      tooltip: '删除',
      hotKey: 'DELETE',
      icon: <DeleteOutlined />
    },
  ]

  const getActivePointId = useCallback((id: string) => {
    setActivePointId(id)
  }, [])

  const updatePoints = (points: any) => {
    doManger.add([...points])
    setPoints(points)
  }

  const clearCallback = useCallback((e?: any) => {
    updatePoints([])
    if (e) {
      console.log(e)
      e.preventDefault()
    }
  }, [])

  const undoCallback = useCallback((e?: any) => {
    if(!doManger.canUndo()) {
      return
    }
    const points = doManger.undo() || []
    setPoints(points)

    if (e) {
      console.log(e)
      e.preventDefault()
    }
  }, [])
  const redoCallback = useCallback((e?: any) => {
    if(!doManger.canRedo()) {
      return
    }
    const points = doManger.redo()
    setPoints(points)
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

  const delCallback = useCallback((e?: any) => {
    if (e) {
      e.preventDefault()
    }
    const activeIdx = _.findIndex(points, (p: Renderer.Point) => p.id === activePointId)
    points.splice(activeIdx, 1)
    updatePoints([...points])
  }, [activePointId, points])
  
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

  useHotkeys('delete', delCallback)

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
      case toolbarActions.DEL:
        delCallback()
        break
    }
  }, [])


  const onToggle = () => {
    setExpand(!expand)
  }
  

  return (
    <DndProvider backend={HTML5Backend}>
      <Layout>
      <Header>
        <div className="wd-header">
          <div className="logo">Chart Design</div>
            <div>
              <Menu mode="horizontal">
                <Menu.Item key="todo" >
                  <a href="https://github.com/wstreet/chart-design/blob/main/TODO.md" target="_blank" rel="noopener noreferrer">
                    TODO
                  </a>
                </Menu.Item>
                <Menu.Item icon={<GithubOutlined />}>
                  <a href="https://github.com/wstreet/chart-design" target="_blank" rel="noopener noreferrer">
                  </a>
                </Menu.Item>
              </Menu>
            </div>
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
                    <Button size="small" disabled={menu.disabled}>{menu.icon}</Button>
                  </Item>
                )
              })
            }
          </Toolbar>
          {/* @ts-ignore */}
          <Renderer points={points} activePointId={activePointId} getActivePointId={getActivePointId} updatePoints={updatePoints} />
        </Content>
        <Sider className={`right-sider ${expand ? '' : 'close'}`}>
          {/* @ts-ignore */}
          <AttrForm points={points} activePointId={activePointId} updatePoints={updatePoints} />
          <div className="right-fold" onClick={onToggle}>
            { expand ? <RightOutlined /> : <LeftOutlined /> }
          </div>
        </Sider>
      </Layout>
    </Layout>
    </DndProvider>
    

  )
}

export default App