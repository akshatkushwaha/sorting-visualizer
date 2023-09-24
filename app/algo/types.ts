import { Status, Algo, Speed } from "./enums";

export type BarType = {
    height: number;
    status: Status;
};

export type AlgoType = {
    [key in Algo]: (
        barList: BarType[],
        speed: Speed,
        setArray: (barList: BarType[]) => void
    ) => void;
};
