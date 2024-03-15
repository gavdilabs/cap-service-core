import Container from "typedi";
import { ExternalService, ExternalServiceFactory } from "..";
import { Factory } from "./Container.types";

export function createServiceFactory<T extends ExternalService>(
    c: new () => T
): Factory<T> {
    const factory = async () => {
        const srv = await ExternalServiceFactory.createInstance(c);
        return srv;
    }

    return factory;
}

export function addServiceFactory<T extends ExternalService>(
    key: string,
    c: new () => T
): void {
    const factory = createServiceFactory(c);
    Container.set(key, factory);
}
