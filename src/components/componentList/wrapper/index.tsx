import React from 'react'
import classNames from 'classnames'
import './index.less'

const Wrapper  = (Component: React.ComponentType) => {
  // const WrapperComponent = (props: Wrapper.Props) => {
  //   const selectedCSS = 'wd-component-select-mask'
  //   const { selected, ...othProps } = props
  //   const cls = classNames(
  //     'wd-component-mask', 
  //     { [selectedCSS]: selected }
  //   );
  //   return (
  //       <div className="wd-component-box">
  //         <div className={cls} />
  //         <div className={classNames({'wd-component-controller-point': selected})} />
  //         <Component {...othProps} />
  //       </div>
  //     )
  // }

  class WrapperComponent extends React.Component<Wrapper.Props> {
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
            <div className={classNames({'wd-component-controller-point': selected})} />
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