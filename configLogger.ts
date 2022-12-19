import log4js, { configure } from "log4js";

configure({
    appenders: {
        app: { type: "file", filename: "app.log" },
        out: { type: "stdout" },
    },
    categories: {
        default: {
            appenders: ["app", "out"],
            level: "error",
        },
    },
});

export const logger = log4js.getLogger();
