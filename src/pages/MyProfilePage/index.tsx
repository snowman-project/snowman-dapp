import { shortenAddress } from '@usedapp/core';
import Toast from 'antd-mobile/es/components/toast';
import Input from 'antd-mobile/es/components/input';
import { CheckCircleOutline, EditSOutline } from 'antd-mobile-icons';
import { useMemo, useRef, useState } from 'react';

import { useAccount } from '@/hooks';

import styles from './index.module.less';

const QR_CODE_IMAGE_SIZE = 180;

export function MyProfilePage() {
  const { account, accountNickName, changeAccountNickName } = useAccount();
  const [editing, setEditing] = useState(false);
  const [editingAccountName, setEditingAccountName] = useState('');
  const inputRef = useRef<any>(null);
  const qrCodeImageURL = useMemo(() => {
    if (account) {
      const url = new URL(
        `https://api.qrserver.com/v1/create-qr-code/?size=${QR_CODE_IMAGE_SIZE}x${QR_CODE_IMAGE_SIZE}`
      );
      url.searchParams.set('data', `ethereum:${account}`);
      return url;
    }
    return null;
  }, [account]);

  if (account) {
    const handleCopy = () => {
      navigator.clipboard.writeText(account);
      Toast.show('Copied to clipboard');
    };
    const handleEdit = () => {
      setEditingAccountName(accountNickName ?? '');
      setEditing(true);
      setTimeout(() => {
        inputRef.current?.focus();
      });
    };
    const handleChangeAccountName = () => {
      const length = editingAccountName.trim().length;
      if (length) {
        if (length <= 64) {
          changeAccountNickName(editingAccountName.trim());
          setEditing(false);
        } else {
          Toast.show('The nick name is too long. Max length is 64.');
        }
      } else {
        changeAccountNickName(null);
        setEditing(false);
      }
    };

    return (
      <div className={styles.container}>
        <div className={styles.centered}>
          <div className={styles.name}>
            {editing ? (
              <>
                <Input
                  ref={inputRef}
                  className={styles.nameInput}
                  placeholder="Nick name"
                  value={editingAccountName}
                  onChange={(value) => {
                    setEditingAccountName(value);
                  }}
                  onEnterPress={handleChangeAccountName}
                />
                <CheckCircleOutline onClick={handleChangeAccountName} />
              </>
            ) : (
              <>
                <div className={styles.readonly}>
                  {accountNickName ?? shortenAddress(account)}
                </div>
                <EditSOutline
                  className={styles.editButton}
                  onClick={handleEdit}
                />
              </>
            )}
          </div>
          <div className={styles.qrCode}>
            {qrCodeImageURL && (
              <img
                width={QR_CODE_IMAGE_SIZE}
                height={QR_CODE_IMAGE_SIZE}
                src={qrCodeImageURL.toString()}
              />
            )}
          </div>
          <div className={styles.address} onClick={handleCopy}>
            {account}
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
