import * as app_example from './apps/app_example/dummy';

export { load_dummy_data }

/**
 * @name load_dummy_data
 * @description Loads dummy data.
 * 
 * @param {*} req
 * @param {*} res
 */
function load_dummy_data(req:any, res:any): any {
  try {
    const loadingResult = app_example.load_dummy_data()
    if(!loadingResult) {
      throw new Error("Error loading dummy data");
    } else {
      return res.send('Done')
    }
  } catch (error) {
    console.error(error)
  }
}