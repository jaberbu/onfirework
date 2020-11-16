# Firebase for dummies [BETA].

Easiest way to access to Cloud Firestore collections

## Getting Started

```
npm i onfirework
```

Example:
```
import { Onfirework } from 'onfirework';

const my_collection_1 = new Onfirework(db, 'COLLECTION_NAME_1')
const my_collection_2 = new Onfirework(db, 'COLLECTION_NAME_2')

...
my_collection_1.listDocs()
...
```




## License
The project is licensed under the [BSD License](LICENSE)..