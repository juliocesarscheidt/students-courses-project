import Student from "../entity/Student";

export default interface StudentRepository {

  createStudent(student: Student): Promise<void>;

  getStudent(studentPk: string): Promise<Student | null>;
}
