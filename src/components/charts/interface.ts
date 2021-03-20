import { Line, LineOptions, G2, Options } from "@antv/g2plot";

export interface ContainerProps {
  id?: string;
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

export interface IProps extends LineOptions, ContainerProps {
  dataSource?: Array<any>;
}
