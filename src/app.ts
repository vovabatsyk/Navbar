import express, { Express } from 'express'
import { Server } from 'http'
import { ILogger } from './logger/logger.interface'
import { injectable, inject } from 'inversify'
import { TYPES } from './types'
import { IExceptionFilter } from './errors/exception.filter.interface'
import 'reflect-metadata'
import { IUserController } from './user/user.controller.interface'
import { UserController } from './user/users.controller'

@injectable()
export class App {
	app: Express
	server: Server | undefined
	port: number

	constructor(
		@inject(TYPES.ILoger) private logger: ILogger,
		@inject(TYPES.IUserController) private userController: UserController,
		@inject(TYPES.IExceptionFilter) private exceptionFilter: IExceptionFilter
	) {
		this.app = express()
		this.port = 8000
	}

	useRoutes() {
		this.app.use('/users', this.userController.router)
	}

	useExceptionFilters() {
		this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter))
	}

	public async init() {
		this.useRoutes()
		this.useExceptionFilters()
		this.server = this.app.listen(this.port)
		this.logger.log(`Server started on Port: ${this.port}`)
	}
}
