import * as admin from 'firebase-admin';
import { ModelInterface, COLLECTION_NAME } from './model';

let db = admin.firestore();

export { createQuery, readQuery, updateQuery, deleteQuery, listQuery }


/**
 * Crea un nuevo documento, si no se pasa la ID, se auto genrara
 *
 * @param {*} create
 * @param {string} [id]
 * @return {*}  {Promise<void>}
 */
function createQuery(create:ModelInterface, id?:string):Promise<void> {
	return new Promise((resolve, reject) => {
		if (!id || !id.trim()) {
			db.collection(COLLECTION_NAME).add(create).then(() => {
				resolve();
			}).catch(err => {
				reject({status: 500, data: { message: 'Internal Server Error !', err }});
			});
		} else {
			db.collection(COLLECTION_NAME).doc(id).set(create).then(() => {
				resolve();
			}).catch(err => {
				reject({status: 500, data: { message: 'Internal Server Error !', err }});
			});
		}
	});
}


/**
 * Muestra el documento segun la ID
 *
 * @param {string} [id='']
 * @return {*}  {Promise<ModelInterface>}
 */
function readQuery(id:string=''):Promise<ModelInterface> {
	return new Promise((resolve, reject) => {
		if (!id || !id.trim()) {
			reject({ status : 400, data: { message: 'Invalid Request !', error: { errmsg: "'id' is required" } }});
		} else {
			db.collection(COLLECTION_NAME).doc(id).get().then(querySnapshot => {
				if (querySnapshot.data()) {
					resolve(<ModelInterface>{_id: id, ...querySnapshot.data()});
				} else {
					reject({status : 400, data: { message: 'Invalid Request !', error: { errmsg: "Document not found" }}})
				}
			}).catch(err => {
				reject({status: 500, data: { message: 'Internal Server Error !', err }});
			});
		}
	});
}


/**
 * Actualiza el documento segun la ID pasada y los campos a actualizar
 *
 * @param {string} [id='']
 * @param {Partial<ModelInterface>} update
 * @return {*}  {Promise<void>}
 */
function updateQuery(id:string='', update:Partial<ModelInterface>):Promise<void> {
	return new Promise((resolve, reject) => {
		if (!id || !id.trim()) {
			reject({ status : 400, data: { message: 'Invalid Request !', error: { errmsg: "'id' is required" } }});
		} else {
			db.collection(COLLECTION_NAME).doc(id).update(update).then(() => {
				resolve();
			}).catch(err => {
				reject({status: 500, data: { message: 'Internal Server Error !', err }});
			});
		}
	});
}


/**
 * Borra el documento segun la ID
 *
 * @param {string} [id='']
 * @return {*}  {Promise<void>}
 */
function deleteQuery(id:string=''):Promise<void> {
	return new Promise((resolve, reject) => {
		if (!id || !id.trim()) {
			reject({ status : 400, data: { message: 'Invalid Request !', error: { errmsg: "'id' is required" } }});
		} else {
			db.collection(COLLECTION_NAME).doc(id).delete().then(() => {
				resolve();
			}).catch(err => {
				reject({status: 500, data: { message: 'Internal Server Error !', err }});
			});
		}
	});
}


/**
 * Lista documentos segun la condicion WHERE, si no se pasa mostrara todos los resultados
 *
 * @param {any[]} [where=[]]    ['FIELD', '==', 15] || [['FIELD', '>', 15], ['FIELD', '<', 2]]
 * @return {*}  {Promise<ModelInterface[]>}
 * @see https://firebase.google.com/docs/firestore/query-data/queries
 */
function listQuery(where:any[]=[]):Promise<ModelInterface[]> {
	return new Promise((resolve, reject) => {
		let call = db.collection(COLLECTION_NAME);
		where = (where.length && !(where[0] instanceof Array)) ? [[...where]] : where;
		where.forEach((data:[any, any, any]) => call = <any>call.where(...data));
		call.get().then(querySnapshot => {
			const results:ModelInterface[] = [];
			querySnapshot.forEach((doc:any) => results.push({_id: doc.id, ...doc.data()}));
			resolve(results);
		}).catch(err => {
			reject({status: 500, data: { message: 'Internal Server Error !', err }});
		});
	});
}