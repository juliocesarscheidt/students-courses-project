import Course from "../../../../src/domain/entity/Course";
import ValidationException from "../../../../src/domain/exception/ValidationException";
import ValueObject from "../../../../src/domain/vo/ValueObject";

describe("Course entity tests", () => {
  test("It should create a new course", () => {
    // given
    const expectedCourseName = "Course 1";
    const expectedPrice = 100.00;
    const expectedArea = "Technology";
    const expectedSubArea = "Cloud Computing";
    const expectedAuthor = "John Doe";
    const expectedQuantityClasses = 50;

    // when
    const course = Course.newCourse(expectedCourseName, expectedPrice,
      expectedArea, expectedSubArea, expectedAuthor, expectedQuantityClasses);

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
    expect(course.students.size).toBe(0);
    expect(course.creationDate).toBeDefined();
  });

  test("It shouldn't create course without any required attribute", () => {
    // given
    const expectedCourseName = "Course 1";
    const expectedPrice = 100.00;
    const expectedArea = "Technology";
    const expectedSubArea = "Cloud Computing";
    const expectedAuthor = "John Doe";

    // when
    expect(() => {
      Course.newCourse(expectedCourseName, expectedPrice,
        expectedArea, expectedSubArea, expectedAuthor, undefined);
    }).toThrow(ValidationException);
  });

  test("It should subscribe a student to a course", () => {
    // given
    const expectedCourseName = "Course 1";
    const expectedPrice = 100.00;
    const expectedArea = "Technology";
    const expectedSubArea = "Cloud Computing";
    const expectedAuthor = "John Doe";
    const expectedQuantityClasses = 50;

    // when
    const course = Course.newCourse(expectedCourseName, expectedPrice,
      expectedArea, expectedSubArea, expectedAuthor, expectedQuantityClasses);

    course.subscribeStudent("student1");

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
    expect(course.students.size).toBe(1);
    expect(course.creationDate).toBeDefined();
  });
});
