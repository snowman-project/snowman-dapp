import { BigNumber } from 'ethers';
import { useParams } from 'react-router';

import config from '@/config';
import { ERC20Metadata, SnowmanAccountMetadata } from '@/metadata';
import { useContractCall } from '@usedapp/core';
import { useAccount } from '@/hooks';
import { formatERC20 } from '@/utils/format-erc20';

export function MyBalanceDetailPage() {
  const params = useParams();
  if (params.symbol) {
    const tokenSymbol = params.symbol.toUpperCase();
    const tokenMetadata = config.supportedTokens.find(
      (token) => token.symbol === tokenSymbol
    );
    if (tokenMetadata) {
      return <Balance tokenMetadata={tokenMetadata} />;
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
  return <div>{formatERC20(result, tokenMetadata)}</div>;
}
