import CreateStudentInputDto from "../../application/dto/student/CreateStudentInputDto";
import CreateStudentUsecase from "../../application/usecase/student/CreateStudentUsecase";
import HttpResponse from "../http/HttpResponse";
import HttpResponseBuilder from "../http/HttpResponseBuilder";
import StudentAlreadyExistsException from "../../domain/exception/StudentAlreadyExistsException";
import GetStudentUsecase from "../../application/usecase/student/GetStudentUsecase";
import GetStudentInputDto from "../../application/dto/student/GetStudentInputDto";
import NotFoundException from "../../domain/exception/NotFoundException";
import ValidationException from "../../domain/exception/ValidationException";

export default class StudentController {

  constructor(
    readonly createStudentUsecase: CreateStudentUsecase,
    readonly getStudentUsecase: GetStudentUsecase
  ) {}

  async createStudent(params: any, body: CreateStudentInputDto): Promise<HttpResponse> {
    try {
      const response = await this.createStudentUsecase
        .Execute(body);
      return new HttpResponseBuilder(201).setData(response).build();

    } catch (e: any) {
      console.log("error", e);
      if (e instanceof ValidationException) {
        return new HttpResponseBuilder(400).setError(e.message).build();
      }
      if (e instanceof StudentAlreadyExistsException) {
        return new HttpResponseBuilder(409).setError(e.message).build();
      }
      return new HttpResponseBuilder(500).setError(e.message).build();
    }
  }

  async getStudent(params: any, body: any): Promise<HttpResponse> {
    try {
      const response = await this.getStudentUsecase
        .Execute(new GetStudentInputDto(params.studentPk));
      return new HttpResponseBuilder(200).setData(response).build();

    } catch (e: any) {
      console.log("error", e);
      if (e instanceof NotFoundException) {
        return new HttpResponseBuilder(404).setError(e.message).build();
      }
      return new HttpResponseBuilder(500).setError(e.message).build();
    }
  }
}
