import ValueObject from "../../../../../src/domain/vo/ValueObject";
import CreateStudentInputDto from "../../../../../src/application/dto/student/CreateStudentInputDto";
import CreateStudentUsecase from "../../../../../src/application/usecase/student/CreateStudentUsecase";
import GetStudentUsecase from "../../../../../src/application/usecase/student/GetStudentUsecase";
import StudentRepositoryMemory from "../../../../../src/infra/repository/memory/StudentRepositoryMemory";
import GetStudentInputDto from "../../../../../src/application/dto/student/GetStudentInputDto";
import NotFoundException from "../../../../../src/domain/exception/NotFoundException";

describe("GetStudentUsecase usecase tests", () => {
  test("It should retrieve an existing student", async () => {
    // given
    const expectedName = "John";
    const expectedSurname = "Doe";
    const expectedEmail = "johndoe@mail.com";

    const repository = new StudentRepositoryMemory();
    const createStudentUsecase = new CreateStudentUsecase(repository);
    const getStudentUsecase = new GetStudentUsecase(repository);

    // when
    const input = new CreateStudentInputDto(expectedName, expectedSurname, expectedEmail);
    const output = await createStudentUsecase.Execute(input);

    const student = await getStudentUsecase.Execute(new GetStudentInputDto(output.pk));

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

  test("It shouldn't retrieve a non existing student", async () => {
    // given
    const repository = new StudentRepositoryMemory();
    const getStudentUsecase = new GetStudentUsecase(repository);

    // when

    // then
    try {
      await getStudentUsecase.Execute(new GetStudentInputDto("johndoe"));
      expect(true).toBe(false);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });
});
