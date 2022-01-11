import { USDCMetadata, WETHMetadata } from '@/metadata';

const SUPPORTED_TOKENS = [USDCMetadata, WETHMetadata];

export default {
  supportedTokens: [USDCMetadata, WETHMetadata],
  supportedSymbols: SUPPORTED_TOKENS.map((t) => t.symbol),
};
