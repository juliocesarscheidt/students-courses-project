import Student from "../../../domain/entity/Student";
import StudentRepository from "../../../domain/repository/StudentRepository";
import CreateStudentInputDto from "../../dto/student/CreateStudentInputDto";
import CreateStudentOutputDto from "../../dto/student/CreateStudentOutputDto";
import Usecase from "../Usecase";

export default class CreateStudentUsecase implements Usecase<CreateStudentInputDto, CreateStudentOutputDto> {

  constructor(public readonly studentRepository: StudentRepository) {}

  async Execute(input: CreateStudentInputDto): Promise<CreateStudentOutputDto> {
    const student = Student.newStudent(input.name, input.surname, input.email);
    await this.studentRepository.createStudent(student);
    return new CreateStudentOutputDto(
      student.pk,
      student.sk,
      student.id,
      student.name,
      student.surname,
      student.email,
      student.creationDate,
    );
  }
}
