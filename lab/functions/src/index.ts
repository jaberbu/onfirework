import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

import { Schema as BikeSchema } from './models/bikes';
import { initial_data as bikes_data } from './models/bikes';

import { Filter, Onfirework, Result } from '../../../src/index';


admin.initializeApp()
let db = admin.firestore();

const bike = new Onfirework<BikeSchema>(db, 'BIKES');


export const createDocs = functions.https.onRequest(async (request, response) => {
  functions.logger.info("createDocs", {structuredData: true});
  try {
    const datas = (request.body.length) ? request.body : bikes_data;
    await Promise.all(datas.map((data:BikeSchema) => bike.createDoc(data)));
    const result:Result<BikeSchema>[] = await bike.listDocs()
    response.send(result)
  } catch(err) {
    response.send(err)
  }
});


export const listDocs = functions.https.onRequest(async (request, response) => {
  functions.logger.info("listDocs", {structuredData: true});
  try {
    const limit = parseInt(request.query.limit as string, 10) ?? undefined
    const where:Filter<BikeSchema>[] = (request.body.length) ? request.body : [];
    const result:Result<BikeSchema>[] = await bike.listDocs(where, limit)
    response.send(result)
  } catch(err) {
    response.send(err)
  }
});


export const listFirst = functions.https.onRequest(async (request, response) => {
  functions.logger.info("listFirst", {structuredData: true});
  try {
    const where:Filter<BikeSchema>[] = (request.body.length) ? request.body : [];
    const result:Result<BikeSchema> = await bike.listFirst(where)
    response.send(result)
  } catch(err) {
    response.send(err)
  }
});


export const deleteDocs = functions.https.onRequest((request, response) => {
  functions.logger.info("deleteDocs", {structuredData: true});
  try {
    const where:Filter<BikeSchema>[] = (request.body.length) ? request.body : [];
    bike.deleteDocs(where)
    .then(() => response.send('Deleted !'))
    .catch(err => response.send(err))
  } catch(err) {
    response.send(err)
  }
});


export const updateDocs = functions.https.onRequest(async (request, response) => {
  functions.logger.info("updateDocs", {structuredData: true});
  try {
    const where:Filter<BikeSchema>[] = (request.body.where.length) ? request.body.where : [];
    const updateData:Partial<BikeSchema> = request.body.update;
    await bike.updateDocs(where, updateData)
    const result:Result<BikeSchema>[] = await bike.listDocs(where)
    response.send(result)
  } catch(err) {
    response.send(err)
  }
});
