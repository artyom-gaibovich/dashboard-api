import { ILogObj, Logger } from 'tslog';
import { LoggerInterface } from './logger.interface';
import { injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
export class LoggerService implements LoggerInterface {
	public logger: Logger<ILogObj>;

	constructor() {
		this.logger = new Logger<ILogObj>(
			{},
			{
				displayInstanceName: false,
				displayLogger: false,
				displayFilePath: 'hidden',
				displayFunctionName: false,
			},
		);
	}

	log(...args: unknown[]): void {
		this.logger.info(...args);
	}
	error(...args: unknown[]): void {
		this.logger.error(...args);
	}
	warn(...args: unknown[]): void {
		this.logger.warn(...args);
	}
}
