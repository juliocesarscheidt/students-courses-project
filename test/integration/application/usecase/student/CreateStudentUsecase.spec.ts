import ValueObject from "../../../../../src/domain/vo/ValueObject";
import CreateStudentInputDto from "../../../../../src/application/dto/student/CreateStudentInputDto";
import CreateStudentUsecase from "../../../../../src/application/usecase/student/CreateStudentUsecase";
import StudentRepositoryMemory from "../../../../../src/infra/repository/memory/StudentRepositoryMemory";
import StudentAlreadyExistsException from "../../../../../src/domain/exception/StudentAlreadyExistsException";

describe("CreateStudentUsecase usecase tests", () => {
  test("It should create a new student", async () => {
    // given
    const expectedName = "John";
    const expectedSurname = "Doe";
    const expectedEmail = "johndoe@mail.com";

    const createStudentUsecase = new CreateStudentUsecase(new StudentRepositoryMemory());

    // when
    const input = new CreateStudentInputDto(expectedName, expectedSurname, expectedEmail);
    const student = await createStudentUsecase.Execute(input);

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

  test("It shouldn't create a duplicate student", async () => {
    // given
    const expectedName = "John";
    const expectedSurname = "Doe";
    const expectedEmail = "johndoe@mail.com";

    const createStudentUsecase = new CreateStudentUsecase(new StudentRepositoryMemory());

    // when
    const input = new CreateStudentInputDto(expectedName, expectedSurname, expectedEmail);
    await createStudentUsecase.Execute(input);

    // then
    try {
      await createStudentUsecase.Execute(input);
      expect(true).toBe(false);
    } catch (error) {
      expect(error).toBeInstanceOf(StudentAlreadyExistsException);
    }
  });
});
