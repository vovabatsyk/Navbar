import { Logger } from 'tslog';
import { ILogger } from './logger.interface';
import { injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
export class LoggerService implements ILogger {
	public loger: Logger;

	constructor() {
		this.loger = new Logger({
			displayInstanceName: false,
			displayLoggerName: false,
			displayFilePath: 'hidden',
			dateTimeTimezone: 'Europe/Kiev',
			dateTimePattern: 'day-month-year hour:minute:second.millisecond',
		});
	}

	log(...args: unknown[]): void {
		this.loger.info(...args);
	}

	error(...args: unknown[]): void {
		this.loger.error(...args);
	}

	warn(...args: unknown[]): void {
		this.loger.warn(...args);
	}
}
