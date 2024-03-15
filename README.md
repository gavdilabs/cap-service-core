# @gavdi/cap-service-core - CAP Core Library

Core library for CAP NodeJS applications

## What's in the box?

With `@gavdi/cap-service-core` you'll get everything you need to develop a solid service layer for your solutions.

The core layer comes with the abstractions for service connections and database queries,
giving you the option to focus on what is important for your project instead.

On top of this, you'll also get what you need to ensure dependency injection in your code,
without having to write too much boilerplate code everytime you start a new project.

### Features

- Dependency Injection
- External service abstractions
- Default logging middleware for service requests

## How To Install

The core layer is super simple to include in your projects, just run the install command:

```shell
npm i --save @gavdi/cap-service-core
```

And you're now free to make use of all the library at your leisure.
However, to get the most out of the library, it is recommended to bootstrap your service with the core.
To see how to do that, see the [configuration section](##configuration).

## Configuration

When bootstrapping your service in your `service.ts` file, you can include the core layer by bootstrapping using the recommended approach seen below:

```typescript
import {
  ExternalServiceFactory,
  InitDIContainer,
  LoggingMiddleware,
} from "@gavdi/cap-service-core";
import { Service } from "@sap/cds/apis/services";
import { createCombinedHandler, useContainer } from "cds-routing-handlers";
import "reflect-metadata";
import Container from "typedi";

const hdl = createCombinedHandler({
  handler: [
    // Entity Handlers
    `${__dirname}/api/handlers/**/*.js`,
    `${__dirname}/api/handlers/**/*.ts`,

    // Function/Action Import Handlers
    `${__dirname}/api/functions/**/*.js`,
    `${__dirname}/api/functions/**/*.ts`,
    `${__dirname}/api/actions/**/*.js`,
    `${__dirname}/api/actions/**/*.ts`,
  ],
  middlewares: [LoggingMiddleware],
});

export default async (srv: Service) => {
  // Configure handlers
  hdl(srv);

  // Setup the DI Container
  await InitDIContainer([
    { id: "sf", value: await ExternalServiceFactory.createInstance(SF) },
    {
      id: "sf-tech",
      value: await ExternalServiceFactory.createInstance(SFTech),
    },
  ]);

  // Needed by our handler constructor for dependency injection
  useContainer(Container);
};
```

## TODOs

- [ ] Port over batch query builder to own package and include as part of core
- [ ] Provide standard utility functions for the core
- [ ] Provide default standard types for use with standard apps
- [ ] Abstract away the cds-routing-handlers setup
- [ ] Include heavily used transaction functions as a part of library
- [ ] Provide unit testing setup for library
- [ ] Remove dependency for cds-routing-handlers and use dx-frontier's solution instead

---

(c) Copyright by Gavdi Labs 2024 - All Rights Reserved
