#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Onfirework = void 0;
/**
 * Makes Firebase easier!
 *
 * @author Jacek B. Budzynski
 * @export
 * @class Onfirework
 * @see https://github.com/jaberbu/onfirework
 */
class Onfirework {
    /**
     * Creates an instance of Onfirework.
     * @param {Firestore} db
     * @param {string} collectionPath
     * @memberof Onfirework
     */
    constructor(db, collectionPath) {
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
    createDoc(data, id) {
        return new Promise((resolve, reject) => {
            if (!id || !id.trim()) {
                this.db
                    .collection(this.collection)
                    .add(data)
                    .then(() => resolve())
                    .catch((err) => {
                    if (err) {
                        console.error(err);
                    }
                    reject(new Error('Internal Servicer Error !'));
                });
            }
            else {
                this.db
                    .collection(this.collection)
                    .doc(id)
                    .set(data)
                    .then(() => resolve())
                    .catch((err) => {
                    if (err) {
                        console.error(err);
                        reject(Error(err));
                    }
                    else {
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
    readDoc(id) {
        return new Promise((resolve, reject) => {
            this.db
                .collection(this.collection)
                .doc(id)
                .get()
                .then((querySnapshot) => {
                if (querySnapshot.data()) {
                    resolve(Object.assign({ _id: id }, querySnapshot.data()));
                }
                else {
                    throw new Error('Document not found');
                }
            })
                .catch((err) => {
                if (err) {
                    console.error(err);
                    reject(Error(err));
                }
                else {
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
    updateDoc(id, updateData) {
        return new Promise((resolve, reject) => {
            this.db
                .collection(this.collection)
                .doc(id)
                .update(updateData)
                .then(() => resolve())
                .catch((err) => {
                if (err) {
                    console.error(err);
                    reject(Error(err));
                }
                else {
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
    deleteDoc(id) {
        return new Promise((resolve, reject) => {
            this.db
                .collection(this.collection)
                .doc(id)
                .delete()
                .then(() => resolve())
                .catch((err) => {
                if (err) {
                    console.error(err);
                    reject(Error(err));
                }
                else {
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
    deleteDocs(filter) {
        return new Promise((resolve, reject) => {
            const call = this.db.collection(this.collection);
            if (filter)
                filter.map((data) => call.where(...data));
            call
                .get()
                .then((querySnapshot) => {
                querySnapshot.forEach((doc) => doc.ref.delete());
                resolve();
            })
                .catch((err) => {
                if (err) {
                    console.error(err);
                    reject(Error(err));
                }
                else {
                    reject(Error('Internal server error !'));
                }
            });
        });
    }
    /**
     * Reads documents according to filtering.
     *
     * If the filter is not passed, it will show all documents.
     * @param {Filter<Result<T>>[]} [filter]
     * @param {number} [limit]
     * @return {*}  {Promise<Result<T>[]>}
     * @memberof Onfirework
     * @see https://firebase.google.com/docs/firestore/query-data/queries
     */
    listDocs(filter, limit) {
        return new Promise((resolve, reject) => {
            let call = this.db.collection(this.collection);
            if (filter)
                filter.map((data) => call.where(...data));
            if (limit)
                call = call.limit(limit);
            call
                .get()
                .then((querySnapshot) => {
                const results = [];
                querySnapshot.forEach((doc) => results.push(Object.assign({ _id: doc.id }, doc.data())));
                resolve(results);
            })
                .catch((err) => {
                if (err) {
                    console.error(err);
                    reject(Error(err));
                }
                else {
                    reject(Error('Internal server error !'));
                }
            });
        });
    }
}
exports.Onfirework = Onfirework;
//# sourceMappingURL=index.js.map