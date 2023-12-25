import map from "../models/map";

export default {
    Small : new map(3, 4, [1.45, 2.18, 3.27, 4.91]),

    Medium : new map(4, 7, [1.29, 1.72, 2.29, 3.06, 4.08, 5.45, 7.26]),

    Big : new map(5, 10, [1.21, 1.51, 1.89, 2.36, 2.96, 3.7, 4.62, 5.78, 7.22, 9.03]),
}