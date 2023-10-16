import ValueObject from "../../../../../src/domain/vo/ValueObject";
import CreateCourseInputDto from "../../../../../src/application/dto/course/CreateCourseInputDto";
import CreateCourseUsecase from "../../../../../src/application/usecase/course/CreateCourseUsecase";
import CourseRepositoryMemory from "../../../../../src/infra/repository/memory/CourseRepositoryMemory";
import CourseAlreadyExistsException from "../../../../../src/domain/exception/CourseAlreadyExistsException";

describe("CreateCourseUsecase usecase tests", () => {
  test("It should create a new course", async () => {
    // given
    const expectedCourseName = "Course 1";
    const expectedPrice = 100.00;
    const expectedArea = "Technology";
    const expectedSubArea = "Cloud Computing";
    const expectedAuthor = "John Doe";
    const expectedQuantityClasses = 50;

    const createCourseUsecase = new CreateCourseUsecase(new CourseRepositoryMemory());

    // when
    const input = new CreateCourseInputDto(expectedCourseName, expectedPrice, expectedArea, expectedSubArea, expectedAuthor, expectedQuantityClasses);
    const course = await createCourseUsecase.Execute(input);

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

  test("It shouldn't create a duplicate course", async () => {
    // given
    const expectedCourseName = "Course 1";
    const expectedPrice = 100.00;
    const expectedArea = "Technology";
    const expectedSubArea = "Cloud Computing";
    const expectedAuthor = "John Doe";
    const expectedQuantityClasses = 50;

    const createCourseUsecase = new CreateCourseUsecase(new CourseRepositoryMemory());

    // when
    const input = new CreateCourseInputDto(expectedCourseName, expectedPrice, expectedArea, expectedSubArea, expectedAuthor, expectedQuantityClasses);
    await createCourseUsecase.Execute(input);

    // then
    try {
      await createCourseUsecase.Execute(input);
      expect(true).toBe(false);
    } catch (error) {
      expect(error).toBeInstanceOf(CourseAlreadyExistsException);
    }
  });
});
