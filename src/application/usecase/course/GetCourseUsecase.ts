import NotFoundException from "../../../domain/exception/NotFoundException";
import CourseRepository from "../../../domain/repository/CourseRepository";
import GetCourseInputDto from "../../dto/course/GetCourseInputDto";
import GetCourseOutputDto from "../../dto/course/GetCourseOutputDto";
import Usecase from "../Usecase";

export default class GetCourseUsecase implements Usecase<GetCourseInputDto, GetCourseOutputDto> {

  constructor(public readonly courseRepository: CourseRepository) {}

  async Execute(input: GetCourseInputDto): Promise<GetCourseOutputDto> {
    const course = await this.courseRepository
      .getCourse(input.coursePk);
    if (!course) throw new NotFoundException("Course not found");
    return new GetCourseOutputDto(
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
