#!/usr/bin/env node
import {
  DocumentData,
  Firestore,
  QueryDocumentSnapshot,
  QuerySnapshot,
} from '@google-cloud/firestore';
import * as _ from "lodash";

import { Filter } from './type.filter';
import { Result } from './type.result';

export { Filter, Result }

/**
 * Makes Firebase easier!
 *
 * @author Jacek B. Budzynski
 * @export
 * @class Onfirework
 * @see https://github.com/jaberbu/onfirework
 */
export class Onfirework<T> {
  db: Firestore;
  collection: string;

  /**
   * Creates an instance of Onfirework.
   * @param {Firestore} db
   * @param {string} collectionPath
   * @memberof Onfirework
   */
  constructor(db: Firestore, collectionPath: string) {
    this.db = db;
    this.collection = collectionPath;
  }

  /**
   * Add a new document to this collection with the specified data.
   *
   * If the DocumentReference is not passed it will be created automatically.
   * @param {Partial<T>} data
   * @param {string} [id]
   * @return {*}  {Promise<void>}
   * @memberof Onfirework
   */
  createDoc(data: Partial<T>, id?: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!id || !id.trim()) {
        this.db
          .collection(this.collection)
          .add(data)
          .then(() => resolve())
          .catch((err: any) => {
            if(err) {console.error(err)}
            reject(new Error('Internal Servicer Error !'))
          });
      } else {
        this.db
          .collection(this.collection)
          .doc(id)
          .set(data)
          .then(() => resolve())
          .catch((err: any) => {
            if (err) {
              console.error(err)
              reject(Error(err))
            } else {
              reject(Error('Internal server error !'));
            }
          });
      }
    });
  }

  /**
   * Reads the document referred to by this DocumentReference.
   * @param {string} id
   * @return {*}  {Promise<any>}
   * @memberof Onfirework
   */
  readDoc(id: string): Promise<Result<T>> {
    return new Promise((resolve, reject) => {
      this.db
        .collection(this.collection)
        .doc(id)
        .get()
        .then((querySnapshot) => {
          if (querySnapshot.data()) {
            resolve(<Result<T>>{ _id: id, ...querySnapshot.data() });
          } else {
            throw new Error('Document not found')
          }
        })
        .catch((err: any) => {
          if (err) {
            console.error(err)
            reject(Error(err))
          } else {
            reject(Error('Internal server error !'));
          }
        });
    });
  }

  /**
   * Updates fields in the document referred to by this DocumentReference.
   *
   * The update will fail if applied to a document that does not exist.
   * @param {string} id
   * @param {Partial<T>} updateData
   * @return {*}  {Promise<void>}
   * @memberof Onfirework
   */
  updateDoc(id: string, updateData: Partial<T>): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db
        .collection(this.collection)
        .doc(id)
        .update(updateData)
        .then(() => resolve())
        .catch((err: any) => {
          if (err) {
            console.error(err)
            reject(Error(err))
          } else {
            reject(Error('Internal server error !'));
          }
        });
    });
  }

  /**
   * Update documents according to filtering.
   * @param {Filter<T>[]} filter
   * @param {Partial<T>} updateData
   * @return {*}  {Promise<void>}
   * @memberof Onfirework
   * @see https://firebase.google.com/docs/firestore/query-data/queries
   */
  updateDocs(filter: Filter<T>[], updateData: Partial<T>): Promise<void> {
    return new Promise((resolve, reject) => {
      let call:DocumentData = this.db.collection(this.collection);
      if (filter) filter.map((data: Filter<T>) => {
        call = call.where(...data);
        return call;
      });
      call
        .get()
        .then((querySnapshot: QuerySnapshot) => {
          querySnapshot.forEach((doc: QueryDocumentSnapshot) => doc.ref.update(updateData));
          resolve();
        })
        .catch((err: any) => {
          if (err) {
            console.error(err)
            reject(Error(err))
          } else {
            reject(Error('Internal server error !'));
          }
        });
    });
  }

  /**
   * Deletes the document referred to by this DocumentReference.
   * @param {string} id
   * @return {*}  {Promise<void>}
   * @memberof Onfirework
   */
  deleteDoc(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db
        .collection(this.collection)
        .doc(id)
        .delete()
        .then(() => resolve())
        .catch((err: any) => {
          if (err) {
            console.error(err)
            reject(Error(err))
          } else {
            reject(Error('Internal server error !'));
          }
        });
    });
  }

  /**
   * Delete documents according to filtering.
   * @param {(Filter<T>[])} [filter]
   * @return {*}  {Promise<void>}
   * @memberof Onfirework
   * @see https://firebase.google.com/docs/firestore/query-data/queries
   */
  deleteDocs(filter?: Filter<T>[]): Promise<void> {
    return new Promise((resolve, reject) => {
      let call:DocumentData = this.db.collection(this.collection);
      if (filter) filter.map((data: Filter<T>) => {
        call = call.where(...data);
        return call;
      });
      call
        .get()
        .then((querySnapshot: QuerySnapshot) => {
          querySnapshot.forEach((doc: QueryDocumentSnapshot) => doc.ref.delete());
          resolve();
        })
        .catch((err: any) => {
          if (err) {
            console.error(err)
            reject(Error(err))
          } else {
            reject(Error('Internal server error !'));
          }
        });
    });
  }

  /**
   * Reads documents according to filtering.
   *
   * If the filter is not passed, it will show all documents.
   * @param {Filter<T>[]} [filter]
   * @param {number} [limit]
   * @return {*}  {Promise<Result<T>[]>}
   * @memberof Onfirework
   * @see https://firebase.google.com/docs/firestore/query-data/queries
   */
  async listDocs(filter?: Filter<T>[], limit?:number): Promise<Result<T>[]> {
    let call:DocumentData = this.db.collection(this.collection);
    const rangeOperators = ['<', '<=', '>', '>='];
    const rangeFilters: Filter<T>[] = [];
    if (filter) filter.forEach((data: Filter<T>) => {
      if(rangeOperators.includes(data[1])) {
        rangeFilters.push(data);
      } else {
        call = call.where(...data);
      }
    });
    if(rangeFilters.length >= 1) {
      const eachRangeResult = rangeFilters.map((filter): Promise<Result<T>[]> => {
        const newCall = call.where(...filter);
        return this.executeQuery(newCall)
      })
      const resolvedRangeResults = await Promise.all(eachRangeResult);
      const notRangedCall = await this.executeQuery(call);
      const resultIntersection = _.intersectionWith(...resolvedRangeResults, notRangedCall, _.isEqual);
      return limit ? _.take(resultIntersection, limit) : resultIntersection;
    } else {
      if (limit) call = call.limit(limit)
      return await this.executeQuery(call);
    }
  }


  private executeQuery(call: DocumentData): Promise<Result<T>[]> {
    return new Promise((resolve, reject) => {
      call
        .get()
        .then((querySnapshot: QuerySnapshot) => {
          const results: Result<T>[] = [];
          querySnapshot.forEach((doc: QueryDocumentSnapshot) =>
            results.push(<Result<T>>{ _id: doc.id, ...doc.data() })
          );
          resolve(results);
        })
        .catch((err: any) => {
          if (err) {
            console.error(err);
            reject(Error(err));
          } else {
            reject(Error('Internal server error !'));
          }
        });
    });
  }

  /**
   * Gets first document according to filtering.
   *
   * @param {Filter<T>[]} [filter]
   * @return {*}  {Promise<Result<T>>}
   * @memberof Onfirework
   * @see https://firebase.google.com/docs/firestore/query-data/queries
   */
  listFirst(filter?: Filter<T>[]): Promise<Result<T>> {
    return new Promise((resolve, reject) => {
      let call:DocumentData = this.db.collection(this.collection);
      if (filter) filter.map((data: Filter<T>) => {
        call = call.where(...data);
        return call;
      });
      call.limit(1)
        .get()
        .then((querySnapshot: QuerySnapshot) => {
          const results: Result<T>[] = [];
          querySnapshot.forEach((doc: QueryDocumentSnapshot) =>
            results.push(<Result<T>>{ _id: doc.id, ...doc.data() })
          );
          resolve(results[0]);
        })
        .catch((err: any) => {
          if (err) {
            console.error(err)
            reject(Error(err))
          } else {
            reject(Error('Internal server error !'));
          }
        });
    });
  }

}
