export default class map {
    rows: number;
    columns: number;
    values: number[];
    constructor(height: number, rows: number, values: number[]) {
      this.columns = height;
      this.rows = rows;
      this.values = values;
    }

  }