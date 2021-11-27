import { Record } from "./types/record.js";

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

  getRecords = (): Record[] => {
    return this.records;
  }

  addRecord = (score: number): void => {
    this.records.push({
      score,
      date: new Date()
    });
    this.records.sort(this.sortRecords);
    localStorage.setItem('records', JSON.stringify(this.records.slice(0, 10)));
  }

  clearRecords = (): void => {
    this.records = [];
    localStorage.setItem('records', '');
  }

  private sortRecords = (a: Record, b: Record): number => b.score - a.score;
}
