import React from 'react';
import { Link } from 'react-router-dom';

import styles from './index.module.less';

export const AppHeader: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.brand}>
        <Link className={styles.link} to="/">
          <div className={styles.logo} />
          <div className={styles.brandName}>Snowman</div>
        </Link>
      </div>
    </div>
  );
};
