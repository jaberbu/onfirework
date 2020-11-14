import * as functions from '../apps/app_example/functions'
import { ModelInterface } from '../apps/app_example/model';

/**
 * Procedimiento PISO_AGRUPAR_MES_ANIO_DIARIO
 * @param {*} req
 * @param {*} res
 */
export async function procedure_example(req:any, res:any) {
	try {
		const privateMethodExampleResult = private_method_example()
		if (!privateMethodExampleResult) {
			throw new Error("Error with private_method_example");
		}
		return res.send('Done')
	} catch (error) {
		console.error(error)
	}
}

/**
 * @name private_method_example
 * @description 
 * Funcion actualiza la coleccion de prueba
 * 
 * Actualiza FIELD_1
 *
 * @return {*}  {Promise<void>}
 */
function private_method_example(): Promise<void> {
	return new Promise((resolve, reject): void => {
		functions.listDocs().then((results:ModelInterface[]) => {
			results.forEach((doc:ModelInterface) => {
				functions.updateDoc(doc._id, {FIELD_1: 'test'}).then(() => {
					resolve()
				}).catch((err:any) => {
					reject(err);
				});
			})
		}).catch((err:any) => {
			reject(err);
		});
	});
}