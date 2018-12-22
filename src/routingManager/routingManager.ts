import { Router } from "express";

export abstract class RoutingManager {
    router: Router;

    constructor(router: Router) {
        this.router = router;
    }

    abstract manageRoute(): void;
}