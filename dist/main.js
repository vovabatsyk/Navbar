"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.appContainer = exports.app = exports.appBindings = void 0;
const app_1 = require("./app");
const exception_filter_1 = require("./errors/exception.filter");
const logger_service_1 = require("./logger/logger.service");
const users_controller_1 = require("./user/users.controller");
const inversify_1 = require("inversify");
const types_1 = require("./types");
const user_service_1 = require("./user/user.service");
const config_service_1 = require("./config/config.service");
const prisma_service_1 = require("./database/prisma.service");
const users_repository_1 = require("./user/users.repository");
exports.appBindings = new inversify_1.ContainerModule((bind) => {
    bind(types_1.TYPES.ILogger).to(logger_service_1.LoggerService).inSingletonScope();
    bind(types_1.TYPES.IExceptionFilter).to(exception_filter_1.ExceptionFilter).inSingletonScope();
    bind(types_1.TYPES.IUserController).to(users_controller_1.UserController).inSingletonScope();
    bind(types_1.TYPES.IUserService).to(user_service_1.UserService).inSingletonScope();
    bind(types_1.TYPES.IConfigService).to(config_service_1.ConfigService).inSingletonScope();
    bind(types_1.TYPES.PrismaService).to(prisma_service_1.PrismaService).inSingletonScope();
    bind(types_1.TYPES.IUserRepository).to(users_repository_1.UsersRepository).inSingletonScope();
    bind(types_1.TYPES.Application).to(app_1.App).inSingletonScope();
});
function bootstrap() {
    const appContainer = new inversify_1.Container();
    appContainer.load(exports.appBindings);
    const app = appContainer.get(types_1.TYPES.Application);
    app.init();
    return { app, appContainer };
}
_a = bootstrap(), exports.app = _a.app, exports.appContainer = _a.appContainer;
//# sourceMappingURL=main.js.map