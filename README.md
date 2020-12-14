# Firebase for dummies [BETA].

[![npm][npm-image]][npm-url]

[npm-image]: https://img.shields.io/npm/v/onfirework.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/onfirework

Easiest way to access to Cloud Firestore collections

## Install

```
npm install onfirework --save
```


## Example usage
```
import * as firebase from 'firebase-admin';
import { Onfirework, Filter, Result } from 'onfirework';

interface BikeSchema {
  BRAND: String;
  MODEL: String;
  HORSE_POWER: Number;
}

firebase.initializeApp();
let db = firebase.firestore();

const bikes = new Onfirework<BikeSchema>(db, 'BIKES')

/**
 * Select all docs from BIKES collection where BRAND is Ducati and HORSE_POWER greater or equal to 70
 */
async function listBikes() {
  
  const where:Filter<BikeSchema>[] = [
    ['BRAND', '==', 'Ducati'], ['HORSE_POWER', '>=', 70]
  ]
  const ducati:Result<BikeSchema>[] = await bikes.listDocs(where)

  console.log(ducati)
}
```

## Available methods

##### ```createDoc(data: Partial<Inreface>, id?: DocumentReference): Promise<void>```
Add a new document to this collection with the specified data.

If the DocumentReference is not passed it will be created automatically.


##### ```readDoc(id: DocumentReference): Promise<Result<Interface>>```
Read the document referred to by this DocumentReference.


##### ```updateDoc(id: DocumentReference, data: Partial<Inreface>): Promise<void>```
Updates fields in the document referred to by this DocumentReference.

The update will fail if applied to a document that does not exist.


##### ```updateDocs(filter: [FieldPath, WhereFilterOp, any][], data: Partial<Inreface>): Promise<void>```
Update documents according to filtering.


##### ```deleteDoc(id: DocumentReference): Promise<void>```
Deletes the document referred to by this DocumentReference.


##### ```deleteDocs(filter?: [FieldPath, WhereFilterOp, any][]): Promise<void>```
Delete documents according to filtering.

If the filter is not passed, it will remove all documents.


##### ```listDocs(filter?: [FieldPath, WhereFilterOp, any][], limit?: Number): Promise<Result<Interface>[]>```
Reads documents according to filtering.

If the filter is not passed, it will show all documents.
```
SELECT * FROM foo

foo.listDocs()
```

```
SELECT * FROM foo LIMIT 2

foo.listDocs([], 2)
```
```
SELECT * FROM foo WHERE foo.BRAND = 'Ducati' AND foo.COLOR = 'White' LIMIT 2

foo.listDocs([['BRAND', '==', 'Ducati'], ['COLOR', '==', 'White']], 2)
```
Keep in mind Firebase [Query limitations](https://firebase.google.com/docs/firestore/query-data/queries#query_limitations)


##### ```listFirst(filter?: [FieldPath, WhereFilterOp, any][]): Promise<Result<Interface>>```
Gets first document according to filtering.

---------------------------------------



## License
The project is licensed under the [BSD License](LICENSE).