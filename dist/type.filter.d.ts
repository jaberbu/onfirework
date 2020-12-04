import { WhereFilterOp } from "@google-cloud/firestore";
export declare type Filter<T> = [
    keyof T,
    WhereFilterOp,
    T[keyof T] | T[keyof T][]
];
