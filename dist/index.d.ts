#!/usr/bin/env node
/**
 * Makes Firebase easier!
 *
 * @author Jacek B. Budzynski
 * @export
 * @class Onfirework
 * @see https://github.com/jaberbu/onfirework
 */
export declare class Onfirework {
    db: any;
    collection: string;
    /**
     * Creates an instance of Onfirework.
     * @param {any} db
     * @param {string} collectionPath
     * @memberof Onfirework
     */
    constructor(db: any, collectionPath: string);
    /**
     * Add a new document to this collection with the specified data.
     *
     * If the DocumentReference is not passed it will be created automatically.
     * @param {*} data
     * @param {string} [id]
     * @return {*}  {Promise<void>}
     * @memberof Onfirework
     */
    createDoc(data: any, id?: string): Promise<void>;
    /**
     * Reads the document referred to by this DocumentReference.
     * @param {string} id
     * @return {*}  {Promise<any>}
     * @memberof Onfirework
     */
    readDoc(id: string): Promise<any>;
    /**
     * Updates fields in the document referred to by this DocumentReference.
     *
     * The update will fail if applied to a document that does not exist.
     * @param {string} id
     * @param {Partial<any>} updateData
     * @return {*}  {Promise<void>}
     * @memberof Onfirework
     */
    updateDoc(id: string, updateData: Partial<any>): Promise<void>;
    /**
     * Deletes the document referred to by this DocumentReference.
     * @param {string} id
     * @return {*}  {Promise<void>}
     * @memberof Onfirework
     */
    deleteDoc(id: string): Promise<void>;
    /**
     * Delete documents according to filtering.
     * @param {any[]} filter   ['FIELD', '==', 15] || [['FIELD', '>', 15], ['FIELD', '<', 2]]
     * @return {*}  {Promise<void>}
     * @memberof Onfirework
     * @see https://firebase.google.com/docs/firestore/query-data/queries
     */
    deleteDocs(filter: any[]): Promise<void>;
    /**
     * Reads documents according to filtering.
     *
     * If the filter is not passed, it will show all documents.
     * @param {any[]} [filter=[]]    ['FIELD', '==', 15] || [['FIELD', '>', 15], ['FIELD', '<', 2]]
     * @return {*}  {Promise<any[]>}
     * @memberof Onfirework
     * @see https://firebase.google.com/docs/firestore/query-data/queries
     */
    listDocs(filter?: any[]): Promise<any[]>;
}
