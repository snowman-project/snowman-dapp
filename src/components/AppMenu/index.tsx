import List from 'antd-mobile/es/components/list';
import {
  PayCircleOutline,
  ReceivePaymentOutline,
  UnorderedListOutline,
} from 'antd-mobile-icons';
import { useNavigate } from 'react-router';

export interface AppMenuProps {
  onClose?: () => void;
}

export function AppMenu({ onClose }: AppMenuProps) {
  const navigate = useNavigate();
  const jumpTo = (path: string) => {
    navigate(path);
    onClose && onClose();
  };
  return (
    <div>
      <List header="我的账户">
        <List.Item
          prefix={<PayCircleOutline />}
          onClick={() => jumpTo('/my/balance')}
        >
          账户余额
        </List.Item>
        <List.Item
          prefix={<UnorderedListOutline />}
          onClick={() => jumpTo('/my/transactions')}
        >
          交易
        </List.Item>
      </List>
      <List header="投资与理财">
        <List.Item prefix={<ReceivePaymentOutline />}>双币理财</List.Item>
      </List>
    </div>
  );
}
