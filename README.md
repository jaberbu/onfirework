# Firebase for dummies [BETA].

[![npm][npm-image]][npm-url]

[npm-image]: https://img.shields.io/npm/v/onfirework.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/onfirework

Easiest way to access to Cloud Firestore collections

## Install

```
npm i onfirework
```


## Usage
```
import { Onfirework } from 'onfirework';

const my_collection = new Onfirework(db, 'COLLECTION_NAME_1')

...
my_collection.listDocs([[ 'name', '==', 'Oliver' ],[ 'age', '>=', 21 ]])
my_collection.readDoc()
...
```




## License
The project is licensed under the [BSD License](LICENSE).