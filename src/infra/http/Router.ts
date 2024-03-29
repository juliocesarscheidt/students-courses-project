import Http from "./Http";
import CreateCourseUsecase from "../../application/usecase/course/CreateCourseUsecase";
import CourseController from "../controllers/CourseController";
import AbstractRepositoryFactory from "../../domain/factory/AbstractRepositoryFactory";
import CreateStudentUsecase from "../../application/usecase/student/CreateStudentUsecase";
import StudentController from "../controllers/StudentController";
import SubscribeStudentToCourseUsecase from "../../application/usecase/course/SubscribeStudentToCourseUsecase";
import GetCourseUsecase from "../../application/usecase/course/GetCourseUsecase";
import GetStudentUsecase from "../../application/usecase/student/GetStudentUsecase";
import ListCourseByAreaUsecase from "../../application/usecase/course/ListCourseByAreaUsecase";
import ListCourseByStudentUsecase from "../../application/usecase/course/ListCourseByStudentUsecase";
import HealthCheckController from "../controllers/HealthCheckController";

export default class Router {
  healthCheckController: HealthCheckController;
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
    const listCourseByStudentUsecase = new ListCourseByStudentUsecase(courseRepository);
    const subscribeStudentToCourseUsecase = new SubscribeStudentToCourseUsecase(courseRepository, studentRepository);

    const createStudentUsecase = new CreateStudentUsecase(studentRepository);
    const getStudentUsecase = new GetStudentUsecase(studentRepository);

    // controllers
    this.healthCheckController = new HealthCheckController();
    this.courseController = new CourseController(createCourseUsecase, getCourseUsecase,
      listCourseByAreaUsecase, listCourseByStudentUsecase, subscribeStudentToCourseUsecase);
    this.studentController = new StudentController(createStudentUsecase, getStudentUsecase);

    this.setupRoutes();
  }

  setupRoutes() {
    // health check
    this.http.on("/v1/health/live", "get", async (params: any, body: any, query: any, headers: any) =>
      this.healthCheckController.getLiveness(params));
    this.http.on("/v1/health/ready", "get", async (params: any, body: any, query: any, headers: any) =>
      this.healthCheckController.getReadiness(params));

    // course
    this.http.on("/v1/course", "post", async (params: any, body: any, query: any, headers: any) =>
      this.courseController.createCourse(params, body));
    this.http.on("/v1/course/:coursePk", "get", async (params: any, body: any, query: any, headers: any) =>
      this.courseController.getCourse(params, body));
    this.http.on("/v1/course/area/:area", "get", async (params: any, body: any, query: any, headers: any) =>
      this.courseController.listCourseByArea(params, body));
    this.http.on("/v1/course/student/:studentPk", "get", async (params: any, body: any, query: any, headers: any) =>
      this.courseController.listCourseByStudent(params, body));
    this.http.on("/v1/course/:coursePk/subscribe/:studentPk", "put", async (params: any, body: any, query: any, headers: any) =>
      this.courseController.subscribeStudentToCourse(params, body));

    // student
    this.http.on("/v1/student", "post", async (params: any, body: any, query: any, headers: any) =>
      this.studentController.createStudent(params, body));
    this.http.on("/v1/student/:studentPk", "get", async (params: any, body: any, query: any, headers: any) =>
      this.studentController.getStudent(params, body));
  }
}

