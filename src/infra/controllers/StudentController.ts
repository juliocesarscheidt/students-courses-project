import CreateStudentInputDto from "../../application/dto/student/CreateStudentInputDto";
import CreateStudentUsecase from "../../application/usecase/CreateStudentUsecase";
import HttpResponse from "../http/HttpResponse";
import HttpResponseBuilder from "../http/HttpResponseBuilder";
import StudentAlreadyExistsException from "../../domain/exception/StudentAlreadyExistsException";
import GetStudentUsecase from "../../application/usecase/GetStudentUsecase";
import GetStudentInputDto from "../../application/dto/student/GetStudentInputDto";
import NotFoundException from "../../domain/exception/NotFoundException";

export default class StudentController {
  constructor(
    readonly createStudentUsecase: CreateStudentUsecase,
    readonly getStudentUsecase: GetStudentUsecase,
  ) {}

  async createStudent(params: any, body: CreateStudentInputDto): Promise<HttpResponse> {
    const createStudentInputDto = new CreateStudentInputDto(
      body.name,
      body.surname,
      body.name + " " + body.surname, // fullName
      body.email,
    );
    console.log("createStudentInputDto", createStudentInputDto);

    try {
      const result = await this.createStudentUsecase.Execute(createStudentInputDto);
      return new HttpResponseBuilder(201).setData(result).build();

    } catch (e: any) {
      console.log("error", e);
      if (e instanceof StudentAlreadyExistsException) {
        return new HttpResponseBuilder(400).setError(e.message).build();
      }
      return new HttpResponseBuilder(500).setError(e.message).build();
    }
  }

  async getStudent(params: any, body: any): Promise<HttpResponse> {
    const getStudentInputDto = new GetStudentInputDto(
      params.studentPk,
    );
    console.log("getStudentInputDto", getStudentInputDto);

    try {
      const result = await this.getStudentUsecase.Execute(getStudentInputDto);
      return new HttpResponseBuilder(200).setData(result).build();

    } catch (e: any) {
      console.log("error", e);
      if (e instanceof NotFoundException) {
        return new HttpResponseBuilder(404).setError(e.message).build();
      }
      return new HttpResponseBuilder(500).setError(e.message).build();
    }
  }
}
