import Course from "../../../domain/entity/Course";
import CourseRepository from "../../../domain/repository/CourseRepository";
import ListCourseByStudentInputDto from "../../dto/course/ListCourseByStudentInputDto";
import ListCourseByStudentOutputDto from "../../dto/course/ListCourseByStudentOutputDto";
import Usecase from "../Usecase";

export default class ListCourseByStudentUsecase implements Usecase<ListCourseByStudentInputDto, ListCourseByStudentOutputDto[]> {

  constructor(public readonly courseRepository: CourseRepository) {}

  async Execute(input: ListCourseByStudentInputDto): Promise<ListCourseByStudentOutputDto[]> {
    const courses = await this.courseRepository.listCourseByStudent(input.studentPk);
    if (!courses) return [];
    return courses.map((course: Course) => new ListCourseByStudentOutputDto(
      course.pk,
      course.sk,
      course.id,
      course.name,
      course.price,
      course.area,
      course.subArea,
      course.author,
      course.quantityClasses,
      [...course.students.values()],
      course.creationDate,
    ));
  }
}
