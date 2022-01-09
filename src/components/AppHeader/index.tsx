import React from 'react';

import styles from './index.module.less';

export const AppHeader: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.brand}>
        <div className={styles.logo} />
        <div className={styles.brandName}>Snowman</div>
      </div>
    </div>
  );
};
