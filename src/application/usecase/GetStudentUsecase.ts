import NotFoundException from "../../domain/exception/NotFoundException";
import StudentRepository from "../../domain/repository/StudentRepository";
import GetStudentInputDto from "../dto/student/GetStudentInputDto";
import GetStudentOutputDto from "../dto/student/GetStudentOutputDto";
import Usecase from "./Usecase";

export default class GetStudentUsecase implements Usecase<GetStudentInputDto, GetStudentOutputDto> {

  constructor(public readonly studentRepository: StudentRepository) {
  }

  async Execute(input: GetStudentInputDto): Promise<GetStudentOutputDto> {
    const result = await this.studentRepository.getStudent(
      input.studentPk,
    );
    if (!result) throw new NotFoundException("Student not found");
    return new GetStudentOutputDto(
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
