import * as q from './queries';
import { ModelInterface } from './model';


/**
 * Funcion para cargar datos dummie
 * 
 * @export
 * @return {*}  {Promise<void>}
 */
export function load_dummy_data():Promise<void> {
  return new Promise((resolve, reject) => { 
    const documents:Array<any> = [ // <-- Cambiar Array<any> por Array<ModelInterface>
      {
        'FIELD': 'Give me',
        'FIELD_2': 5,
      },
    ];
    
    documents.forEach((doc:ModelInterface) => {
      q.createQuery(doc).then(() => {
        resolve()
      }).catch((err:any) => {
        reject(err);
      });

    })
  });
}