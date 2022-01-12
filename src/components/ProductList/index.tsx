import { List } from 'antd-mobile';
import dayjs from 'dayjs';

import { Product } from '@/products';

import { TokenSymbol } from '../TokenSymbol';

import styles from './index.module.less';

export interface ProductListProps {
  data: Product[];
}

export function ProductList({ data }: ProductListProps) {
  return (
    <List>
      {data?.map((product) => (
        <ProductListItem key={product.id} data={product} />
      ))}
    </List>
  );
}

function ProductListItem({ data }: { data: Product }) {
  return (
    <List.Item
      key={data.id}
      prefix={
        <TokenSymbol symbol={data.underlying} displayText={false} size="2rem" />
      }
      extra={
        <div className={styles.apy}>
          <div className={styles.value}>
            {Math.round(data.apy * 1000) / 10}%
          </div>
          <div className={styles.desc}>年化率</div>
        </div>
      }
      description={
        <div className={styles.expiry}>
          {dayjs(data.expiry).format('LL')}到期
        </div>
      }
      onClick={() => {
        console.info(data);
      }}
    >
      <div className={styles.name}>{data.name}</div>
    </List.Item>
  );
}
