import ValueObject from "../../../../../src/domain/vo/ValueObject";
import CreateCourseInputDto from "../../../../../src/application/dto/course/CreateCourseInputDto";
import CreateCourseUsecase from "../../../../../src/application/usecase/course/CreateCourseUsecase";
import GetCourseUsecase from "../../../../../src/application/usecase/course/GetCourseUsecase";
import CourseRepositoryMemory from "../../../../../src/infra/repository/memory/CourseRepositoryMemory";
import GetCourseInputDto from "../../../../../src/application/dto/course/GetCourseInputDto";
import NotFoundException from "../../../../../src/domain/exception/NotFoundException";

describe("GetCourseUsecase usecase tests", () => {
  test("It should retrieve an existing course", async () => {
    // given
    const expectedCourseName = "Course 1";
    const expectedPrice = 100.00;
    const expectedArea = "Technology";
    const expectedSubArea = "Cloud Computing";
    const expectedAuthor = "John Doe";
    const expectedQuantityClasses = 50;

    const repository = new CourseRepositoryMemory();
    const createCourseUsecase = new CreateCourseUsecase(repository);
    const getCourseUsecase = new GetCourseUsecase(repository);

    // when
    const input = new CreateCourseInputDto(expectedCourseName, expectedPrice, expectedArea, expectedSubArea, expectedAuthor, expectedQuantityClasses);
    const output = await createCourseUsecase.Execute(input);

    const course = await getCourseUsecase.Execute(new GetCourseInputDto(output.pk));

    // then
    expect(course).toBeDefined();
    expect(course.pk).toBe(ValueObject.normalizeString(expectedCourseName));
    expect(course.sk).toBeDefined();
    expect(course.id).toBeDefined();
    expect(course.name).toBe(expectedCourseName);
    expect(course.price).toBe(expectedPrice);
    expect(course.area).toBe(expectedArea);
    expect(course.subArea).toBe(expectedSubArea);
    expect(course.author).toBe(expectedAuthor);
    expect(course.quantityClasses).toBe(expectedQuantityClasses);
    expect(course.students.values.length).toBe(0);
    expect(course.creationDate).toBeDefined();
  });

  test("It shouldn't retrieve a non existing course", async () => {
    // given
    const repository = new CourseRepositoryMemory();
    const getCourseUsecase = new GetCourseUsecase(repository);

    // when

    // then
    try {
      await getCourseUsecase.Execute(new GetCourseInputDto("course1"));
      expect(true).toBe(false);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });
});
