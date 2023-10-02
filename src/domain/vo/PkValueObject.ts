import ValueObject from "./ValueObject";

export default class PkValueObject extends ValueObject<string> {

  public constructor(value: string) {
    super(ValueObject.normalizeString(value));
  }
}
