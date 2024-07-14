import { App } from './app';
import { LoggerService } from './logger/logger.service';
import { UserController } from './user/user.controller';
import { ExceptionFilter } from './error/exception.filter';
import { Container, ContainerModule, interfaces } from 'inversify';
import { LoggerInterface } from './logger/logger.interface';
import { TYPES } from './types';

export const appBinding = new ContainerModule((bind: interfaces.Bind) => {
	bind<LoggerInterface>(TYPES.LoggerInterface).to(LoggerService);
	bind<ExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter);
	bind<UserController>(TYPES.UserController).to(UserController);
	bind<App>(TYPES.Application).to(App);
});

export interface BoostrapReturnInterface {
	appContainer: Container;
	app: App;
}
function boostrap(): BoostrapReturnInterface {
	const appContainer = new Container();
	appContainer.load(appBinding);
	const app = appContainer.get<App>(TYPES.Application);
	app.init();
	return { appContainer, app };
}

export const { app, appContainer } = boostrap();
