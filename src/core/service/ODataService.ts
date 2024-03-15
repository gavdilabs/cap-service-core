import { Request } from "@sap/cds";
import ExternalService from "./ExternalService";

/**
 * Abstraction of ExternalService with OData CRUD operations
 */
export default abstract class ODataService extends ExternalService {

    /**
     * Runs the query associated with the incoming request object
     * @param {Request} req
     * @returns {T} Given type
     */
    public async PerformRequest<T>(req: Request): Promise<T> {
        this.logger.trace("Performing request: ", req.query);

        if (!this.serviceConnection) {
            this.logger.error("Service connection not established", this.serviceName);
            throw new Error(`Service connection for service ${this.serviceName} has not been established`);
        }

        try {
            this.logger.trace(`Performing request against OData service: ${req.id}`, req);
            const res = await this.serviceConnection.transaction(req).run(req.query);

            this.logger.trace(`OData request was successful: ${req.id}`, req);
            return res;
        } catch (e) {
            this.logger.error(`Failed to perform request ${req.id}`, e);
            throw e;
        }
    }

    /**
     * Run a query against the OData service
     * @param query Query statement
     * @param req Request object received during API call
     * @returns Response from remote service
     */
    public async RunQuery<T>(
        query: SELECT<T> | INSERT<T> | CREATE<T> | UPDATE<T> | DELETE<T> | UPSERT<T>,
        req: Request
    ): Promise<T> {
        this.logger.trace(
            `Performing custom query on OData service: ${this.serviceName}`,
            query
        );

        if (!this.serviceConnection) {
            this.logger.error("Service connection not established", this.serviceName);
            throw new Error(`Service connection for service ${this.serviceName} has not been established`);
        }

        try {
            this.logger.trace(`Performing custom query against service`, query);
            const res = await this.serviceConnection.transaction(req).send({
                query: query,
            });

            this.logger.trace("Custom query against service was successful", query);
            return res;
        } catch (e) {
            this.logger.error("Custom query against service failed with error", query, e);
            throw e;
        }
    }

}
