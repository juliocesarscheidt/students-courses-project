import CourseRepository from "../../../domain/repository/CourseRepository";
import SubscribeStudentToCourseInputDto from "../../dto/course/SubscribeStudentToCourseInputDto";
import SubscribeStudentToCourseOutputDto from "../../dto/course/SubscribeStudentToCourseOutputDto";
import Usecase from "../Usecase";

export default class SubscribeStudentToCourseUsecase implements Usecase<SubscribeStudentToCourseInputDto, SubscribeStudentToCourseOutputDto> {

  constructor(public readonly courseRepository: CourseRepository) {}

  async Execute(input: SubscribeStudentToCourseInputDto): Promise<SubscribeStudentToCourseOutputDto> {
    const course = await this.courseRepository
      .subscribeStudentToCourse(input.coursePk, input.studentPk);
    return new SubscribeStudentToCourseOutputDto(
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
