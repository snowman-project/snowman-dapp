/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useParams } from 'react-router';

import config from '@/config';
import { ERC20Symbol } from 'snowman-contracts';

export function useParam(name: string) {
  const params = useParams();
  return params[name];
}

export function useSymbolFromParams(): ERC20Symbol | undefined {
  const symbol = useParam('symbol');
  if (typeof symbol === 'undefined') {
    return undefined;
  }
  const symbolInUpperCase = symbol.toUpperCase();
  // @ts-ignore
  if (!config.supportedTokens[symbolInUpperCase]) {
    return undefined;
  }
  return symbolInUpperCase as ERC20Symbol;
}
