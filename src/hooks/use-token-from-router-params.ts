/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ERC20Symbol, ERC20Token } from 'snowman-contracts';

import config from '@/config';

import { useRouterParam } from './use-router-param';

export function useTokenFromRouteParams(): ERC20Token | undefined {
  const symbol = useRouterParam('symbol');
  if (typeof symbol === 'undefined') {
    return undefined;
  }
  const symbolInUpperCase = symbol.toUpperCase();
  // @ts-ignore
  if (!config.supportedTokens[symbolInUpperCase]) {
    return undefined;
  }
  return config.supportedTokens[symbolInUpperCase as ERC20Symbol];
}
