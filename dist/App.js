"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const login_1 = require("./login/login");
const token_router_1 = require("./routingManager/token/token-router");
// Creates and configures an ExpressJS web server.
class App {
    //Run configuration methods on the Express instance.
    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
        this.loginService = new login_1.default();
    }
    // Configure Express middleware.
    middleware() {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }
    // Configure API endpoints.
    routes() {
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
        const customRouter = new token_router_1.CustomRouter(router);
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
exports.default = new App().express;
