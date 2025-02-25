import { Request } from "@sap/cds";
import ExternalService from "./ExternalService";

export default abstract class DBService extends ExternalService {
  constructor(name: string) {
    super(name);
  }

  public async RunQuery<T>(req: Request): Promise<T> {
    this.logger.debug(`Performing database query: `, req.query);
    this.logger.trace(
      `Running request against database service: ${this.serviceName}`,
      req,
    );

    if (!this.serviceConnection) {
      this.logger.trace(
        `Service connection is undefined for service: ${this.serviceName}`,
      );
      this.logger.error("Service connection not established", this.serviceName);
      throw new Error(
        `Service connection for service ${this.serviceName} has not been established`,
      );
    }

    this.logger.trace(`Performing transaction`, req);
    const res = await this.serviceConnection.tx(req).run(req.query);
    this.logger.trace(`Transaction concluded`, req);

    return res;
  }

  public async Run<T>(
    query: SELECT<T> | DELETE<T> | INSERT<T> | UPDATE<T>,
    req?: Request,
  ): Promise<T> {
    this.logger.trace(`Performing custom database query: `, query);

    if (!this.serviceConnection) {
      this.logger.trace(
        `Service connection is undefined for service: ${this.serviceName}`,
      );
      this.logger.error("Service connection not established", this.serviceName);
      throw new Error(
        `Service connection for service ${this.serviceName} has not been established`,
      );
    }

    try {
      if (req) {
        this.logger.trace(
          "Running custom query with request transaction context",
          query,
          req,
        );
        const res = await this.serviceConnection.tx(req).run(query);

        this.logger.trace(
          "Custom query with request context to database handled successfully",
          query,
          req,
        );

        return res;
      }

      this.logger.trace("Running custom query at database", query);
      const res = this.serviceConnection.run(query);

      this.logger.trace("Custom query to database handled successfully", query);
      return res;
    } catch (e) {
      this.logger.error("Custom query to database failed due to error", e);
      throw e;
    }
  }
}
