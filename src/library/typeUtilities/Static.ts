/** The base shape of the _type_ of some class, rather than the class itself */
export default interface Static<Any> {
  prototype: Any;
}
