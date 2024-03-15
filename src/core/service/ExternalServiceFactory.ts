import { LoggerFactory } from "@gavdi/caplog";
import ExternalService from "./ExternalService";
import { Constructible } from "./ExternalServiceFactory.types";

const logger = LoggerFactory.createLogger("service-factory");

/**
 * External Service Factory.
 * To be used for user authenticated service connections.
 */
export default class ExternalServiceFactory {
    /**
     * Creates an instance of the desired service for user authenticated usage.
     * @returns User authenticated service instance
     */
    public static async createInstance<T extends ExternalService>(
        c: new () => T
    ): Promise<T> {
        logger.trace(`Creating new service instance`);

        const srv = this.create(c);
        logger.trace(`Created new service class instance for ${srv.GetServiceName()}`);

        logger.trace(`Establishing initial contact for service ${srv.GetServiceName()}`);
        await srv.Connect();

        logger.trace(`Connection established for service ${srv.GetServiceName()}`);
        return srv;
    }

    /**
     * Creates a instance of a service connection.
     * @param srv Typeof service instance
     * @returns Service instance
     */
    private static create<T extends Constructible>(srv: T): InstanceType<T> {
        return new srv();
    }
}
