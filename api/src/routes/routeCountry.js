import {
  getCountry,
  getCountries,
  addNewCountry,
  updateCountry,
  deleteCountry
} from '../controllers/controllerCountry';

import auth from '../controllers/checkAuth';

const routeCountry = (app) => {
  app.route('/country')
  /**
   * @api {get} /country/ Get all categories.
   * @apiName getCountrys
   * @apiError 400 Unable to access the server
   * @apiGroup Country
   *
   * @apiSuccess (200) {String} name Name of the country.
   * @apiSuccess (200) {Date} created_at Date of creation of the course.
   * @apiSuccess (200) {Date} updated_at Date of the last update.
   * @apiSuccess (200) {ObjectId} _id Unique id.
   */
    .get(auth.required, auth.admin, getCountries)
  /**
   * @api {post} /country/ Add new country
   * @apiName addNewCountry
   * @apiError 400 Wrong request
   * @apiGroup Country
   *
   * @apiParam {String} name Name of the country.
   *
   * @apiSuccess (201) {String} name Name of the country.
   * @apiSuccess (201) {Date} created_at Date of creation of the course.
   * @apiSuccess (201) {Date} updated_at Date of the last update.
   * @apiSuccess (201) {ObjectId} _id Unique id.
   */
    .post(addNewCountry);

  app.route('/country/:id')
  /**
   * @api {get} /country/:id Request a Country with id
   * @apiName GetCountry
   * @apiError 404 Country not found
   * @apiGroup Country
   *
   * @apiParam {Number} id Country unique ID.
   *
   * @apiSuccess (200) {String} name Name of the country.
   * @apiSuccess (200) {Date} created_at Date of creation of the course.
   * @apiSuccess (200) {Date} updated_at Date of the last update.
   * @apiSuccess (200) {ObjectId} _id Unique id.
   */
    .get(auth.required, auth.admin, getCountry)
  /**
   * @api {put} /country/:id Update a country with id
   * @apiName updateCountry
   * @apiError 400 Country not found
   * @apiGroup Country
   *
   * @apiParam {Number} id Users unique ID.
   * @apiParam {String} name Name of the country.
   *
   * @apiSuccess (200) {String} name Name of the country.
   * @apiSuccess (200) {Date} created_at Date of creation of the course.
   * @apiSuccess (200) {Date} updated_at Date of the last update.
   * @apiSuccess (200) {ObjectId} _id Unique id.
   */
    .put(auth.required, auth.admin, updateCountry)
  /**
 * @api {delete} /country/:id Delete a country.
 * @apiName deleteCountry
 * @apiError 404 Bad request
 * @apiGroup Country
 *
 * @apiParam {Number} id Country unique ID.
 *
 * @apiSuccess (200) {Number} n value.
 * @apiSuccess (200) {Number} ok value.
 */
    .delete(auth.required, auth.admin, deleteCountry);
};

export default routeCountry;
