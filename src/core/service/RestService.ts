import { Request } from "@sap/cds";
import ExternalService from "./ExternalService";

/**
 * Abstraction of ExternalService with REST utitlies
 */
export default abstract class RestService extends ExternalService {
  /**
   * Sends the given query to the target URI.
   * @param {string} uri
   * @param {Request} req
   * @returns {T}
   */
  public async Send<T>(
    uri: string,
    method: string,
    req: Request,
    data?: object,
    accept: string = "application/json",
    addtionalHeaders?: Record<string, string | number>,
  ): Promise<T> {
    this.logger.trace(`Preparing REST request ${method} ${uri}`);

    if (!this.serviceConnection) {
      this.logger.error("Service connection not established", this.serviceName);
      throw new Error(
        `Service connection for service ${this.serviceName} has not been established`,
      );
    }

    try {
      this.logger.trace(`Performing REST request ${method} ${uri}`);
      const res = await this.serviceConnection.tx(req).send(method, uri, data, {
        Accept: accept,
        ...addtionalHeaders,
      });

      this.logger.trace(`REST request was successful: ${method} ${uri}`);
      return res;
    } catch (e) {
      this.logger.error(`Failed to perform ${method} on ${uri}`, e);
      throw e;
    }
  }
}
