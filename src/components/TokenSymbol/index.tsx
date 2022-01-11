import styles from './index.module.less';

export interface TokenSymbolProps {
  symbol: string;
  displayText?: boolean;
  size?: number | string;
}

export function TokenSymbol({
  displayText = true,
  symbol,
  size = '1rem',
}: TokenSymbolProps) {
  return (
    <div className={styles.container} style={{ fontSize: size }}>
      <div className={styles.flex}>
        <img src={getTokenIcon(symbol)} />
        {displayText ? <span>{symbol.toUpperCase()}</span> : null}
      </div>
    </div>
  );
}

export function getTokenIcon(tokenSymbol: string) {
  return require(`cryptocurrency-icons/svg/color/${
    tokenSymbol === 'WETH' ? 'eth' : tokenSymbol.toLowerCase()
  }.svg`);
}
