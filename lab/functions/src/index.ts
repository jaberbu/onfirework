import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

import { Schema as BikeSchema } from './models/bikes';
import { initial_data as bikes_data } from './models/bikes';

import { Filter, Onfirework, Result } from '../../../src/index';


admin.initializeApp()
let db = admin.firestore();

const bike = new Onfirework<BikeSchema>(db, 'BIKES');

export const loadInitData = functions.https.onRequest((request, response) => {
  functions.logger.info("LoadInitData", {structuredData: true});
  try {
    bikes_data.map((data:BikeSchema) => bike.createDoc(data))
    response.send('LoadInitData: DONE!')
  } catch(err) {
    response.send(err)
  }
});


export const listCall = functions.https.onRequest(async (request, response) => {
  functions.logger.info("listCall", {structuredData: true});
  try {

    const where:Filter<BikeSchema>[] = [['BRAND', '==', 'Ducati'], ['HORSE_POWER', '>=', 70]]
    const ducati:Result<BikeSchema>[] = await bike.listDocs(where)

    response.send(ducati)

  } catch(err) {
    response.send(err)
  }
});


export const deleteCall = functions.https.onRequest((request, response) => {
  functions.logger.info("deleteCall", {structuredData: true});
  try {
    bike
    .deleteDocs([['HORSE_POWER', '>', 150]])
    .then(() => response.send('Deleted !')).catch(err => response.send(err))
  } catch(err) {
    response.send(err)
  }
});


export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("helloWorld", {structuredData: true});
  response.send("Hello from Firebase!");
});