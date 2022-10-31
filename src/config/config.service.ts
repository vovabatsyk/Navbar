import { IConfigService } from './config.service.interface';
import { config, DotenvConfigOutput, DotenvParseOutput } from 'dotenv';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';

@injectable()
export class ConfigService implements IConfigService {
	private config!: DotenvParseOutput;
	constructor(@inject(TYPES.ILoger) private logger: ILogger) {
		const result: DotenvConfigOutput = config();
		if (result.error) {
			this.logger.error('Can not read file .env or his do not exist!');
		} else {
			this.logger.log('[Config Service] Configuration .env loaded');
			this.config = result.parsed as DotenvParseOutput;
		}
	}
	get<T extends string | number>(key: string): T {
		return this.config[key] as T;
	}
}
