import { useTokenBalance } from '@usedapp/core';
import {
  Button,
  Card,
  List,
  NumberKeyboard,
  Result,
  Toast,
  VirtualInput,
} from 'antd-mobile';
import type { VirtualInputRef } from 'antd-mobile/es/components/virtual-input';
import { ethers } from 'ethers';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';

import { TokenSymbol } from '@/components/TokenSymbol';
import { formatERC20 } from '@/utils/format-erc20';

import styles from './index.module.less';
import {
  useAccount,
  useSignedContractFunction,
  useTokenFromRouteParams,
} from '@/hooks';
import { Contracts } from 'snowman-contracts';

export function MyBalanceDepositPage() {
  const { account } = useAccount();
  const navigate = useNavigate();
  const token = useTokenFromRouteParams();
  const tokenBalance = useTokenBalance(account && token?.address, account);
  const { send: approve } = useSignedContractFunction(
    token ? token.symbol : 'USDC',
    'approve'
  );
  const { state: depositState, send: deposit } = useSignedContractFunction(
    'SnowmanAccount',
    'deposit'
  );
  const [amount, setAmount] = useState<number | null>(null);
  const inputRef = useRef<VirtualInputRef>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  if (account && token) {
    if (depositState.status === 'Success') {
      return (
        <div className={styles.container}>
          <Result
            className={styles.result}
            status="success"
            title={token && amount ? `+ ${amount} ${token.symbol}` : ''}
            description={token && `您的雪人账户余额已成功充值`}
          />
          <Button block color="success" onClick={() => navigate(-1)}>
            返回
          </Button>
        </div>
      );
    }

    const handleAmountChange = (value: string) => {
      setAmount(parseInt(value));
    };
    const handleDeposit = async () => {
      if (amount && tokenBalance) {
        const amountBN = ethers.utils.parseUnits(
          amount.toString(),
          token.decimals
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

        await approve(Contracts.SnowmanAccount.address, amountBN);
        await deposit(token.address, amountBN);
        Toast.clear();
      }
    };
    const handleDepositAll = () => {
      if (tokenBalance) {
        const a = formatERC20(tokenBalance, token.decimals);
        if (a) {
          const fixAmount = parseInt(a);
          if (fixAmount > 0) {
            setAmount(fixAmount);
          }
        }
      }
      inputRef.current?.focus();
    };
    return (
      <div>
        <div className={styles.container}>
          <div className={styles.info}>充值金额将从您电子钱包账户中扣除</div>
          <Card title={<TokenSymbol symbol={token.symbol}></TokenSymbol>}>
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
                {formatERC20(tokenBalance, token.decimals)}
              </b>
            </List.Item>
          </List>
        )}
      </div>
    );
  }
  return <div></div>;
}
