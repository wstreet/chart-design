import { Line, LineOptions, G2, Options } from '@antv/g2plot';
import React, { FC, useEffect, useRef } from 'react'
import ErrorBoundary from '../errorBoundary'
import ChartLoading from '../chartLoading'


interface ContainerProps {
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
    style = {
      height: '100%',
    },
    className,
    loading,
    loadingTemplate,
    errorTemplate,
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
        xAxis: {
          // type: 'timeCat',
          tickCount: 5,
        },
      });
      line.render();
    });
  }, [])

  return (
    <ErrorBoundary>
      {loading && <ChartLoading loadingTemplate={loadingTemplate} />}
      <div className={className} style={style} ref={container} />
    </ErrorBoundary>
  )
}

export default LineChart