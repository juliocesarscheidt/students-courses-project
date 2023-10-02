export default class StudentAlreadyExistsException extends Error {
  constructor() {
    super("Student already exists");
    this.name = "StudentAlreadyExistsException";
  }
}
