import Http from "./Http";
import CreateCourseUsecase from "../../application/usecase/CreateCourseUsecase";
import CourseController from "../controllers/CourseController";
import AbstractRepositoryFactory from "../../domain/factory/AbstractRepositoryFactory";
import CreateStudentUsecase from "../../application/usecase/CreateStudentUsecase";
import StudentController from "../controllers/StudentController";
import SubscribeStudentToCourseUsecase from "../../application/usecase/SubscribeStudentToCourse";
import GetCourseUsecase from "../../application/usecase/GetCourseUsecase";
import GetStudentUsecase from "../../application/usecase/GetStudentUsecase";
import ListCourseByAreaUsecase from "../../application/usecase/ListCourseByAreaUsecase";

export default class Router {
  courseController: CourseController;
  studentController: StudentController;

  constructor(
    readonly http: Http,
    readonly repositoryFactory: AbstractRepositoryFactory
  ) {
    const courseRepository = this.repositoryFactory.createCourseRepository();
    const studentRepository = this.repositoryFactory.createStudentRepository();

    // usecases
    const createCourseUsecase = new CreateCourseUsecase(courseRepository);
    const getCourseUsecase = new GetCourseUsecase(courseRepository);
    const listCourseByAreaUsecase = new ListCourseByAreaUsecase(courseRepository);
    const subscribeStudentToCourseUsecase = new SubscribeStudentToCourseUsecase(courseRepository);

    const createStudentUsecase = new CreateStudentUsecase(studentRepository);
    const getStudentUsecase = new GetStudentUsecase(studentRepository);

    // controllers
    this.courseController = new CourseController(createCourseUsecase, getCourseUsecase, listCourseByAreaUsecase, subscribeStudentToCourseUsecase);
    this.studentController = new StudentController(createStudentUsecase, getStudentUsecase);

    this.setupRoutes();
  }

  setupRoutes() {
    // course
    this.http.on("/v1/course", "post", async (params: any, body: any, query: any, headers: any) =>
      this.courseController.createCourse(params, body));

    this.http.on("/v1/course/:coursePk", "get", async (params: any, body: any, query: any, headers: any) =>
      this.courseController.getCourse(params, body));

    this.http.on("/v1/course/area/:area", "get", async (params: any, body: any, query: any, headers: any) =>
      this.courseController.listCourseByArea(params, body));

    this.http.on("/v1/course/:coursePk/subscribe/:studentPk", "put", async (params: any, body: any, query: any, headers: any) =>
      this.courseController.subscribeStudentToCourse(params, body));

    // student
    this.http.on("/v1/student", "post", async (params: any, body: any, query: any, headers: any) =>
      this.studentController.createStudent(params, body));

    this.http.on("/v1/student/:studentPk", "get", async (params: any, body: any, query: any, headers: any) =>
      this.studentController.getStudent(params, body));
  }
}

