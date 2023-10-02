export default class ValidationException extends Error {
  constructor(message: string = "Invalid parameters") {
    super(message);
    this.name = "ValidationException";
  }
}
