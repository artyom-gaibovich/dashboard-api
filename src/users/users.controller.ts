import {BaseController} from "../common/base.controller";
import {LoggerService} from "../logger/logger.service";
import {NextFunction, Request, Response} from "express";

export class UsersController extends BaseController {
    constructor(logger : LoggerService) {
        super(logger);
        this.bindRoutes([
            {path : '/login', func : this.register, method : "post"},
            {path : '/register', func : this.register, method : "post"},
        ])
    }
    login(req : Request, res : Response, next : NextFunction) {
        this.ok(res, 'login')
    }
    register(res : Request, req : Response, next : NextFunction) {
        this.ok(req, 'register')
    }
}