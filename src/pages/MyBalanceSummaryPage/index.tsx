import { useContractCalls } from '@usedapp/core';
import { List } from 'antd-mobile';
import { useNavigate } from 'react-router';
import { BigNumber } from 'ethers';

import config from '@/config';
import { TokenSymbol as TokenSymbol } from '@/components/TokenSymbol';
import { useAccount } from '@/hooks';
import { SnowmanAccount } from '@/contracts';
import { formatERC20 } from '@/utils/format-erc20';

import styles from './index.module.less';

export function MyBalanceSummaryPage() {
  const { account } = useAccount();
  const results =
    useContractCalls(
      config.supportedTokens.map(
        (token) =>
          account && {
            address: SnowmanAccount.address,
            abi: SnowmanAccount.interface,
            method: 'balanceOf',
            args: [account, token.address],
          }
      )
    ) ?? [];
  const navigate = useNavigate();
  return (
    <div>
      <List header="我在雪人账户中持有的">
        {results.map((result, i) => {
          if (!result) {
            return;
          }
          const balance = result[0] as BigNumber | undefined;
          const token = config.supportedTokens[i];
          const tokenSymbol = token.symbol;
          return (
            <List.Item
              key={tokenSymbol}
              extra={<h3>{formatERC20(balance, token) ?? '-'}</h3>}
              onClick={() => navigate(tokenSymbol.toLowerCase())}
            >
              <div className={styles.listItem}>
                <div>
                  <TokenSymbol
                    symbol={tokenSymbol}
                    displayText={false}
                    size="2.4rem"
                  />
                </div>
                <div className={styles.twoLines}>
                  <h3>{tokenSymbol}</h3>
                  <div>{token.name}</div>
                </div>
              </div>
            </List.Item>
          );
        })}
      </List>
    </div>
  );
}
