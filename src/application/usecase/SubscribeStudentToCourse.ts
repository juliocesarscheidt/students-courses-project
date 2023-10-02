import CourseRepository from "../../domain/repository/CourseRepository";
import SubscribeStudentToCourseInputDto from "../dto/course/SubscribeStudentToCourseInputDto";
import SubscribeStudentToCourseOutputDto from "../dto/course/SubscribeStudentToCourseOutputDto";
import Usecase from "./Usecase";

export default class SubscribeStudentToCourseUsecase implements Usecase<SubscribeStudentToCourseInputDto, SubscribeStudentToCourseOutputDto> {

  constructor(public readonly courseRepository: CourseRepository) {
  }

  async Execute(input: SubscribeStudentToCourseInputDto): Promise<SubscribeStudentToCourseOutputDto> {
    const result = await this.courseRepository.subscribeStudentToCourse(
      input.coursePk,
      input.studentPk,
    );
    return new SubscribeStudentToCourseOutputDto(
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
