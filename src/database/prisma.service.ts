import { PrismaClient, UserModel } from '@prisma/client';
import e from 'express';
import { injectable, inject } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';

@injectable()
export class PrismaService {
	client: PrismaClient;

	constructor(@inject(TYPES.ILoger) private logger: ILogger) {
		this.client = new PrismaClient();
	}

	async connect(): Promise<void> {
		try {
			await this.client.$connect();
			this.logger.log('[Prisma Service] Connect to database successfully.');
		} catch (error) {
			if (error instanceof Error) {
				this.logger.error('[Prisma Service] Error connect to database. ' + error.message);
			}
		}
	}

	async disconnect(): Promise<void> {
		await this.client.$disconnect();
	}
}
