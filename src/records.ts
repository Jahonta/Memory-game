import { Record } from "./util.js";

export default class Records {
  private records: Record[];

  constructor() {
    const data = localStorage.getItem('records');
    if (data) {
      const oldRecords = JSON.parse(data);
      this.records = oldRecords;
    } else {
      this.records = [];
    }
  }

  get = (): Record[] => {
    return this.records;
  }

  add = (score: number): void => {
    this.records.push({
      score,
      date: new Date()
    });
    this.records.sort(this.sort);
    this.records = this.records.slice(0, 10);
    localStorage.setItem('records', JSON.stringify(this.records));
  }

  clear = (): void => {
    this.records = [];
    localStorage.setItem('records', '');
  }

  private sort = (a: Record, b: Record): number => b.score - a.score;
}
