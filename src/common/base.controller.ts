import {Response, Router} from "express";
import {RouteInterface} from "./route.interface";
import {LoggerInterface} from "../logger/logger.interface";
import {inject, injectable} from "inversify";
import {TYPES} from "../types";
import 'reflect-metadata'

@injectable()
export abstract class BaseController {
    private readonly _router: Router;
    constructor(@inject(TYPES.LoggerInterface) private logger : LoggerInterface) {
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