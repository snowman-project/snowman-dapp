import { useContractCall } from '@usedapp/core';
import Button from 'antd-mobile/es/components/button';
import Card from 'antd-mobile/es/components/card';
import { BigNumber } from 'ethers';
import { useNavigate, useParams } from 'react-router';

import config from '@/config';
import { TokenSymbol } from '@/components/TokenSymbol';
import { ERC20Metadata, SnowmanAccountMetadata } from '@/metadata';
import { useAccount } from '@/hooks';
import { formatERC20 } from '@/utils/format-erc20';

import styles from './index.module.less';

export function MyBalanceDetailPage() {
  const params = useParams();
  const navigate = useNavigate();
  if (params.symbol) {
    const tokenSymbol = params.symbol.toUpperCase();
    const tokenMetadata = config.supportedTokens.find(
      (token) => token.symbol === tokenSymbol
    );
    if (tokenMetadata) {
      return (
        <div className={styles.container}>
          <Balance tokenMetadata={tokenMetadata} />
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

function Balance({ tokenMetadata }: { tokenMetadata: ERC20Metadata }) {
  const { account } = useAccount();
  const [result] = (useContractCall(
    account && {
      ...SnowmanAccountMetadata,
      method: 'balanceOf',
      args: [account, tokenMetadata.address],
    }
  ) ?? []) as (BigNumber | undefined)[];
  return (
    <div className={styles.balanceContainer}>
      <Card
        className={styles.balanceCard}
        headerClassName={styles.balanceCardHeader}
        title={<TokenSymbol symbol={tokenMetadata.symbol} />}
      >
        <div className={styles.balanceValue}>
          {formatERC20(result, tokenMetadata)}
        </div>
      </Card>
    </div>
  );
}
