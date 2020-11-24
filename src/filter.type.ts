import { WhereFilterOp } from "@google-cloud/firestore";

export type Filter<T> = [
  keyof T,
  WhereFilterOp,
  T[keyof T]
]
