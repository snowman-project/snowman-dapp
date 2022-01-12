import { DotLoading, ErrorBlock } from 'antd-mobile';

import styles from './index.module.less';

export interface AsyncBoundaryProps<T> {
  data: T[] | undefined;
  isLoading: boolean;
  error: unknown;
  children: (data: T[]) => React.ReactElement | null;
}

export function AsyncBoundary<T>({
  data,
  isLoading,
  children,
  error,
}: AsyncBoundaryProps<T>) {
  if (isLoading || !data) {
    return (
      <div className={styles.loading}>
        <DotLoading />
      </div>
    );
  }
  if (error) {
    return <ErrorBlock status="default" />;
  }
  if (data.length === 0) {
    return <ErrorBlock status="empty" />;
  }
  return children(data);
}
