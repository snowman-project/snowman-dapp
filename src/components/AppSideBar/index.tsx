import { AppMenu } from '../AppMenu';
import styles from './index.module.less';

export interface AppSideBarProps {
  onClose?: () => void;
}

export function AppSideBar({ onClose }: AppSideBarProps) {
  return (
    <div className={styles.container}>
      <AppMenu onClose={onClose} />
    </div>
  );
}
