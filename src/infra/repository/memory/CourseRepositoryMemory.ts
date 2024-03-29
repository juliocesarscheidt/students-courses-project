import Course from "../../../domain/entity/Course";
import CourseRepository from "../../../domain/repository/CourseRepository";
import CourseAlreadyExistsException from "../../../domain/exception/CourseAlreadyExistsException";
import NotFoundException from "../../../domain/exception/NotFoundException";

export default class CourseRepositoryMemory implements CourseRepository {

  private coursesByPk: Map<string, Course> = new Map();
  private coursesListByArea: Map<string, Set<Course>> = new Map();

  constructor() {}

  async persistCourse(course: Course): Promise<void> {
    if (this.coursesByPk.get(course.pk)) {
      throw new CourseAlreadyExistsException();
    }
    this.coursesByPk.set(course.pk, course);

    let coursesByArea = this.coursesListByArea.get(course.area);
    if (coursesByArea) {
      coursesByArea.add(course);
    } else {
      coursesByArea = new Set([course]);
    }

    this.coursesListByArea.set(course.area, coursesByArea);
  }

  async fetchCourse(coursePk: string): Promise<Course> {
    const course = this.coursesByPk.get(coursePk);
    if (!course) {
      throw new NotFoundException("Course not found");
    }
    return Course.mapFrom(course);
  }

  async listCourseByArea(area: string): Promise<Course[] | null> {
    const courses = this.coursesListByArea.get(area);
    if (!courses || courses.size === 0) {
      return null;
    }
    return Array.from(courses).map((course: Course) => Course.mapFrom(course));
  }

  async listCourseByStudent(studentPk: string): Promise<Course[] | null> {
    const coursesArray: Course[] = [];
    Array.from(this.coursesByPk)
      .forEach((course: [string, Course]) => {
        const studentsArray = Array.from(course[1].students);
        if (studentsArray.includes(studentPk)) {
          coursesArray.push(course[1]);
        }
      });
    if (!coursesArray || coursesArray.length === 0) {
      return null;
    }
    return coursesArray?.map((course: any) => Course.mapFrom(course));
  }

  async subscribeStudentToCourse(
    coursePk: string,
    studentPk: string
  ): Promise<Course> {
    const courses = this.coursesByPk.get(coursePk);
    if (!courses) {
      throw new NotFoundException("Course not found");
    }

    const course = Course.mapFrom(courses);

    let coursesByArea = this.coursesListByArea.get(course.area);
    if (coursesByArea) {
      const coursesByAreaInstance = Array
        .from(coursesByArea)
        .find((c) => c.pk === course.pk);
      if (coursesByAreaInstance) coursesByArea.delete(coursesByAreaInstance);
    } else {
      coursesByArea = new Set([]);
    }

    course.subscribeStudent(studentPk);

    this.coursesByPk.set(course.pk, course);

    coursesByArea.add(course);
    this.coursesListByArea.set(course.area, coursesByArea);

    return course;
  }
}
