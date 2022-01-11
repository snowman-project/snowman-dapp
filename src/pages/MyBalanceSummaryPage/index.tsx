import { useContractCalls } from '@usedapp/core';
import List from 'antd-mobile/es/components/list';
import { ethers } from 'ethers';

import { useAccount } from '@/hooks';
import { SnowmanAccountMetadata, USDCMetadata, WETHMetadata } from '@/metadata';

import styles from './index.module.less';

export function MyBalanceSummaryPage() {
  const { account } = useAccount();
  const [usdcBalance, wethBalance] = useContractCalls([
    account && {
      ...SnowmanAccountMetadata,
      method: 'balanceOf',
      args: [account, USDCMetadata.address],
    },
    account && {
      ...SnowmanAccountMetadata,
      method: 'balanceOf',
      args: [account, WETHMetadata.address],
    },
  ]) ?? [[], []];
  return (
    <div>
      <List header="余额明细">
        <List.Item
          extra={
            usdcBalance &&
            ethers.utils.formatUnits(usdcBalance[0], USDCMetadata.decimals)
          }
        >
          <div className={styles.cryptoWithLogo}>
            <img
              src={require('cryptocurrency-icons/svg/color/usdc.svg')}
              width="20"
            />
            <span>USDT</span>
          </div>
        </List.Item>
        <List.Item
          extra={
            wethBalance &&
            ethers.utils.formatUnits(wethBalance[0], WETHMetadata.decimals)
          }
        >
          <div className={styles.cryptoWithLogo}>
            <img
              src={require('cryptocurrency-icons/svg/color/eth.svg')}
              width="20"
            />
            <span>WETH</span>
          </div>
        </List.Item>
      </List>
    </div>
  );
}
