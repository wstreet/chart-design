import { Line, LineOptions, G2, Options } from '@antv/g2plot';
import React, { FC, useEffect, useRef } from 'react'
import ErrorBoundary from '../errorBoundary'
import ChartLoading from '../chartLoading'
import pick from 'lodash/pick'
// import Wrapper from 'components/componentList/wrapper'

const padding = 20
const margin = 12


const styleKeys = [
  'position',
  'top', 
  'bottom', 
  'right',
  'left',
  'width',
  'height',
]


interface ContainerProps {
  title?: React.ReactNode;
  subTitle?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  loading?: boolean;
  loadingTemplate?: React.ReactElement;
  errorTemplate?: (e: Error) => React.ReactNode;
  /** 图表渲染完成回调 */
  onReady?: (chart: Options) => void;
  /** 任何其他的图形事件 */
  onEvent?: (chart: Options, event: G2.Event) => void;
}

interface IProps extends LineOptions, ContainerProps {
  
}


const LineChart: FC<IProps> = (props) => {
  const container = useRef(null)
  const {
    className,
    loading,
    loadingTemplate,
    errorTemplate,
    width,
    height,
    title,
    subTitle,
    ...rest
  } = props;

  useEffect(() => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json')
    .then((res) => res.json())
    .then((data) => {
      // @ts-ignore
      const line = new Line(container.current, {
        data,
        padding: 'auto',
        xField: 'Date',
        yField: 'scales',
        height: height ? height - 52 - padding * 2 : 240,
        xAxis: {
          // type: 'timeCat',
          tickCount: 5,
        },
      });
      line.render();
    });
  }, [])

  const getStyle = () => {
    // pick(props, styleKeys)
    return {}
  }

  const style = getStyle()

  return (
    <ErrorBoundary>
      {loading && <ChartLoading loadingTemplate={loadingTemplate} />}
      <div style={{ ...style, background: '#fff', width, height, padding, margin, display: 'inline-block' }}>
        {
          title && <div className="cd-title">{title}</div>
        }
        {
          subTitle && <div className="cd-sub-title">{subTitle}</div>
        }
        <div className={className} ref={container} />
      </div>
    </ErrorBoundary>
  )
}

export default LineChart