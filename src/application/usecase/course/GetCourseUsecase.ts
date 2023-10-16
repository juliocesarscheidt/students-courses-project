import CourseRepository from "../../../domain/repository/CourseRepository";
import GetCourseInputDto from "../../dto/course/GetCourseInputDto";
import GetCourseOutputDto from "../../dto/course/GetCourseOutputDto";
import Usecase from "../Usecase";

export default class GetCourseUsecase implements Usecase<GetCourseInputDto, GetCourseOutputDto> {

  constructor(public readonly courseRepository: CourseRepository) {}

  async Execute(input: GetCourseInputDto): Promise<GetCourseOutputDto> {
    const course = await this.courseRepository
      .fetchCourse(input.coursePk);
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
