import {BaseController} from "../common/base.controller";
import {LoggerService} from "../logger/logger.service";
import {NextFunction, Request, Response} from "express";
import {HTTPError} from "../error/http.error";

export class UserController extends BaseController {
    constructor(logger : LoggerService) {
        super(logger);
        this.bindRoutes([
            {path : '/login', func : this.login, method : "post"},
            {path : '/register', func : this.register, method : "post"},
        ])
    }
    login(req : Request, res : Response, next : NextFunction) {
        console.log('ошибка')
        next(new HTTPError(401, "Authorization error", 'login'))
        //this.ok(res, 'login')
    }
    register(res : Request, req : Response, next : NextFunction) {
        //this.ok(req, 'register')
    }
}