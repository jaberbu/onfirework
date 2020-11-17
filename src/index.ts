#!/usr/bin/env node
import {
  Firestore,
  QueryDocumentSnapshot,
  QuerySnapshot
} from '@google-cloud/firestore';

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
   * @param {*} data
   * @param {string} [id]
   * @return {*}  {Promise<void>}
   * @memberof Onfirework
   */
  createDoc(data: T, id?: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!id || !id.trim()) {
        this.db
          .collection(this.collection)
          .add(data)
          .then(() => resolve())
          .catch((err: any) =>
            reject({
              status: 500,
              data: { message: 'Internal Server Error !', err }
            })
          );
      } else {
        this.db
          .collection(this.collection)
          .doc(id)
          .set(data)
          .then(() => resolve())
          .catch((err: any) =>
            reject({
              status: 500,
              data: { message: 'Internal Server Error !', err }
            })
          );
      }
    });
  }

  /**
   * Reads the document referred to by this DocumentReference.
   * @param {string} id
   * @return {*}  {Promise<any>}
   * @memberof Onfirework
   */
  readDoc(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db
        .collection(this.collection)
        .doc(id)
        .get()
        .then((querySnapshot: any) => {
          if (querySnapshot.data()) {
            resolve(<any>{ _id: id, ...querySnapshot.data() });
          } else {
            reject({
              status: 400,
              data: {
                message: 'Invalid Request !',
                error: { errmsg: 'Document not found' }
              }
            });
          }
        })
        .catch((err: any) => {
          reject({
            status: 500,
            data: { message: 'Internal Server Error !', err }
          });
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
        .catch((err: any) =>
          reject({
            status: 500,
            data: { message: 'Internal Server Error !', err }
          })
        );
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
        .catch((err: any) =>
          reject({
            status: 500,
            data: { message: 'Internal Server Error !', err }
          })
        );
    });
  }

  /**
   * Delete documents according to filtering.
   * @param {any[]} filter   ['FIELD', '==', 15] || [['FIELD', '>', 15], ['FIELD', '<', 2]]
   * @return {*}  {Promise<void>}
   * @memberof Onfirework
   * @see https://firebase.google.com/docs/firestore/query-data/queries
   */
  deleteDocs(filter: any[]): Promise<void> {
    return new Promise((resolve, reject) => {
      let call = this.db.collection(this.collection);
      filter =
        filter.length && !(filter[0] instanceof Array) ? [[...filter]] : filter;
      filter.forEach(
        (data: [any, any, any]) => (call = <any>call.where(...data))
      );
      call
        .get()
        .then((querySnapshot: any) => {
          querySnapshot.forEach((doc: any) => doc.ref.delete());
          resolve();
        })
        .catch((err: any) => {
          reject({
            status: 500,
            data: { message: 'Internal Server Error !', err }
          });
        });
    });
  }

  /**
   * Reads documents according to filtering.
   *
   * If the filter is not passed, it will show all documents.
   * @param {any[]} [filter=[]]    ['FIELD', '==', 15] || [['FIELD', '>', 15], ['FIELD', '<', 2]]
   * @return {*}  {Promise<T[]>}
   * @memberof Onfirework
   * @see https://firebase.google.com/docs/firestore/query-data/queries
   */
  listDocs(filter: any[] = []): Promise<T[]> {
    return new Promise((resolve, reject) => {
      let call = this.db.collection(this.collection);
      filter =
        filter.length && !(filter[0] instanceof Array) ? [[...filter]] : filter;
      filter.forEach(
        (data: [any, any, any]) => (call = <any>call.where(...data))
      );
      call
        .get()
        .then((querySnapshot: QuerySnapshot) => {
          const results: any[] = [];
          querySnapshot.forEach((doc: QueryDocumentSnapshot) =>
            results.push({ _id: doc.id, ...doc.data() })
          );
          resolve(results);
        })
        .catch((err: any) => {
          reject({
            status: 500,
            data: { message: 'Internal Server Error !', err }
          });
        });
    });
  }
}
