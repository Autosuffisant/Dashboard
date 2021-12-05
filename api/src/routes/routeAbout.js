import getAbout from '../controllers/controllerAbout';

const routeAbout = (app) => {
  app.route('/about.json')
  /**
   * @api {get} /about.json/ Get the client and widgets informations.
   * @apiName About
   * @apiError 400 Unable to access the server
   * @apiGroup About
   *
   * @apiSuccess (200) {Object} Client: Client's IP
   * @apiSuccess (200) {Object} Server: All the widgets and their characteristics
   */
    .get(getAbout);
};

export default routeAbout;
