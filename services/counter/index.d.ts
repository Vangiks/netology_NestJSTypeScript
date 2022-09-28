export interface ICounter {
  host: string;
  icreaseCounter: (bookId: string) => Promise<number>;
  getCounter: (bookId: string) => Promise<number>;
}
