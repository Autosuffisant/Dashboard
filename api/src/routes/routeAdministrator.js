/* eslint-disable max-len */

import {
  getAdministrators,
  getAdministrator,
  addNewAdministrator,
  updateAdministrator,
  deleteAdministrator,
  administratorLogin,
  emailAvailable,
  isSuperAdministrator
} from '../controllers/controllerAdministrator';

import auth from '../controllers/checkAuth';

const routeAdministrator = (app) => {
  app.route('/administrator')
  /**
   * @api {get} /administrator/ Get all administrators
   * @apiName getAdministrators
   * @apiError 400 Unable to access the server
   * @apiGroup Administrator
   *
   * @apiSuccess (200) {String} firstname Firstname of the administrator.
   * @apiSuccess (200) {String} name Lastname of the administrator.
   * @apiSuccess (200) {Number} phone Phone number of the administrator.
   * @apiSuccess (200) {Number} type Account type of the administrator.
   * @apiSuccess (200) {String} lang Language of the administrator.
   * @apiSuccess (200) {Boolean} isVerified If the administrator's account is verified by email.
   * @apiSuccess (200) {String} email Email of the administrator.
   * @apiSuccess (200) {Date} created_at Creation date.
   * @apiSuccess (200) {Date} updated_at Update date.
   * @apiSuccess (200) {ObjectId} _id Unique id.
   */
    .get(auth.required, auth.admin, getAdministrators)
  /**
   * @api {post} /administrator/ Add new administrator
   * @apiName addNewAdministrator
   * @apiError 400 Invalid parameters
   * @apiGroup Administrator
   *
   * @apiParam {String} firstname Firstname of the administrator.
   * @apiParam {String} name Lastname of the administrator.
   * @apiParam {Number} phone Phone number of the administrator.
   * @apiParam {String} lang Language of the administrator.
   * @apiParam {String} email Email of the administrator.
   *
   * @apiSuccess (201) {ObjectId} _id Unique administrator id.
   * @apiSuccess (201) {String} email Email of the administrator.
   * @apiSuccess (201) {String} token JWT token generated.
   */
    .post(addNewAdministrator);
  app.route('/administrator/login')
  /**
   * @api {post} /administrator/login/ Login as a administrator
   * @apiName login
   * @apiError 400 Server error
   * @apiGroup Auth
   *
   * @apiParam {String} email Email of the administrator in the body
   * @apiParam {String} password Password of the administrator in the body
   * @apiParam {Boolean} rememberMe Boolean if token expires or not.
   *
   * @apiSuccess (200) {ObjectId} _id Unique administrator id.
   * @apiSuccess (200) {String} email Email of the administrator.
   * @apiSuccess (200) {Boolean} finish Boolean if the administrator finished his test or not
   * @apiSuccess (200) {ObjectId} testId ONLY IF FINISH IS FALSE, id of the test
   * @apiSuccess (200) {String} token JWT token generated.
   * @apiSuccess (200) {String} redirect Redirection to Test or Dashboard.k
   */
    .post(administratorLogin);
  app.route('/administrator/email')
  /**
   * @api {get} /administrator/email/ Check if a email adress is available
   * @apiName emailAvailable
   * @apiError 409 Email already used
   * @apiGroup Administrator
   *
   * @apiParam {String} email Email of the upcoming administrator in the body
   *
   * @apiSuccess (200) {String} message Email is available
   */
    .post(emailAvailable);
  app.route('/administrator/:id')
  /**
   * @api {get} /administrator/:id Request a administrator with id
   * @apiName getAdministrator
   * @apiError 404 Administrator not found
   * @apiGroup Administrator
   *
   * @apiParam {String} id Administrators unique ID.
   *
   * @apiSuccess (200) {String} firstname Firstname of the administrator.
   * @apiSuccess (200) {String} name Lastname of the administrator.
   * @apiSuccess (200) {Number} phone Phone number of the administrator.
   * @apiSuccess (200) {Number} type Account type of the administrator.
   * @apiSuccess (200) {String} lang Language of the administrator.
   * @apiSuccess (200) {ObjectId} company Company of the administrator.
   * @apiSuccess (200) {Boolean} isVerified If the administrator's account is verified by email.
   * @apiSuccess (200) {String} email Email of the administrator.
   * @apiSuccess (200) {Date} created_at Creation date.
   * @apiSuccess (200) {Date} updated_at Update date.
   * @apiSuccess (200) {ObjectId} _id Unique id.
   */
    .get(auth.required, getAdministrator)
  /**
   * @api {put} /administrator/:id Update a administrator with id
   * @apiName updateAdministrator
   * @apiError 400 Administrator not found
   * @apiGroup Administrator
   *
   * @apiParam {String} firstname Firstname of the administrator.
   * @apiParam {String} name Lastnam  e of the administrator.
   * @apiParam {Number} phone Phone number of the administrator.
   * @apiParam {String} lang Language of the administrator.
   * @apiParam {String} email Email of the administrator.
   * @apiParam {ObjectId} company Company of the administrator.
   *
   * @apiSuccess (200) {String} firstname Firstname of the administrator.
   * @apiSuccess (200) {String} name Lastname of the administrator.
   * @apiSuccess (200) {Number} phone Phone number of the administrator.
   * @apiSuccess (200) {ObjectId} company Company of the administrator.
   * @apiSuccess (200) {Number} type Account type of the administrator.
   * @apiSuccess (200) {String} lang Language of the administrator.
   * @apiSuccess (200) {Boolean} isVerified If the administrator's account is verified by email.
   * @apiSuccess (200) {String} email Email of the administrator.
   * @apiSuccess (200) {Date} created_at Creation date.
   * @apiSuccess (200) {Date} updated_at Update date.
   * @apiSuccess (200) {ObjectId} _id Unique id.
   */
    .put(auth.required, auth.admin, updateAdministrator)
  /**
   * @api {delete} /administrator/:id Delete a administrator.
   * @apiName deleteCompany
   * @apiError 404 Bad request
   * @apiGroup Administrator
   *
   * @apiParam {String} id Administrator unique ID.
   *
   * @apiSuccess (200) {Number} n number of administrator deleted.
   * @apiSuccess (200) {Number} ok Delete is ok.
   */

    .delete(auth.required, deleteAdministrator);
  app.route('/administrator/check/superadmin')
    .get(auth.required, auth.superAdmin, isSuperAdministrator);
};

export default routeAdministrator;
