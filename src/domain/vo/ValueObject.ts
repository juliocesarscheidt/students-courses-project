export default abstract class ValueObject<T> {

  private value: T;

  public constructor(value: T) {
    this.value = value;
  }

  public getValue(): T {
    return this.value;
  }

  public static normalizeString(str: string): string {
    return str.trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/gi, '')
      .toLowerCase();
  }
}
