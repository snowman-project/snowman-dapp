import { searchProducts } from '@/products';
import { CapsuleTabs } from 'antd-mobile';
import { useQuery } from 'react-query';

import { AsyncBoundary } from '@/components/AsyncBoundary';
import { ProductFilters, ProductFilter } from '@/components/ProductFilters';
import { ProductList } from '@/components/ProductList';

import styles from './index.module.less';

export function ProductListPage() {
  const searchProductsResult = useQuery('searchProducts', () =>
    searchProducts()
  );
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <CapsuleTabs>
          <CapsuleTabs.Tab title="全部" key={0} />
          <CapsuleTabs.Tab title="双币理财" key={1} />
          <CapsuleTabs.Tab title="固收理财" key={2} />
          <CapsuleTabs.Tab title="P2P 理财" key={3} />
        </CapsuleTabs>
        <ProductFilters>
          <ProductFilter name="币种" options={['WETH', 'SOL', 'BNB']} />
          <ProductFilter
            name="周期"
            options={['30 天内', '60 天内', '90 天内', '90 天以上']}
          />
          <ProductFilter
            name="年化率"
            options={['10% 以下', '10% - 30%', '30% - 60%', '60% 以上']}
          />
        </ProductFilters>
      </header>
      <AsyncBoundary {...searchProductsResult}>
        {(data) => <ProductList data={data} />}
      </AsyncBoundary>
    </div>
  );
}
