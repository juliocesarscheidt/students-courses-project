export default class CourseAlreadyExistsException extends Error {
  constructor() {
    super("Course already exists");
    this.name = "CourseAlreadyExistsException";
  }
}
