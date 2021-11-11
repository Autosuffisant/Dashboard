/* eslint-disable max-len */

import {
  getUsers,
  getUser,
  addNewUser,
  updateUser,
  deleteUser,
  userLogin,
  emailAvailable,
  userSearch,
  userListSearch
} from '../controllers/controllerUser';

import auth from '../controllers/checkAuth';

const routeUser = (app) => {
  app.route('/user')
    /**
     * @api {get} /user/ Get all users
     * @apiName getUsers
     * @apiError 400 Unable to access the server
     * @apiGroup User
     *
     * @apiSuccess (200) {String} firstname Firstname of the user.
     * @apiSuccess (200) {String} name Lastname of the user.
     * @apiSuccess (200) {Number} phone Phone number of the user.
     * @apiSuccess (200) {Number} type Account type of the user.
     * @apiSuccess (200) {String} lang Language of the user.
     * @apiSuccess (200) {Boolean} isVerified If the user's account is verified by email.
     * @apiSuccess (200) {String} email Email of the user.
     * @apiSuccess (200) {Date} created_at Creation date.
     * @apiSuccess (200) {Date} updated_at Update date.
     * @apiSuccess (200) {ObjectId} _id Unique id.
     */
    .get(auth.required, auth.admin, getUsers)
    /**
     * @api {post} /user/ Add new user
     * @apiName addNewUser
     * @apiError 400 Server error
     * @apiGroup User
     *
     * @apiParam {String} firstname Firstname of the user.
     * @apiParam {String} name Lastname of the user.
     * @apiParam {Number} phone Phone number of the user.
     * @apiParam {String} lang Language of the user.
     * @apiParam {String} email Email of the user.
     *
     * @apiSuccess (201) {ObjectId} _id Unique user id.
     * @apiSuccess (201) {String} email Email of the user.
     * @apiSuccess (201) {String} token JWT token generated.
     */
    .post(addNewUser);
  app.route('/user/login')
    /**
     * @api {post} /user/login/ Login as a user
     * @apiName login
     * @apiError 400 Server error
     * @apiGroup Auth
     *
     * @apiParam {String} email Email of the user in the body
     * @apiParam {String} password Password of the user in the body
     * @apiParam {Boolean} rememberMe Boolean if token expires or not.
     *
     * @apiSuccess (200) {ObjectId} _id Unique user id.
     * @apiSuccess (200) {String} email Email of the user.
     * @apiSuccess (200) {Boolean} finish Boolean if the user finished his test or not
     * @apiSuccess (200) {ObjectId} testId ONLY IF FINISH IS FALSE, id of the test
     * @apiSuccess (200) {String} token JWT token generated.
     * @apiSuccess (200) {String} redirect Redirection to Test or Dashboard.k
     */
    .post(userLogin);
  app.route('/user/email')
    /**
     * @api {get} /user/email/ Check if a email adress is available
     * @apiName emailAvailable
     * @apiError 409 Email already used
     * @apiGroup User
     *
     * @apiParam {String} email Email of the upcoming user in the body
     *
     * @apiSuccess (200) {String} message Email is available
     */
    .post(emailAvailable);
  app.route('/user/search/:s/')
    /**
     * @api {get} /user/:id Request a user with id
     * @apiName getUser
     * @apiError 404 User not found
     * @apiGroup User
     *
     * @apiParam {String} id Users unique ID.
     *
     * @apiSuccess (200) {String} firstname Firstname of the user.
     * @apiSuccess (200) {String} name Lastname of the user.
     * @apiSuccess (200) {Number} phone Phone number of the user.
     * @apiSuccess (200) {Number} type Account type of the user.
     * @apiSuccess (200) {String} lang Language of the user.
     * @apiSuccess (200) {ObjectId} company Company of the user.
     * @apiSuccess (200) {Boolean} isVerified If the user's account is verified by email.
     * @apiSuccess (200) {String} email Email of the user.
     * @apiSuccess (200) {Date} created_at Creation date.
     * @apiSuccess (200) {Date} updated_at Update date.
     * @apiSuccess (200) {ObjectId} _id Unique id.
     */
    .get(auth.required, auth.admin, userSearch);
  app.route('/user/search/:s/:sc/')
    /**
     * @api {get} /user/:id Request a user with id
     * @apiName getUser
     * @apiError 404 User not found
     * @apiGroup User
     *
     * @apiParam {String} id Users unique ID.
     *
     * @apiSuccess (200) {String} firstname Firstname of the user.
     * @apiSuccess (200) {String} name Lastname of the user.
     * @apiSuccess (200) {Number} phone Phone number of the user.
     * @apiSuccess (200) {Number} type Account type of the user.
     * @apiSuccess (200) {String} lang Language of the user.
     * @apiSuccess (200) {ObjectId} company Company of the user.
     * @apiSuccess (200) {Boolean} isVerified If the user's account is verified by email.
     * @apiSuccess (200) {String} email Email of the user.
     * @apiSuccess (200) {Date} created_at Creation date.
     * @apiSuccess (200) {Date} updated_at Update date.
     * @apiSuccess (200) {ObjectId} _id Unique id.
     */
    .get(auth.required, auth.admin, userListSearch);
  app.route('/user/:id')
    /**
     * @api {get} /user/:id Request a user with id
     * @apiName getUser
     * @apiError 404 User not found
     * @apiGroup User
     *
     * @apiParam {String} id Users unique ID.
     *
     * @apiSuccess (200) {String} firstname Firstname of the user.
     * @apiSuccess (200) {String} name Lastname of the user.
     * @apiSuccess (200) {Number} phone Phone number of the user.
     * @apiSuccess (200) {Number} type Account type of the user.
     * @apiSuccess (200) {String} lang Language of the user.
     * @apiSuccess (200) {ObjectId} company Company of the user.
     * @apiSuccess (200) {Boolean} isVerified If the user's account is verified by email.
     * @apiSuccess (200) {String} email Email of the user.
     * @apiSuccess (200) {Date} created_at Creation date.
     * @apiSuccess (200) {Date} updated_at Update date.
     * @apiSuccess (200) {ObjectId} _id Unique id.
     */
    .get(auth.required, getUser)
    /**
     * @api {put} /user/:id Update a user with id
     * @apiName updateUser
     * @apiError 400 User not found
     * @apiGroup User
     *
     * @apiParam {String} firstname Firstname of the user.
     * @apiParam {String} name Lastnam  e of the user.
     * @apiParam {Number} phone Phone number of the user.
     * @apiParam {String} lang Language of the user.
     * @apiParam {String} email Email of the user.
     * @apiParam {ObjectId} company Company of the user.
     *
     * @apiSuccess (200) {String} firstname Firstname of the user.
     * @apiSuccess (200) {String} name Lastname of the user.
     * @apiSuccess (200) {Number} phone Phone number of the user.
     * @apiSuccess (200) {ObjectId} company Company of the user.
     * @apiSuccess (200) {Number} type Account type of the user.
     * @apiSuccess (200) {String} lang Language of the user.
     * @apiSuccess (200) {Boolean} isVerified If the user's account is verified by email.
     * @apiSuccess (200) {String} email Email of the user.
     * @apiSuccess (200) {Date} created_at Creation date.
     * @apiSuccess (200) {Date} updated_at Update date.
     * @apiSuccess (200) {ObjectId} _id Unique id.
     */
    .put(auth.required, auth.admin, updateUser)
    /**
     * @api {delete} /user/:id Delete a user.
     * @apiName deleteCompany
     * @apiError 404 Bad request
     * @apiGroup User
     *
     * @apiParam {String} id User unique ID.
     *
     * @apiSuccess (200) {Number} n number of user deleted.
     * @apiSuccess (200) {Number} ok Delete is ok.
     */

    .delete(auth.required, deleteUser);
};

export default routeUser;
