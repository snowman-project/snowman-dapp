import { useContractFunction, useEthers, useTokenBalance } from '@usedapp/core';
import {
  Button,
  Card,
  List,
  NumberKeyboard,
  Result,
  Toast,
  VirtualInput,
} from 'antd-mobile';
import { ethers, Contract } from 'ethers';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import config from '@/config';
import { TokenSymbol } from '@/components/TokenSymbol';
import { formatERC20 } from '@/utils/format-erc20';

import styles from './index.module.less';
import { SnowmanAccount } from '@/contracts';

export function MyBalanceDepositPage() {
  const params = useParams();
  const navigate = useNavigate();
  const { account, library } = useEthers();
  const readonlyToken = params.symbol
    ? config.supportedTokens.find(
        (token) => token.symbol === params.symbol?.toUpperCase()
      )
    : undefined;
  const tokenBalance = useTokenBalance(
    account && readonlyToken?.address,
    account
  );
  const { state: depositState, send: deposit } = useContractFunction(
    SnowmanAccount,
    'deposit'
  );
  const [amount, setAmount] = useState<number | null>(null);
  const inputRef = useRef<any>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  if (depositState.status === 'Success') {
    return (
      <div className={styles.container}>
        <Result
          className={styles.result}
          status="success"
          title={
            readonlyToken && amount ? `+ ${amount} ${readonlyToken.symbol}` : ''
          }
          description={readonlyToken && `您的雪人账户余额已成功充值`}
        />
        <Button block color="success" onClick={() => navigate(-1)}>
          返回
        </Button>
      </div>
    );
  } else if (account && library && params.symbol) {
    if (readonlyToken) {
      const handleAmountChange = (value: string) => {
        setAmount(parseInt(value));
      };
      const handleDeposit = async () => {
        if (amount && tokenBalance) {
          const amountBN = ethers.utils.parseUnits(
            amount.toString(),
            readonlyToken.decimals
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

          const signer = library.getSigner(account);
          const token = new Contract(
            readonlyToken.address,
            readonlyToken.interface,
            signer
          );
          await token.approve(SnowmanAccount.address, amountBN);
          await deposit(token.address, amountBN);
          Toast.clear();
        }
      };
      const handleDepositAll = () => {
        if (tokenBalance) {
          const a = formatERC20(tokenBalance, readonlyToken);
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
              title="充值金额"
              extra={<TokenSymbol symbol={readonlyToken.symbol}></TokenSymbol>}
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
                  {formatERC20(tokenBalance, readonlyToken)}
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
