import Course from "../entity/Course";

export default interface CourseRepository {

  createCourse(course: Course): Promise<void>;

  getCourse(coursePk: string): Promise<Course | null>;

  listCourseByArea(area: string): Promise<Course[] | null>;

  listCourseByStudent(studentPk: string): Promise<Course[] | null>;

  subscribeStudentToCourse(
    coursePk: string,
    studentPk: string
  ): Promise<Course>;
}
