import { useContractCalls } from '@usedapp/core';
import List from 'antd-mobile/es/components/list';
import { useNavigate } from 'react-router';
import { BigNumber } from 'ethers';

import config from '@/config';
import { TokenSymbol as TokenSymbol } from '@/components/TokenSymbol';
import { useAccount } from '@/hooks';
import { SnowmanAccountMetadata } from '@/metadata';
import { formatERC20 } from '@/utils/format-erc20';

export function MyBalanceSummaryPage() {
  const { account } = useAccount();
  const results =
    useContractCalls(
      config.supportedTokens.map(
        (metadata) =>
          account && {
            ...SnowmanAccountMetadata,
            method: 'balanceOf',
            args: [account, metadata.address],
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
          const tokenMetadata = config.supportedTokens[i];
          const tokenSymbol = tokenMetadata.symbol;
          return (
            <List.Item
              key={tokenSymbol}
              extra={formatERC20(balance, tokenMetadata)}
              onClick={() => navigate(tokenSymbol.toLowerCase())}
            >
              <TokenSymbol symbol={tokenSymbol} />
            </List.Item>
          );
        })}
      </List>
    </div>
  );
}
