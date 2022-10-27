import { App } from './app'
import { ExceptionFilter } from './errors/exception.filter'
import { LoggerService } from './logger/logger.service'
import { UserController } from './user/users.controller'
import { Container, ContainerModule, interfaces } from 'inversify'
import { ILogger } from './logger/logger.interface'
import { TYPES } from './types'
import { IExceptionFilter } from './errors/exception.filter.interface'
import { IUserController } from './user/user.controller.interface'

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.ILoger).to(LoggerService)
	bind<IExceptionFilter>(TYPES.IExceptionFilter).to(ExceptionFilter)
	bind<IUserController>(TYPES.IUserController).to(UserController)
	bind<App>(TYPES.Application).to(App)
})

function bootstrap() {
	const appContainer = new Container()
	appContainer.load(appBindings)
	const app = appContainer.get<App>(TYPES.Application)
	app.init()

	return { app, appContainer }
}

export const { app, appContainer } = bootstrap()
