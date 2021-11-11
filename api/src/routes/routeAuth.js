import {
  refreshLogin
} from '../controllers/controllerAuth';

var mongoose = require('mongoose');

const routeAuth = (app) => {
// app.route('/auth')
//   .post(loginLocal, auth.optional);
  app.route('/refresh')
  /**
   * @api {post} /refresh/ Refresh your token
   * @apiName refresh
   * @apiError 400 Invalid parameters: unable to find a refreshToken in the body'
   * @apiError 400 Invalid parameters: unable to find a email in the body
   * @apiError 404 Unable to find an user with this email
   * @apiError 401 Email and refresh token user does not match
   * @apiGroup Auth
   *
   * @apiParam {String} email Email of the user in the body
   * @apiParam {String} refreshToken Refresh Token given at login.
   *
   * @apiSuccess (200) {ObjectId} _id Unique user id.
   * @apiSuccess (200) {String} email Email of the user.
   * @apiSuccess (200) {Boolean} finish Boolean if the user finished his test or not
   * @apiSuccess (200) {ObjectId} testId ONLY IF FINISH IS FALSE, id of the test
   * @apiSuccess (200) {String} token JWT token generated.
   * @apiSuccess (200) {String} redirect Redirection to Test or Dashboard.k
   */
    .post(refreshLogin);

  app.get('/liveness_check', (req, res) => {
    res.status(200).json({
      status: 'Healthy'
    });
  });

  app.get('/readiness_check', (req, res) => {
    if (mongoose.connection.readyState === 1) {
      res.status(200).json({
        status: 'Ready'
      });
    }
    else {
      res.status(500).json({
        status: 'Down'
      });
    }
  });
};

export default routeAuth;
