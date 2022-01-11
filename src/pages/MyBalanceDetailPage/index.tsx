import { useContractCall } from '@usedapp/core';
import { Button, Card } from 'antd-mobile';
import { BigNumber } from 'ethers';
import { useNavigate, useParams } from 'react-router';

import config from '@/config';
import { TokenSymbol } from '@/components/TokenSymbol';
import { ERC20Contract, SnowmanAccount } from '@/contracts';
import { useAccount } from '@/hooks';
import { formatERC20 } from '@/utils/format-erc20';

import styles from './index.module.less';

export function MyBalanceDetailPage() {
  const navigate = useNavigate();
  const params = useParams();
  if (params.symbol) {
    const tokenSymbol = params.symbol.toUpperCase();
    const token = config.supportedTokens.find(
      (token) => token.symbol === tokenSymbol
    );
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
  }
  return <div>Unsupported token</div>;
}

function Balance({ token }: { token: ERC20Contract }) {
  const { account } = useAccount();
  const [result] = (useContractCall(
    account && {
      address: SnowmanAccount.address,
      abi: SnowmanAccount.interface,
      method: 'balanceOf',
      args: [account, token.address],
    }
  ) ?? []) as (BigNumber | undefined)[];
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
