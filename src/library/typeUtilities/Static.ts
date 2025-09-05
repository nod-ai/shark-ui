/** The base shape of the _type_ of some class, rather than the class itself */
interface Static<
  SomeObject,
> {
  prototype: SomeObject;
}

export type {
  Static,
};
