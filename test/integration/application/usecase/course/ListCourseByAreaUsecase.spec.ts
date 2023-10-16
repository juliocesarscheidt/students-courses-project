import CreateCourseInputDto from "../../../../../src/application/dto/course/CreateCourseInputDto";
import CreateCourseUsecase from "../../../../../src/application/usecase/course/CreateCourseUsecase";
import ListCourseByAreaUsecase from "../../../../../src/application/usecase/course/ListCourseByAreaUsecase";
import CourseRepositoryMemory from "../../../../../src/infra/repository/memory/CourseRepositoryMemory";
import ListCourseByAreaInputDto from "../../../../../src/application/dto/course/ListCourseByAreaInputDto";
import ValueObject from "../../../../../src/domain/vo/ValueObject";

describe("ListCourseByAreaUsecase usecase tests", () => {
  test("It should retrieve an existing course by its area", async () => {
    // given
    const expectedCourseName = "Course 1";
    const expectedPrice = 100.00;
    const expectedArea = "Technology";
    const expectedSubArea = "Cloud Computing";
    const expectedAuthor = "John Doe";
    const expectedQuantityClasses = 50;

    const repository = new CourseRepositoryMemory();
    const createCourseUsecase = new CreateCourseUsecase(repository);
    const listCourseByAreaUsecase = new ListCourseByAreaUsecase(repository);

    // when
    const input = new CreateCourseInputDto(expectedCourseName, expectedPrice, expectedArea, expectedSubArea, expectedAuthor, expectedQuantityClasses);
    await createCourseUsecase.Execute(input);

    const courses = await listCourseByAreaUsecase.Execute(new ListCourseByAreaInputDto(expectedArea));

    // then
    expect(courses).toBeDefined();
    expect(courses.length).toBe(1);

    const [course] = courses;
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

  test("It shouldn't retrieve an existing course by a different area", async () => {
    // given
    const expectedCourseName = "Course 1";
    const expectedPrice = 100.00;
    const expectedArea = "Technology";
    const expectedSubArea = "Cloud Computing";
    const expectedAuthor = "John Doe";
    const expectedQuantityClasses = 50;

    const repository = new CourseRepositoryMemory();
    const createCourseUsecase = new CreateCourseUsecase(repository);
    const listCourseByAreaUsecase = new ListCourseByAreaUsecase(repository);

    // when
    const input = new CreateCourseInputDto(expectedCourseName, expectedPrice, expectedArea, expectedSubArea, expectedAuthor, expectedQuantityClasses);
    await createCourseUsecase.Execute(input);

    const courses = await listCourseByAreaUsecase.Execute(new ListCourseByAreaInputDto("unknown area"));

    // then
    expect(courses).toBeDefined();
    expect(courses.length).toBe(0);
  });

  test("It shouldn't retrieve multiple course of the same area", async () => {
    // given
    const expectedCourseName = "Course";
    const expectedPrice = 100.00;
    const expectedArea = "Technology";
    const expectedSubArea = "Cloud Computing";
    const expectedAuthor = "John Doe";
    const expectedQuantityClasses = 50;

    const repository = new CourseRepositoryMemory();
    const createCourseUsecase = new CreateCourseUsecase(repository);
    const listCourseByAreaUsecase = new ListCourseByAreaUsecase(repository);

    // when
    for (let i = 0; i < 2; i++) {
      const input = new CreateCourseInputDto(`${expectedCourseName} ${i+1}`, expectedPrice, expectedArea, expectedSubArea, expectedAuthor, expectedQuantityClasses);
      await createCourseUsecase.Execute(input);
    }

    const courses = await listCourseByAreaUsecase.Execute(new ListCourseByAreaInputDto(expectedArea));

    // then
    expect(courses).toBeDefined();
    expect(courses.length).toBe(2);
  });
});
