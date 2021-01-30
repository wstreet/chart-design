import React from 'react'
import classNames from 'classnames'
import './index.less'

const Wrapper  = (Component: React.ComponentType) => {
  class WrapperComponent extends React.Component<Wrapper.Props> {
    controllerRef: any

    onMouseDown = () => {
      this.controllerRef.addEventListener('mousemove', this.mousemoveHandler)
    }

    onMouseUp = () => {
      this.controllerRef.removeEventListener('mousemove', this.mousemoveHandler)
    }

    mousemoveHandler = (e) => {
      const ev = e || window.event
      ev.stopPropagation()
      console.log(ev)
    }
    
    render() {
      const selectedCSS = 'wd-component-select-mask'
      const { selected, ...othProps } = this.props
      const cls = classNames(
        'wd-component-mask', 
        { [selectedCSS]: selected }
      );
      return (
          <div className="wd-component-box">
            <div className={cls} />
            <div
              ref={ref => this.controllerRef = ref}
              className={classNames({'wd-component-controller-point': selected})} 
              onMouseDown={this.onMouseDown} 
              onMouseUp={this.onMouseUp}
            />
            <Component {...othProps} />
          </div>
        )
    }
  }
  // @ts-ignore
  // wrapperComponent.getComponentConfig = Component.getComponentConfig
  return WrapperComponent
}


export default Wrapper

export namespace Wrapper {
  export interface Component {
     
  }
  type getComponentConfig = () => any
  
  export interface Props {
    [key: string]: any
  }
}