export interface Product {
  id: number;
  name: string;
  apy: number;
  underlying: string;
  type: 1 | 2 | 3;
  term: number;
  expiry: number;
}
