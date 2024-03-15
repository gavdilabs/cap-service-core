import { Request } from "@sap/cds";
import { ICdsMiddleware, Middleware, Next, Req } from "cds-routing-handlers";
import { Service } from "typedi";
import { LoggerFactory } from "@gavdi/caplog";

@Middleware({ global: true, priority: 1 })
@Service()
export class LoggingMiddleware implements ICdsMiddleware {

    private _logger = LoggerFactory.createLogger("middleware");

    public async use(
        @Req() req: Request,
        // @Next() next: Function
    ): Promise<void> {
        this._logger.trace(`Request received, targeting event: ${req}`);

        // this._logger.debug("Next is: ", next);
        // if (next && typeof next === "function") {
        //     next();
        //     this._logger.trace(`Request handled for event: ${req}`);
        // }
    }
}
