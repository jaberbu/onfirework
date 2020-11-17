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
import { Onfirework } from 'onfirework';

interface MyCollection {
  name: string,
  age: number,
} 

firebase.initializeApp();
let db = firebase.firestore();

const foo = new Onfirework<MyCollection>(db, 'MY_COLLECTION')

function bar() {
  foo.listDocs().then((results:MyCollection[]) => {
    ...
  });
}
```

Or 

```
import * as firebase from 'firebase-admin';
import { Onfirework } from 'onfirework';

firebase.initializeApp();
let db = firebase.firestore();

const foo = new Onfirework(db, 'MY_COLLECTION')

function bar() {
  foo.listDocs().then(results => {
    ...
  });
}
```

## Available methods

#### ```createDoc(data: Inreface, id?: DocumentReference): Promise<void>```
Add a new document to this collection with the specified data.

If the DocumentReference is not passed it will be created automatically.


#### ```readDoc(id: DocumentReference): Promise<Interface>```
Reads the document referred to by this DocumentReference.


#### ```updateDoc(id: DocumentReference, data: Partial<Inreface>): Promise<void>```
Updates fields in the document referred to by this DocumentReference.

The update will fail if applied to a document that does not exist.


#### ```deleteDoc(id: DocumentReference): Promise<void>```
Deletes the document referred to by this DocumentReference.


#### ```deleteDocs(filter: [FieldPath, WhereFilterOp, any][]): Promise<void>```
Delete documents according to filtering.

If the filter is not passed, it will remove all documents.


#### ```listDocs(filter: [FieldPath, WhereFilterOp, any][]): Promise<Interface[]>```
Reads documents according to filtering.
  
If the filter is not passed, it will show all documents.

---------------------------------------



## License
The project is licensed under the [BSD License](LICENSE).