import express, { Express } from "express"
import { Server } from 'http'
import { LoggerService } from "./logger/loger.service"
export class App {

    app: Express
    server: Server | undefined
    port: number
    logger: LoggerService

    constructor(logger: LoggerService) {
        this.app = express()
        this.port = 8000
        this.logger = logger
    }

    useRoutes() {
        this.app.use('/users', () => {
            console.log('users');
        })
    }

    public async init() {
        this.useRoutes()
        this.server = this.app.listen(this.port, () => {
            this.logger.log(`Server started on Port: ${this.port}`);
        })
    }
}