/** The base shape of the _type_ of some class, rather than the class itself */
interface Static<
  Any,
> {
  prototype: Any;
}

export type {
  Static as default,
};
