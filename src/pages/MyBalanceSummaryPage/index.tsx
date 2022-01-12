import { List } from 'antd-mobile';
import { useNavigate } from 'react-router';
import { BigNumber } from 'ethers';

import config from '@/config';
import { TokenSymbol as TokenSymbol } from '@/components/TokenSymbol';
import { useAccount, useContractViews } from '@/hooks';
import { formatERC20 } from '@/utils/format-erc20';

import styles from './index.module.less';

export function MyBalanceSummaryPage() {
  const tokens = Object.values(config.supportedTokens);
  const { account } = useAccount();
  const results =
    useContractViews(
      tokens.map((token) =>
        account
          ? {
              contract: 'SnowmanAccount',
              function: 'balanceOf',
              args: [account, token.address],
            }
          : undefined
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
          const balance = result as BigNumber | undefined;
          const token = tokens[i];
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
