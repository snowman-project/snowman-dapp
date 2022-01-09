import List from 'antd-mobile/es/components/list';
import {
  PayCircleOutline,
  ReceivePaymentOutline,
  UnorderedListOutline,
  UserCircleOutline,
} from 'antd-mobile-icons';

import styles from './index.module.less';

export function MainMenu() {
  return (
    <div className={styles.container}>
      <List header="My Account">
        <List.Item prefix={<UserCircleOutline />}>Profile</List.Item>
        <List.Item prefix={<PayCircleOutline />}>Balance</List.Item>
        <List.Item prefix={<UnorderedListOutline />}>Transactions</List.Item>
      </List>
      <List header="Invest">
        <List.Item prefix={<ReceivePaymentOutline />}>
          Dual Currency Investment
        </List.Item>
      </List>
    </div>
  );
}
