import Course from "../entity/Course";

export default interface CourseRepository {

  createCourse(
    name: string,
    price: number,
    area: string,
    subArea: string,
    author: string,
    quantityClasses: number
  ): Promise<Course>;

  getCourse(coursePk: string): Promise<Course | null>;

  listCourseByArea(area: string): Promise<Course[] | null>;

  subscribeStudentToCourse(
    coursePk: string,
    studentPk: string
  ): Promise<Course>;
}
