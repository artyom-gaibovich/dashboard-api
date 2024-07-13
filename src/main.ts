import {App} from "./app";
import {LoggerService} from "./logger/logger.service";


async function boostrap() {
    const app = new App(new LoggerService())
    await app.init()
}

boostrap()