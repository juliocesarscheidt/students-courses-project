import Course from "../../../domain/entity/Course";
import CourseRepository from "../../../domain/repository/CourseRepository";
import CreateCourseInputDto from "../../dto/course/CreateCourseInputDto";
import CreateCourseOutputDto from "../../dto/course/CreateCourseOutputDto";
import Usecase from "../Usecase";

export default class CreateCourseUsecase implements Usecase<CreateCourseInputDto, CreateCourseOutputDto> {

  constructor(public readonly courseRepository: CourseRepository) {}

  async Execute(input: CreateCourseInputDto): Promise<CreateCourseOutputDto> {
    const course = Course.newCourse(input.name, input.price, input.area,
      input.subArea, input.author, input.quantityClasses);
    await this.courseRepository.persistCourse(course);
    return new CreateCourseOutputDto(
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
    );
  }
}
