import StudentRepository from "../../domain/repository/StudentRepository";
import CreateStudentInputDto from "../dto/student/CreateStudentInputDto";
import CreateStudentOutputDto from "../dto/student/CreateStudentOutputDto";
import Usecase from "./Usecase";

export default class CreateStudentUsecase implements Usecase<CreateStudentInputDto, CreateStudentOutputDto> {

  constructor(public readonly studentRepository: StudentRepository) {
  }

  async Execute(input: CreateStudentInputDto): Promise<CreateStudentOutputDto> {
    const result = await this.studentRepository.createStudent(
      input.name,
      input.surname,
      input.fullName,
      input.email,
    );
    return new CreateStudentOutputDto(
      result.pk,
      result.sk,
      result.id,
      result.name,
      result.surname,
      result.fullName,
      result.email,
      result.creationDate,
    );
  }
}
