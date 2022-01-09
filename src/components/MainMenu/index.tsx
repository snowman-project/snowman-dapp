import List from 'antd-mobile/es/components/list';
import {
  PayCircleOutline,
  ReceivePaymentOutline,
  UnorderedListOutline,
  UserCircleOutline,
} from 'antd-mobile-icons';
import { useNavigate } from 'react-router';

import styles from './index.module.less';

export function MainMenu({ onClose }: { onClose?: () => void }) {
  const navigate = useNavigate();
  const jumpTo = (path: string) => {
    navigate(path);
    onClose && onClose();
  };
  return (
    <div className={styles.container}>
      <List header="My Account">
        <List.Item
          prefix={<UserCircleOutline />}
          onClick={() => jumpTo('/my/profile')}
        >
          Profile
        </List.Item>
        <List.Item
          prefix={<PayCircleOutline />}
          onClick={() => jumpTo('/my/balance')}
        >
          Balance
        </List.Item>
        <List.Item
          prefix={<UnorderedListOutline />}
          onClick={() => jumpTo('/my/transactions')}
        >
          Transactions
        </List.Item>
      </List>
      <List header="Invest">
        <List.Item prefix={<ReceivePaymentOutline />}>
          Dual Currency Investment
        </List.Item>
      </List>
    </div>
  );
}
