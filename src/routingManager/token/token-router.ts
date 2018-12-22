import { RoutingManager } from '../routingManager';

export class CustomRouter extends RoutingManager {
    
    manageRoute(): void {
        this.router.post('/token', (req, res) => {
            const requestBodyParams = {
                appId: req.body.applicationId,
                deviceType: req.body.deviceType,
                userName: req.body.userName
            };
            res.json({requestBodyParams});
        })
    }

}