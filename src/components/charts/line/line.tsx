import { Line, LineOptions, G2, Options } from '@antv/g2plot';
import React, { FC, useEffect, useRef, memo } from 'react'
import ErrorBoundary from '../errorBoundary'
import ChartLoading from '../chartLoading'
import pick from 'lodash/pick'

const padding = 20
const margin = 1


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
  id? : string,
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
  dataSource?: Array<any>
}

const LineChart: FC<IProps> = (props) => {
  const container = useRef<HTMLDivElement>(null)
  const {
    id,
    className,
    loading,
    loadingTemplate,
    errorTemplate,
    width,
    height,
    title,
    subTitle,
    dataSource = [],
    ...rest
  } = props;

  useEffect(() => {
    // if url true, dataSource从url获取
    if (container.current) {
      const line = new Line(container.current, {
        data: dataSource,
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
    }
    
  }, [dataSource])

  const getStyle = () => {
    // pick(props, styleKeys)
    return {}
  }

  const style = getStyle()

  return (
    <ErrorBoundary>
      {loading && <ChartLoading loadingTemplate={loadingTemplate} />}
      <div id={id} style={{ ...style, background: '#fff', width, height, padding, margin, display: 'inline-block' }}>
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

export default memo(LineChart)