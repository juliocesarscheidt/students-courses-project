import Course from "../../domain/entity/Course";
import CourseRepository from "../../domain/repository/CourseRepository";
import ListCourseByAreaInputDto from "../dto/course/ListCourseByAreaInputDto";
import ListCourseByAreaOutputDto from "../dto/course/ListCourseByAreaOutputDto";
import Usecase from "./Usecase";

export default class ListCourseByAreaUsecase implements Usecase<ListCourseByAreaInputDto, ListCourseByAreaOutputDto[] | null> {

  constructor(public readonly courseRepository: CourseRepository) {
  }

  async Execute(input: ListCourseByAreaInputDto): Promise<ListCourseByAreaOutputDto[] | null> {
    const result = await this.courseRepository.listCourseByArea(
      input.area,
    );
    console.log("result", result);
    if (!result) return null;
    return result.map((course: Course) => new ListCourseByAreaOutputDto(
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
