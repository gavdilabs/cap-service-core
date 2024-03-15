/**
 * Generic Constructible type for classes to be used with factory pattern
 */
export type Constructible<
  Params extends readonly any[] = any[],
  T = any
> = new (...params: Params) => T;
