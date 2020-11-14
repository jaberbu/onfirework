import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// const credentials = require("./credentials.json");
// admin.initializeApp({
//   credential: admin.credential.cert(credentials),
//   databaseURL: ""
// });

admin.initializeApp();

import { load_dummy_data } from './load_dummy_data'
import { procedure_example } from './procedures/procedure_example';

export const load_data = functions.https.onRequest(async (request, response) => {
  load_dummy_data(request, response)
});

export const procedure_example1 = functions.https.onRequest(async (request, response) => {
  await procedure_example(request, response)
});


