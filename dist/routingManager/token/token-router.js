"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routingManager_1 = require("../routingManager");
class CustomRouter extends routingManager_1.RoutingManager {
    manageRoute() {
        console.log('manage routes');
        this.router.post('/token', (req, res) => {
            const requestBodyParams = {
                appId: req.body.applicationId,
                deviceType: req.body.deviceType,
                userName: req.body.userName
            };
            res.json({ requestBodyParams });
        });
    }
}
exports.CustomRouter = CustomRouter;
