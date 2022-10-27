import { Router, Response } from 'express'
import { IControllerRoute } from './route.interface'
import { ILogger } from '../logger/logger.interface'
import { injectable } from 'inversify'
import 'reflect-metadata'

@injectable()
export abstract class BaseController {
	private readonly _router: Router

	constructor(private loger: ILogger) {
		this._router = Router()
	}

	get router() {
		return this._router
	}

	public created(res: Response) {
		return res.status(201)
	}

	public ok<T>(res: Response, message: T) {
		return this.send(res, 200, message)
	}

	private send<T>(res: Response, code: number, message: T) {
		res.type('application/json')
		return res.status(code).json(message)
	}

	protected bindRoutes(routes: IControllerRoute[]) {
		for (const route of routes) {
			this.loger.log(`[${route.method}] ${route.path}`)
			const handler = route.func.bind(this)
			this.router[route.method](route.path, handler)
		}
	}
}
