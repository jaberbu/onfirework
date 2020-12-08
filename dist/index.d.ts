#!/usr/bin/env node
import { Firestore } from '@google-cloud/firestore';
import { Filter } from './type.filter';
import { Result } from './type.result';
export { Filter, Result };
/**
 * Makes Firebase easier!
 *
 * @author Jacek B. Budzynski
 * @export
 * @class Onfirework
 * @see https://github.com/jaberbu/onfirework
 */
export declare class Onfirework<T> {
    db: Firestore;
    collection: string;
    /**
     * Creates an instance of Onfirework.
     * @param {Firestore} db
     * @param {string} collectionPath
     * @memberof Onfirework
     */
    constructor(db: Firestore, collectionPath: string);
    /**
     * Add a new document to this collection with the specified data.
     *
     * If the DocumentReference is not passed it will be created automatically.
     * @param {*} data
     * @param {string} [id]
     * @return {*}  {Promise<void>}
     * @memberof Onfirework
     */
    createDoc(data: T, id?: string): Promise<void>;
    /**
     * Reads the document referred to by this DocumentReference.
     * @param {string} id
     * @return {*}  {Promise<any>}
     * @memberof Onfirework
     */
    readDoc(id: string): Promise<Result<T>>;
    /**
     * Updates fields in the document referred to by this DocumentReference.
     *
     * The update will fail if applied to a document that does not exist.
     * @param {string} id
     * @param {Partial<T>} updateData
     * @return {*}  {Promise<void>}
     * @memberof Onfirework
     */
    updateDoc(id: string, updateData: Partial<T>): Promise<void>;
    /**
     * Deletes the document referred to by this DocumentReference.
     * @param {string} id
     * @return {*}  {Promise<void>}
     * @memberof Onfirework
     */
    deleteDoc(id: string): Promise<void>;
    /**
     * Delete documents according to filtering.
     * @param {(Filter<T>[])} [filter]
     * @return {*}  {Promise<void>}
     * @memberof Onfirework
     * @see https://firebase.google.com/docs/firestore/query-data/queries
     */
    deleteDocs(filter?: Filter<T>[]): Promise<void>;
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
    listDocs(filter?: Filter<T>[], limit?: number): Promise<Result<T>[]>;
    private executeQuery;
    /**
     * Gets first document according to filtering.
     *
     * @param {Filter<T>[]} [filter]
     * @return {*}  {Promise<Result<T>>}
     * @memberof Onfirework
     * @see https://firebase.google.com/docs/firestore/query-data/queries
     */
    listFirst(filter?: Filter<T>[]): Promise<Result<T>>;
}
