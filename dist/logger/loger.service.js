"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerService = void 0;
const tslog_1 = require("tslog");
class LoggerService {
    constructor() {
        this.loger = new tslog_1.Logger({
            displayInstanceName: false,
            displayLoggerName: false,
            displayFilePath: 'hidden',
            dateTimeTimezone: 'Europe/Kiev',
            dateTimePattern: 'day-month-year hour:minute:second.millisecond',
        });
    }
    log(...args) {
        this.loger.info(...args);
    }
    error(...args) {
        this.loger.error(...args);
    }
    warn(...args) {
        this.loger.warn(...args);
    }
}
exports.LoggerService = LoggerService;
