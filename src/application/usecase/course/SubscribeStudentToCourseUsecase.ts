import CourseRepository from "../../../domain/repository/CourseRepository";
import StudentRepository from "../../../domain/repository/StudentRepository";
import SubscribeStudentToCourseInputDto from "../../dto/course/SubscribeStudentToCourseInputDto";
import SubscribeStudentToCourseOutputDto from "../../dto/course/SubscribeStudentToCourseOutputDto";
import Usecase from "../Usecase";

export default class SubscribeStudentToCourseUsecase implements Usecase<SubscribeStudentToCourseInputDto, SubscribeStudentToCourseOutputDto> {

  constructor(
    public readonly courseRepository: CourseRepository,
    public readonly studentRepository: StudentRepository
  ) {}

  async Execute(input: SubscribeStudentToCourseInputDto): Promise<SubscribeStudentToCourseOutputDto> {
    // check if student exists, otherwise it throws an exception
    await this.studentRepository.fetchStudent(input.studentPk);

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
