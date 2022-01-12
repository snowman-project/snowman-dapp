import { Product } from './Product';

export * from './Product';

const __products: Product[] = [
  {
    id: 1,
    name: 'WETH 30天看跌第12期',
    type: 1,
    underlying: 'WETH',
    apy: 0.352,
    term: 90,
    expiry: new Date('2022-05-01').valueOf(),
  },
  {
    id: 2,
    name: 'WETH 90天看跌第1期',
    type: 1,
    underlying: 'WETH',
    apy: 0.314,
    term: 90,
    expiry: new Date('2022-04-01').valueOf(),
  },
  {
    id: 3,
    name: 'WETH 90天看跌第2期',
    type: 1,
    underlying: 'WETH',
    apy: 0.315,
    term: 90,
    expiry: new Date('2022-05-01').valueOf(),
  },
  {
    id: 4,
    name: 'WETH 180天看跌第2期',
    type: 1,
    underlying: 'WETH',
    apy: 0.356,
    term: 90,
    expiry: new Date('2022-04-15').valueOf(),
  },
  {
    id: 5,
    name: 'WETH 180天看跌第3期',
    type: 1,
    underlying: 'WETH',
    apy: 0.357,
    term: 90,
    expiry: new Date('2022-05-15').valueOf(),
  },
  {
    id: 6,
    name: 'SOL 30天看跌第1期',
    type: 1,
    underlying: 'SOL',
    apy: 0.252,
    term: 90,
    expiry: new Date('2022-05-01').valueOf(),
  },
  {
    id: 7,
    name: 'SOL 90天看跌第1期',
    type: 1,
    underlying: 'SOL',
    apy: 0.214,
    term: 90,
    expiry: new Date('2022-04-01').valueOf(),
  },
  {
    id: 8,
    name: 'BNB 90天看跌第1期',
    type: 1,
    underlying: 'BNB',
    apy: 0.115,
    term: 90,
    expiry: new Date('2022-05-01').valueOf(),
  },
  {
    id: 9,
    name: 'BNB 180天看跌第4期',
    type: 1,
    underlying: 'BNB',
    apy: 0.156,
    term: 90,
    expiry: new Date('2022-04-15').valueOf(),
  },
  {
    id: 10,
    name: 'DODGE 180天看跌第5期',
    type: 1,
    underlying: 'USDT',
    apy: 0.08,
    term: 90,
    expiry: new Date('2022-05-15').valueOf(),
  },
];

export async function searchProducts(): Promise<Product[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(__products);
    }, 1000);
  });
}
