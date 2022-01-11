import { USDCToken, WETHToken } from '@/contracts';

const SUPPORTED_TOKENS = [USDCToken, WETHToken];

export default {
  supportedTokens: [USDCToken, WETHToken],
  supportedSymbols: SUPPORTED_TOKENS.map((t) => t.symbol),
};
