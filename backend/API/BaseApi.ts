import { Router } from "express";

export interface BaseApi {
    router: Router;
    initRoutes(): void
}