import Course from "../entity/Course";

export default interface CourseRepository {

  persistCourse(course: Course): Promise<void>;

  fetchCourse(coursePk: string): Promise<Course>;

  listCourseByArea(area: string): Promise<Course[] | null>;

  listCourseByStudent(studentPk: string): Promise<Course[] | null>;

  subscribeStudentToCourse(
    coursePk: string,
    studentPk: string
  ): Promise<Course>;
}
