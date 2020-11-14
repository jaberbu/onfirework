import * as q from './queries';
import { ModelInterface } from './model';

export {createDoc, readDoc, updateDoc, deleteDoc, listDocs}


/**
 * Crear nuevo documento
 *
 * @param {ModelInterface} create
 * @param {string} [id='']
 * @return {*}  {Promise<void>}
 */
function createDoc(create:ModelInterface, id:string=''):Promise<void> {
	return new Promise((resolve, reject) => {
		q.createQuery(create, id).then(() => {
			resolve();
		}).catch((err:any) => {
			reject(err);
		});
	});
}


/**
 * Leer documento
 *
 * @param {string} [id='']
 * @return {*}  {Promise<ModelInterface>}
 */
function readDoc(id:string=''):Promise<ModelInterface> {
	return new Promise((resolve, reject) => {
		q.readQuery(id).then((result:ModelInterface) => {
			resolve(result);
		}).catch((err:any) => {
			reject(err);
		});
	});
}


/**
 * Actualizar el documento
 *
 * @param {string} [id='']
 * @param {Partial<ModelInterface>} update
 * @return {*}  {Promise<void>}
 */
function updateDoc(id:string='', update:Partial<ModelInterface>):Promise<void> {
	return new Promise((resolve, reject) => {
		q.updateQuery(id, update).then(() => {
			resolve();
		}).catch((err:any) => {
			reject(err);
		});
	});
}


/**
 * Borrar documento
 *
 * @param {string} [id='']
 * @return {*}  {Promise<void>}
 */
function deleteDoc(id:string=''):Promise<void> {
	return new Promise((resolve, reject) => {
		q.deleteQuery(id).then(() => {
			resolve();
		}).catch((err:any) => {
			reject(err);
		});
	});
}


/**
 * Listar documentos
 *
 * @param {any[]} [where=[]]
 * @return {*}  {Promise<ModelInterface[]>}
 */
function listDocs(where:any[]=[]):Promise<ModelInterface[]> {
	return new Promise((resolve, reject) => {
		q.listQuery(where).then((results:ModelInterface[]) => {
			resolve(results);
		}).catch((err:any) => {
			reject(err);
		});
	});
}

