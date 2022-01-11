import {
  Button,
  Card,
  List,
  NumberKeyboard,
  Toast,
  VirtualInput,
} from 'antd-mobile';
import { ethers } from 'ethers';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';

import config from '@/config';
import { TokenSymbol } from '@/components/TokenSymbol';
import { useAccount } from '@/hooks';
import { useTokenBalance } from '@usedapp/core';
import { formatERC20 } from '@/utils/format-erc20';

import styles from './index.module.less';

export function MyBalanceDepositPage() {
  const params = useParams();
  const { account } = useAccount();
  const [amount, setAmount] = useState<number | null>(null);
  const inputRef = useRef<any>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  if (params.symbol) {
    const tokenSymbol = params.symbol.toUpperCase();
    const tokenMetadata = config.supportedTokens.find(
      (token) => token.symbol === tokenSymbol
    );
    const tokenBalance = useTokenBalance(
      account && tokenMetadata?.address,
      account
    );
    if (tokenMetadata) {
      const handleAmountChange = (value: string) => {
        setAmount(parseInt(value));
      };
      const handleDeposit = () => {
        if (amount && tokenBalance) {
          const amountBN = ethers.utils.parseUnits(
            amount.toString(),
            tokenMetadata.decimals
          );
          if (amountBN.gt(tokenBalance)) {
            Toast.show({ content: '余额不足', icon: 'fail' });
            return;
          }
          Toast.show({
            content: '正在提交',
            icon: 'loading',
            duration: 0,
            maskClickable: false,
          });
        }
      };
      const handleDepositAll = () => {
        if (tokenBalance) {
          const a = formatERC20(tokenBalance, tokenMetadata);
          if (a) {
            const fixAmount = parseInt(a);
            if (fixAmount > 0) {
              setAmount(fixAmount);
            }
          }
        }
        inputRef?.current.focus();
      };
      return (
        <div>
          <div className={styles.container}>
            <div className={styles.info}>充值金额将从您电子钱包账户中扣除</div>
            <Card
              className={styles.card}
              title="充值金额"
              extra={<TokenSymbol symbol={tokenMetadata.symbol}></TokenSymbol>}
            >
              <VirtualInput
                ref={inputRef}
                className={styles.input}
                placeholder="输入金额"
                value={amount ? amount.toString() : ''}
                keyboard={
                  <NumberKeyboard
                    showCloseButton={false}
                    confirmText="充值"
                    onConfirm={handleDeposit}
                  />
                }
                onChange={handleAmountChange}
              />
            </Card>
          </div>
          {tokenBalance && (
            <List header="您电子钱包中可用余额">
              <List.Item
                extra={
                  tokenBalance.gt(0) ? (
                    <Button
                      className={styles.depositAllButton}
                      shape="rounded"
                      size="mini"
                      onClick={handleDepositAll}
                    >
                      自动填充
                    </Button>
                  ) : null
                }
              >
                <b className={styles.availTokenBalance}>
                  {formatERC20(tokenBalance, tokenMetadata)}
                </b>
              </List.Item>
            </List>
          )}
        </div>
      );
    }
  }
  return <div>Unsupported token</div>;
}
