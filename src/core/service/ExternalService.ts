import cds from "@sap/cds";
import { Service as CdsService, Service } from "@sap/cds/apis/services";
import { LoggerFactory, Logger } from "@gavdi/caplog";

/**
 * Abstract base class for remote/external service connections with CDS.
 */
export default abstract class ExternalService {
    /**
     * Service name as defined in package.json or .cdsrc.json
     */
    protected serviceName: string;

    /**
     * The established connection to the external service
     */
    protected serviceConnection: Service | undefined; //NOTE: This is set to any because SAP hasn't updated their Service entity declaration as of yet

    /**
     * Service attached logger
     */
    protected logger: Logger;

    /**
     * Default constructor
     * @param serviceName Service name as defined in package.json or .cdsrc.json
     */
    constructor(serviceName: string) {
        this.logger = LoggerFactory.createLogger(serviceName);
        this.logger.trace(
            `Created new external service class instance for service: ${serviceName}`
        );
        this.serviceName = serviceName;
    }

    /**
     * Establishes connection to external service.
     * Should be executed on server startup only.
     */
    public async Connect(): Promise<void> {
        this.logger.debug(
            `Attempting connection to external service: ${this.serviceName}`
        );
        try {
            this.logger.trace(`Establishing connection to service: ${this.serviceName}`);
            this.serviceConnection = await cds.connect.to(this.serviceName);
            this.logger.trace(`Connection established to service: ${this.serviceName}`);
        } catch (e) {
            this.logger.error(
                `Failed to connect to external service '${this.serviceName}'`,
                e
            );
            throw `Failed to initialize external service connection, aborting...`;
        }
    }

    /**
     * Retrieves the active service connection.
     * @returns Established service connection.
     */
    public GetConnection(): Service | undefined {
        this.logger.trace(`Fetching established connection for service: ${this.serviceName}`,
            this.serviceConnection);

        return this.serviceConnection;
    }

    /**
     * The service name defined by the package.json
     * @returns string
    */
    public GetServiceName(): string {
        return this.serviceName;
    }
}
