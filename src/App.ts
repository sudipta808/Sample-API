import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';

import Login from './login/login';
import { CustomRouter } from './routingManager/token/token-router';

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public express: express.Application;
  private loginService: Login;

  //Run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    this.middleware();
    this.routes();

    this.loginService = new Login();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  // Configure API endpoints.
  private routes(): void {
    /* This is just to get up and running, and to make sure what we've got is
     * working so far. This function will change when we start to add more
     * API endpoints */
    let router = express.Router();
    this.express.use('/api', router);

    router.use((req, res, next) => {
      // Website you wish to allow to connect
      res.setHeader('Access-Control-Allow-Origin', '*');
  
      // Request methods you wish to allow
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
      // Request headers you wish to allow
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  
      // Set to true if you need the website to include cookies in the requests sent
      // to the API (e.g. in case you use sessions)
      res.setHeader('Access-Control-Allow-Credentials', '1');
      next(); // make sure we go to the next routes and don't stop here
    });

    const customRouter: CustomRouter = new CustomRouter(router);
    customRouter.manageRoute();


    router.get('/', (req, res) => {
      res.json({ message: 'hooray! welcome to Sudipta!', connected: true });
    });

    router.post('/login', (req, res, next) => {
      res.json({
        token: this.loginService.checkLogin(req.body.username, req.body.password)
      });
    });
    
    this.express.use((req, res) => {
      res.status(404).send("Not Found");
    });
  }

}

export default new App().express;