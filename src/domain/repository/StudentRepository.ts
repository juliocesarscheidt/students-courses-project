import Student from "../entity/Student";

export default interface StudentRepository {

  persistStudent(student: Student): Promise<void>;

  fetchStudent(studentPk: string): Promise<Student>;
}
