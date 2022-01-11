import { useParams } from 'react-router';

import { ERC20Metadata, USDCMetadata } from '@/metadata';

export function MyBalanceDetailPage() {
  const params = useParams();
  if (!params.symbol) {
    return <div>Unknown symbol</div>;
  }
  const symbol = params.symbol.toUpperCase();
  let tokenMetadata: ERC20Metadata;
  if (symbol === 'USDC') {
    tokenMetadata = USDCMetadata;
  } else {
    return <div>Unsupported token</div>;
  }
  return <div>{tokenMetadata.symbol}</div>;
}
