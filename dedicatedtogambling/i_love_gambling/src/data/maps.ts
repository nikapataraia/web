import map from "../models/map";

const maps: { [key: string]: map } = {
    Small: { rows: 3, columns: 4, values: [1.45, 2.18, 3.27, 4.91] },
    Medium: { rows: 4, columns: 7, values: [1.29, 1.72, 2.29, 3.06, 4.08, 5.45, 7.26] },
    Big: { rows: 5, columns: 10, values: [1.21, 1.51, 1.89, 2.36, 2.96, 3.7, 4.62, 5.78, 7.22, 9.03] },
  };

  export default maps
  