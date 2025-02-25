import { LoggerFactory } from "@gavdi/caplog";
import ExternalService from "./ExternalService";
import { Constructible } from "./ExternalServiceFactory.types";

/**
 * External Service Factory.
 * To be used for user authenticated service connections.
 */
export default class ExternalServiceFactory {
  private static _logger = LoggerFactory.createLogger("service-factory");

  /**
   * Creates an instance of the desired service for user authenticated usage.
   * @returns User authenticated service instance
   */
  public static async createInstance<T extends ExternalService>(
    c: new () => T,
  ): Promise<T> {
    this._logger.trace(`Creating new service instance`);

    const srv = this.create(c);
    this._logger.trace(
      `Created new service class instance for ${srv.GetServiceName()}`,
    );

    this._logger.trace(
      `Establishing initial contact for service ${srv.GetServiceName()}`,
    );
    await srv.Connect();

    this._logger.trace(
      `Connection established for service ${srv.GetServiceName()}`,
    );
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
