import Student from "../../../domain/entity/Student";
import StudentRepository from "../../../domain/repository/StudentRepository";
import StudentAlreadyExistsException from "../../../domain/exception/StudentAlreadyExistsException";
import NotFoundException from "../../../domain/exception/NotFoundException";

export default class StudentRepositoryMemory implements StudentRepository {

  private studentsByPk: Map<string, Student> = new Map();

  constructor() {}

  async persistStudent(student: Student): Promise<void> {
    if (this.studentsByPk.get(student.pk)) {
      throw new StudentAlreadyExistsException();
    }
    this.studentsByPk.set(student.pk, student);
  }

  async fetchStudent(studentPk: string): Promise<Student> {
    const student = this.studentsByPk.get(studentPk);
    if (!student) {
      throw new NotFoundException("Student not found");
    }
    return Student.mapFrom(student);
  }
}
