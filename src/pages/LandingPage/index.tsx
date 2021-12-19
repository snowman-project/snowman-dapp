import { ConnectButton } from '@/components/ConnectButton';

import landingImage from '@/assets/images/snowman-landing.jpg';
import styles from './index.module.less';

export const LandingPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.jumbotron}>
        <div className={styles.slogan}>
          <p>
            稳固收益唾手可得，
            <br />
            您的专属去中心化理财定制
          </p>
        </div>
      </div>
      <div className={styles.connection}>
        <ConnectButton />
      </div>
      <div className={styles.promotions}>
        <img className={styles.landingImage} src={landingImage} />
      </div>
    </div>
  );
};
