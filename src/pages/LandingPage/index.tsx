import { ConnectButton } from '@/components/ConnectButton';

import landingImage from '@/assets/images/snowman-landing.png';
import styles from './index.module.less';

export function LandingPage() {
  return (
    <div className={styles.container}>
      <div className={styles.jumbotron}>
        <div className={styles.slogan}>
          <p>
            稳固收益，唾手可得
            <br />
            您的专属 DeFi 金融解决方案
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
}
