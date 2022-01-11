import { Card } from 'antd-mobile';
import { useParams } from 'react-router';

import config from '@/config';
import { TokenSymbol } from '@/components/TokenSymbol';

import styles from './index.module.less';

export function MyBalanceDepositPage() {
  const params = useParams();
  if (params.symbol) {
    const tokenSymbol = params.symbol.toUpperCase();
    const tokenMetadata = config.supportedTokens.find(
      (token) => token.symbol === tokenSymbol
    );
    if (tokenMetadata) {
      return (
        <div className={styles.container}>
          <Card title="充值金额">
            <div>
              <div>
                <TokenSymbol symbol={tokenMetadata.symbol}></TokenSymbol>
              </div>
            </div>
          </Card>
        </div>
      );
    }
  }
  return <div>Unsupported token</div>;
}
