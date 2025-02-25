# @gavdi/cap-service-core - CAP Core Library

Core library for CAP NodeJS applications

## What's in the box?

With `@gavdi/cap-service-core` you'll get everything you need to develop a solid service layer for your solutions.

The core layer comes with the abstractions for service connections and database queries,
giving you the option to focus on what is important for your project instead.

> **NOTE:** Changes with version 2.0!
> Since we're moving towards CDS 8 (and above), we're no longer supporting 'cds-routing-handlers' as this package is deprecated.
> We're currently in the process of moving our core layer to be working with dxfrontier's [cds-ts-dispatcher](https://www.npmjs.com/package/@dxfrontier/cds-ts-dispatcher).


### Features

- External service abstractions

## How To Install

The core layer is super simple to include in your projects, just run the install command:

```shell
npm i --save @gavdi/cap-service-core
```

And you're now free to make use of all the library at your leisure.
However, to get the most out of the library, it is recommended to bootstrap your service with the core.
To see how to do that, see the [configuration section](##configuration).

## Configuration

> More info on how to configure this with 'cds-ts-dispatcher' will be coming soon.

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
