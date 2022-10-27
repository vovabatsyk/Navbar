import { NextFunction, Request, Response } from 'express'
import { BaseController } from '../common/base.controller'
import { HTTPError } from '../errors/http-error.class'
import { injectable, inject } from 'inversify'
import { TYPES } from '../types'
import { ILogger } from '../logger/logger.interface'
import 'reflect-metadata'
import { IUserController } from './user.controller.interface'

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(@inject(TYPES.ILoger) private logerService: ILogger) {
		super(logerService)
		this.bindRoutes([
			{
				path: '/register',
				method: 'post',
				func: this.register,
			},
			{ path: '/login', method: 'post', func: this.login },
		])
	}

	login(req: Request, res: Response, next: NextFunction) {
		next(new HTTPError(401, 'no authorized', 'login'))
	}

	register(req: Request, res: Response, next: NextFunction) {
		this.ok(res, 'register')
	}
}
