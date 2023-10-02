import CreateCourseInputDto from "../../application/dto/course/CreateCourseInputDto";
import CreateCourseUsecase from "../../application/usecase/CreateCourseUsecase";
import HttpResponse from "../http/HttpResponse";
import HttpResponseBuilder from "../http/HttpResponseBuilder";
import CourseAlreadyExistsException from "../../domain/exception/CourseAlreadyExistsException";
import SubscribeStudentToCourseInputDto from "../../application/dto/course/SubscribeStudentToCourseInputDto";
import SubscribeStudentToCourseUsecase from "../../application/usecase/SubscribeStudentToCourse";
import NotFoundException from "../../domain/exception/NotFoundException";
import GetCourseInputDto from "../../application/dto/course/GetCourseInputDto";
import GetCourseUsecase from "../../application/usecase/GetCourseUsecase";
import ListCourseByAreaInputDto from "../../application/dto/course/ListCourseByAreaInputDto";
import ListCourseByAreaUsecase from "../../application/usecase/ListCourseByAreaUsecase";
import ValidationException from "../../domain/exception/ValidationException";

export default class CourseController {
  constructor(
    readonly createCourseUsecase: CreateCourseUsecase,
    readonly getCourseUsecase: GetCourseUsecase,
    readonly listCourseByAreaUsecase: ListCourseByAreaUsecase,
    readonly subscribeStudentToCourseUsecase: SubscribeStudentToCourseUsecase,
  ) {}

  async createCourse(params: any, body: CreateCourseInputDto): Promise<HttpResponse> {
    const createCourseInputDto = new CreateCourseInputDto(
      body.name,
      body.price,
      body.area,
      body.subArea,
      body.author,
      body.quantityClasses
    );

    try {
      const result = await this.createCourseUsecase.Execute(createCourseInputDto);
      return new HttpResponseBuilder(201).setData(result).build();

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
    const getCourseInputDto = new GetCourseInputDto(
      params.coursePk,
    );

    try {
      const result = await this.getCourseUsecase.Execute(getCourseInputDto);
      return new HttpResponseBuilder(200).setData(result).build();

    } catch (e: any) {
      console.log("error", e);
      if (e instanceof NotFoundException) {
        return new HttpResponseBuilder(404).setError(e.message).build();
      }
      return new HttpResponseBuilder(500).setError(e.message).build();
    }
  }

  async listCourseByArea(params: any, body: any): Promise<HttpResponse> {
    const listCourseByAreaInputDto = new ListCourseByAreaInputDto(
      params.area,
    );

    try {
      const result = await this.listCourseByAreaUsecase.Execute(listCourseByAreaInputDto);
      return new HttpResponseBuilder(200).setData(result).build();

    } catch (e: any) {
      console.log("error", e);
      return new HttpResponseBuilder(500).setError(e.message).build();
    }
  }

  async subscribeStudentToCourse(params: any, body: any): Promise<HttpResponse> {
    const subscribeStudentToCourseInputDto = new SubscribeStudentToCourseInputDto(
      params.coursePk,
      params.studentPk,
    );

    try {
      const result = await this.subscribeStudentToCourseUsecase.Execute(subscribeStudentToCourseInputDto);
      return new HttpResponseBuilder(202).setData(result).build();

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
