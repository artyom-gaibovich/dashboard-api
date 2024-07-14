import express, { Express, json } from 'express';
import { Server } from 'node:http';
import { UserController } from './user/user.controller';
import { ExceptionFilter } from './error/exception.filter';
import { LoggerInterface } from './logger/logger.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from './types';
import 'reflect-metadata';

@injectable()
export class App {
	app: Express;
	port: number;
	server: Server;
	constructor(
		@inject(TYPES.LoggerInterface) private logger: LoggerInterface,
		@inject(TYPES.UserController) private usersController: UserController,
		@inject(TYPES.ExceptionFilter) private readonly exceptionFilter: ExceptionFilter,
	) {
		this.app = express();
		this.port = 8000;
		this.logger = logger;
		this.usersController = usersController;
		this.exceptionFilter = exceptionFilter;
	}

	useRoutes(): void {
		this.app.use('/users', this.usersController.router);
	}
	useMiddleware(): void {
		this.app.use(json());
	}
	useExceptionFilters(): void {
		this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
	}
	public async init(): Promise<void> {
		this.useMiddleware();
		this.useRoutes();
		this.useExceptionFilters();
		this.server = this.app.listen(this.port);
		this.logger.log(`Server started on http://localhost:${this.port}`);
	}
}
