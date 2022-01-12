import { Button, Card } from 'antd-mobile';
import { useNavigate } from 'react-router';

import { ERC20Token } from 'snowman-contracts';

import { TokenSymbol } from '@/components/TokenSymbol';
import { useAccount, useContractView, useTokenFromRouteParams } from '@/hooks';
import { formatERC20 } from '@/utils/format-erc20';

import styles from './index.module.less';

export function MyBalanceDetailPage() {
  const navigate = useNavigate();
  const token = useTokenFromRouteParams();
  if (token) {
    return (
      <div className={styles.container}>
        <Balance token={token} />
        <Button
          block
          color="primary"
          shape="rounded"
          size="large"
          onClick={() => navigate('deposit')}
        >
          充值
        </Button>
      </div>
    );
  }
  return <div>Unsupported token</div>;
}

function Balance({ token }: { token: ERC20Token }) {
  const { account } = useAccount();
  const result = useContractView(
    account && {
      contract: 'SnowmanAccount',
      function: 'balanceOf',
      args: [account, token.address],
    }
  );
  return (
    <div className={styles.balanceContainer}>
      <div className={styles.info}>我在雪人账户中持有的</div>
      <Card
        className={styles.balanceCard}
        headerClassName={styles.balanceCardHeader}
        title={<TokenSymbol symbol={token.symbol} />}
      >
        <div className={styles.balanceValue}>
          {formatERC20(result, token) ?? '-'}
        </div>
      </Card>
    </div>
  );
}
