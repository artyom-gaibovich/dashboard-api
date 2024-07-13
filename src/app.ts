import express, {Express} from "express";
import {Server} from "node:http"
import {LoggerService} from "./logger/logger.service";
import {UserController} from "./user/user.controller";
export class App {
    app : Express
    port: number
    server : Server;
    logger: LoggerService;
    usersController : UserController;
    constructor(logger : LoggerService,  usersController : UserController) {
        this.app = express()
        this.port = 8000
        this.logger = logger
        this.usersController = usersController
    }

    useRoutes() {
        this.app.use('/user', this.usersController.router)
    }
    public async init() {
        this.useRoutes()
        this.server = this.app.listen(this.port)
        this.logger.log(`Сервер запущен на http://localhost:${this.port}`)
    }
}