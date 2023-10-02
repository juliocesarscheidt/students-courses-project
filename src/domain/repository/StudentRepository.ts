import Student from "../entity/Student";

export default interface StudentRepository {

  createStudent(
    name: string,
    surname: string,
    fullName: string,
    email: string,
  ): Promise<Student>;

  getStudent(studentPk: string): Promise<Student | null>;
}
