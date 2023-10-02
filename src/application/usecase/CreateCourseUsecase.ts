import CourseRepository from "../../domain/repository/CourseRepository";
import CreateCourseInputDto from "../dto/course/CreateCourseInputDto";
import CreateCourseOutputDto from "../dto/course/CreateCourseOutputDto";
import Usecase from "./Usecase";

export default class CreateCourseUsecase implements Usecase<CreateCourseInputDto, CreateCourseOutputDto> {

  constructor(public readonly courseRepository: CourseRepository) {
  }

  async Execute(input: CreateCourseInputDto): Promise<CreateCourseOutputDto> {
    const result = await this.courseRepository.createCourse(
      input.name,
      input.price,
      input.area,
      input.subArea,
      input.author,
      input.quantityClasses
    );
    return new CreateCourseOutputDto(
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
