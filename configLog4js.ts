import log4js from "log4js";
const dateFormat = "%d{[dd/MM/yyyy] [hh:mm:ss]} [%p] - %m";

log4js.configure({
    appenders: {
        fullLog: {
            type: "file",
            filename: "./logs/fullLog.log",
            layout: {
                type: "pattern",
                pattern: dateFormat,
            },
        },
        errorLog: {
            type: "file",
            filename: "./logs/error.log",
            layout: {
                type: "pattern",
                pattern: dateFormat,
            },
        },
        "just-errors": { type: "logLevelFilter", appender: "errorLog", level: "error" },
        console: {
            type: "console",
            layout: { type: "basic" },
        },
        "just-errors-console": { type: "logLevelFilter", appender: "console", level: "error" },
    },
    categories: {
        default: { appenders: ["fullLog", "just-errors", "just-errors-console"], level: "debug" },
    },
});

export const logger = log4js.getLogger();
