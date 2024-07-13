import {BaseController} from "../common/base.controller";
import {LoggerService} from "../logger/logger.service";
import {NextFunction, Request, Response} from "express";
import {HTTPError} from "../error/http.error";
import {inject, injectable} from "inversify";
import {TYPES} from "../types";
import 'reflect-metadata'
import {UserControllerInterface} from "./user.controller.interface";

@injectable()
export class UserController extends BaseController implements UserControllerInterface{
    constructor(@inject(TYPES.LoggerInterface) private loggerService : LoggerService) {
        super(loggerService);
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
        this.ok(req, 'register')
    }
}