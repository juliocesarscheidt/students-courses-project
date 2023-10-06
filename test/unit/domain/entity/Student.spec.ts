import Student from "../../../../src/domain/entity/Student";
import ValidationException from "../../../../src/domain/exception/ValidationException";
import ValueObject from "../../../../src/domain/vo/ValueObject";

describe("Student entity tests", () => {
  test("It should create a new student", () => {
    // given
    const expectedName = "John";
    const expectedSurname = "Doe";
    const expectedEmail = "johndoe@mail.com";

    // when
    const student = Student.newStudent(expectedName, expectedSurname, expectedEmail);

    // then
    expect(student).toBeDefined();
    expect(student.pk).toBe(ValueObject.normalizeString(`${expectedName} ${expectedSurname}`));
    expect(student.sk).toBeDefined();
    expect(student.id).toBeDefined();
    expect(student.name).toBe(expectedName);
    expect(student.surname).toBe(expectedSurname);
    expect(student.email).toBe(expectedEmail);
    expect(student.creationDate).toBeDefined();
  });

  test("It shouldn't create student without any required attribute", () => {
    // given
    const expectedName = "John";
    const expectedSurname = "Doe";

    // when
    expect(() => {
      Student.newStudent(expectedName, expectedSurname, undefined);
    }).toThrow(ValidationException);
  });
});
