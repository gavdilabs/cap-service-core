import { useContainer } from "cds-routing-handlers";
import Container, { ServiceOptions } from "typedi";
import { LoggingMiddleware } from "../middleware/LoggingMiddleware";
import { LoggerFactory } from "@gavdi/caplog";

const logger = LoggerFactory.createLogger("di");

// DI Container retrieval function
export default async function InitDIContainer(
    inputServices: ServiceOptions<unknown>[]
): Promise<void> {
    logger.trace(`Initializing dependency container`);
    logger.trace(`Applying ${inputServices?.length} services`);

    // Our dependency registration(s) goes here!
    Container.set(
        inputServices.concat([
            { id: "middleware-logging", value: new LoggingMiddleware() },
        ])
    );

    logger.trace(`Container has been created`);

    // Needed by our handler constructor for dependency injection
    useContainer(Container);
    logger.trace(`Container has been established as service dependency provider`);
}
