import React, { FC } from 'react'
import './index.less'

export interface ContainerProps {
  id? : string,
  title?: React.ReactNode;
  subTitle?: React.ReactNode;
  style?: React.CSSProperties;
  position: string;
  width: number,
  height: number,
}

const Container: FC<ContainerProps> = (props) => {
  const {
    id,
    position,
    width,
    height
  } = props;
  const style = {
    width,
    height,
    position,
    border: '1px solid #cccccc'
  }
  return (
    <div className="view-container" style={style} />
  )
}

export default Container
