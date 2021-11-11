import {
  getLanguage,
  getLanguages,
  addNewLanguage,
  updateLanguage,
  deleteLanguage
} from '../controllers/controllerLanguage';

import auth from '../controllers/checkAuth';

const routeLanguage = (app) => {
  app.route('/language')
  /**
   * @api {get} /language/ Get all Language.
   * @apiName getLanguage
   * @apiError 400 Unable to access the server
   * @apiGroup Language
   *
   * @apiSuccess (200) {String} name Name of the Language.
   * @apiSuccess (200) {Date} created_at Date of creation of the Language.
   * @apiSuccess (200) {Date} updated_at Date of the last update.
   * @apiSuccess (200) {ObjectId} _id Unique id.
   */
    .get(auth.required, auth.admin, getLanguages)
  /**
   * @api {post} /language/ Add new Language
   * @apiName addNewLanguage
   * @apiError 400 Wrong request
   * @apiGroup Language
   *
   * @apiParam {String} name Name of the language.
   *
   * @apiSuccess (201) {String} name Name of the language.
   * @apiSuccess (201) {Date} created_at Date of creation of the course.
   * @apiSuccess (201) {Date} updated_at Date of the last update.
   * @apiSuccess (201) {ObjectId} _id Unique id.
   */
    .post(addNewLanguage);

  app.route('/language/:id')
  /**
   * @api {get} /language/:id Request a Language with id
   * @apiName GetLanguage
   * @apiError 404 Language not found
   * @apiGroup Language
   *
   * @apiParam {Number} id Language unique ID.
   *
   * @apiSuccess (200) {String} name Name of the language.
   * @apiSuccess (200) {Date} created_at Date of creation of the course.
   * @apiSuccess (200) {Date} updated_at Date of the last update.
   * @apiSuccess (200) {ObjectId} _id Unique id.
   */
    .get(auth.required, auth.admin, getLanguage)
  /**
   * @api {put} /language/:id Update a language with id
   * @apiName updateLanguage
   * @apiError 400 Language not found
   * @apiGroup Language
   *
   * @apiParam {Number} id Users unique ID.
   * @apiParam {String} name Name of the language.
   *
   * @apiSuccess (200) {String} name Name of the language.
   * @apiSuccess (200) {Date} created_at Date of creation of the course.
   * @apiSuccess (200) {Date} updated_at Date of the last update.
   * @apiSuccess (200) {ObjectId} _id Unique id.
   */
    .put(auth.required, auth.admin, updateLanguage)
  /**
 * @api {delete} /language/:id Delete a language.
 * @apiName deleteLanguage
 * @apiError 404 Bad request
 * @apiGroup Language
 *
 * @apiParam {Number} id Language unique ID.
 *
 * @apiSuccess (200) {Number} n value.
 * @apiSuccess (200) {Number} ok value.
 */
    .delete(auth.required, auth.admin, deleteLanguage);
};

export default routeLanguage;
