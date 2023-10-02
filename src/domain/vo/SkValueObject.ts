import ValueObject from "./ValueObject";

export default class SkValueObject extends ValueObject<string> {

  public constructor(
    public readonly kind: string,
    public readonly date: string,
    public readonly regularParams?: any[],
    public readonly normalizeParams?: any[],
  ) {
    super(
      `${kind}#${date}#${regularParams && regularParams.length ? (regularParams.join("#") + "#") : ""}${normalizeParams?.map((param: string) => ValueObject.normalizeString(param)).join("#")}#`
    );
  }
}
