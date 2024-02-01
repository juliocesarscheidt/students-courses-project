import AbstractRepositoryFactory from "../../domain/factory/AbstractRepositoryFactory";
import CourseRepository from "../../domain/repository/CourseRepository";
import StudentRepository from "../../domain/repository/StudentRepository";
import CourseRepositoryMemory from "../repository/memory/CourseRepositoryMemory";
import StudentRepositoryMemory from "../repository/memory/StudentRepositoryMemory";

export default class RepositoryFactoryMemory implements AbstractRepositoryFactory {
  constructor() {
  }

  createCourseRepository(): CourseRepository {
    return new CourseRepositoryMemory();
  }

  createStudentRepository(): StudentRepository {
    return new StudentRepositoryMemory();
  }
}
