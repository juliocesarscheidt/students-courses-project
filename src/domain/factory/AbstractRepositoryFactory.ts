import CourseRepository from "../repository/CourseRepository";
import StudentRepository from "../repository/StudentRepository";

export default interface AbstractRepositoryFactory {
  createCourseRepository(): CourseRepository;
  createStudentRepository(): StudentRepository;
}
