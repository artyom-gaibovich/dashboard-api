import {LoggerService} from "../logger/logger.service";
import {IRoute, Router, Response} from "express";
import {RouteInterface} from "./route.interface";

export abstract class BaseController {
    private readonly _router: Router;
    constructor(private logger : LoggerService) {
        this._router = Router();
    }

    get router() {
        return this._router
    }

    public send<T>(res : Response, code : number,  message : T) {
        res.status(code)
        return res.type('application/json').json(message)
    }

    public ok<T>(res : Response, message : T) {
        this.send<T>(res, 200, message)
    }


    public created(res : Response) {
        return res.sendStatus(201)
    }

    protected bindRoutes(routes : RouteInterface[]) {
        for(const route of routes) {
            this.logger.log(`[${route.method}] ${route.path}`)
            const handler = route.func.bind(this)
            this.router[route.method](route.path, handler)
        }
    }
}