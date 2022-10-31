import { PrismaClient } from '@prisma/client';
import { injectable, inject } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';

@injectable()
export class PrismaService {
	client: PrismaClient;

	constructor(@inject(TYPES.ILogger) private logger: ILogger) {
		this.client = new PrismaClient();
	}

	async connect(): Promise<void> {
		try {
			await this.client.$connect();
			this.logger.log("[Prisma Service] Успішно з'єднано з базою даних");
		} catch (error) {
			if (error instanceof Error) {
				this.logger.error("[Prisma Service] Помилка з'єднання з базою даних. " + error.message);
			}
		}
	}

	async disconnect(): Promise<void> {
		await this.client.$disconnect();
	}
}
