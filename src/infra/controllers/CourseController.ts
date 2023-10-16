import CreateCourseInputDto from "../../application/dto/course/CreateCourseInputDto";
import CreateCourseUsecase from "../../application/usecase/course/CreateCourseUsecase";
import HttpResponse from "../http/HttpResponse";
import HttpResponseBuilder from "../http/HttpResponseBuilder";
import CourseAlreadyExistsException from "../../domain/exception/CourseAlreadyExistsException";
import SubscribeStudentToCourseInputDto from "../../application/dto/course/SubscribeStudentToCourseInputDto";
import SubscribeStudentToCourseUsecase from "../../application/usecase/course/SubscribeStudentToCourseUsecase";
import NotFoundException from "../../domain/exception/NotFoundException";
import GetCourseInputDto from "../../application/dto/course/GetCourseInputDto";
import GetCourseUsecase from "../../application/usecase/course/GetCourseUsecase";
import ListCourseByAreaInputDto from "../../application/dto/course/ListCourseByAreaInputDto";
import ListCourseByAreaUsecase from "../../application/usecase/course/ListCourseByAreaUsecase";
import ValidationException from "../../domain/exception/ValidationException";
import ListCourseByStudentUsecase from "../../application/usecase/course/ListCourseByStudentUsecase";
import ListCourseByStudentInputDto from "../../application/dto/course/ListCourseByStudentInputDto";

export default class CourseController {

  constructor(
    readonly createCourseUsecase: CreateCourseUsecase,
    readonly getCourseUsecase: GetCourseUsecase,
    readonly listCourseByAreaUsecase: ListCourseByAreaUsecase,
    readonly listCourseByStudentUsecase: ListCourseByStudentUsecase,
    readonly subscribeStudentToCourseUsecase: SubscribeStudentToCourseUsecase,
  ) {}

  async createCourse(params: any, body: CreateCourseInputDto): Promise<HttpResponse> {
    try {
      const response = await this.createCourseUsecase
        .Execute(body);
      return new HttpResponseBuilder(201).setData(response).build();

    } catch (e: any) {
      console.log("error", e);
      if (e instanceof ValidationException) {
        return new HttpResponseBuilder(400).setError(e.message).build();
      }
      if (e instanceof CourseAlreadyExistsException) {
        return new HttpResponseBuilder(409).setError(e.message).build();
      }
      return new HttpResponseBuilder(500).setError(e.message).build();
    }
  }

  async getCourse(params: any, body: any): Promise<HttpResponse> {
    try {
      const response = await this.getCourseUsecase
        .Execute(new GetCourseInputDto(params.coursePk));
      return new HttpResponseBuilder(200).setData(response).build();

    } catch (e: any) {
      console.log("error", e);
      if (e instanceof NotFoundException) {
        return new HttpResponseBuilder(404).setError(e.message).build();
      }
      return new HttpResponseBuilder(500).setError(e.message).build();
    }
  }

  async listCourseByArea(params: any, body: any): Promise<HttpResponse> {
    try {
      const response = await this.listCourseByAreaUsecase
        .Execute(new ListCourseByAreaInputDto(params.area));
      return new HttpResponseBuilder(200).setData(response).build();

    } catch (e: any) {
      console.log("error", e);
      return new HttpResponseBuilder(500).setError(e.message).build();
    }
  }

  async listCourseByStudent(params: any, body: any): Promise<HttpResponse> {
    try {
      const response = await this.listCourseByStudentUsecase
        .Execute(new ListCourseByStudentInputDto(params.studentPk));
      return new HttpResponseBuilder(200).setData(response).build();

    } catch (e: any) {
      console.log("error", e);
      if (e instanceof NotFoundException) {
        return new HttpResponseBuilder(404).setError(e.message).build();
      }
      return new HttpResponseBuilder(500).setError(e.message).build();
    }
  }

  async subscribeStudentToCourse(params: any, body: any): Promise<HttpResponse> {
    try {
      const response = await this.subscribeStudentToCourseUsecase
        .Execute(new SubscribeStudentToCourseInputDto(params.coursePk, params.studentPk));
      return new HttpResponseBuilder(202).setData(response).build();

    } catch (e: any) {
      console.log("error", e);
      if (e instanceof ValidationException) {
        return new HttpResponseBuilder(400).setError(e.message).build();
      }
      if (e instanceof NotFoundException) {
        return new HttpResponseBuilder(404).setError(e.message).build();
      }
      return new HttpResponseBuilder(500).setError(e.message).build();
    }
  }
}
