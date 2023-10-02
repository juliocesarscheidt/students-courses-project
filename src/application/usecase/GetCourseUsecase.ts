import NotFoundException from "../../domain/exception/NotFoundException";
import CourseRepository from "../../domain/repository/CourseRepository";
import GetCourseInputDto from "../dto/course/GetCourseInputDto";
import GetCourseOutputDto from "../dto/course/GetCourseOutputDto";
import Usecase from "./Usecase";

export default class GetCourseUsecase implements Usecase<GetCourseInputDto, GetCourseOutputDto> {

  constructor(public readonly courseRepository: CourseRepository) {
  }

  async Execute(input: GetCourseInputDto): Promise<GetCourseOutputDto> {
    const result = await this.courseRepository.getCourse(
      input.coursePk,
    );
    console.log("result", result);
    if (!result) throw new NotFoundException("Course not found");
    return new GetCourseOutputDto(
      result.pk,
      result.sk,
      result.id,
      result.name,
      result.price,
      result.area,
      result.subArea,
      result.author,
      result.quantityClasses,
      [...result.students.values()],
      result.creationDate,
    );
  }
}
