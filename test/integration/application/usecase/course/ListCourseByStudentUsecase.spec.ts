import CreateStudentInputDto from "../../../../../src/application/dto/student/CreateStudentInputDto";
import CreateCourseInputDto from "../../../../../src/application/dto/course/CreateCourseInputDto";
import CreateStudentUsecase from "../../../../../src/application/usecase/student/CreateStudentUsecase";
import CreateCourseUsecase from "../../../../../src/application/usecase/course/CreateCourseUsecase";
import ListCourseByStudentUsecase from "../../../../../src/application/usecase/course/ListCourseByStudentUsecase";
import SubscribeStudentToCourseUsecase from "../../../../../src/application/usecase/course/SubscribeStudentToCourseUsecase";
import CourseRepositoryMemory from "../../../../../src/infra/repository/memory/CourseRepositoryMemory";
import StudentRepositoryMemory from "../../../../../src/infra/repository/memory/StudentRepositoryMemory";
import SubscribeStudentToCourseInputDto from "../../../../../src/application/dto/course/SubscribeStudentToCourseInputDto";
import ListCourseByStudentInputDto from "../../../../../src/application/dto/course/ListCourseByStudentInputDto";
import ValueObject from "../../../../../src/domain/vo/ValueObject";

describe("ListCourseByStudentUsecase usecase tests", () => {
  test("It should retrieve an existing course by student", async () => {
    // given
    const expectedCourseName = "Course 1";
    const expectedPrice = 100.00;
    const expectedArea = "Technology";
    const expectedSubArea = "Cloud Computing";
    const expectedAuthor = "John Doe";
    const expectedQuantityClasses = 50;

    const expectedName = "John";
    const expectedSurname = "Doe";
    const expectedEmail = "johndoe@mail.com";

    const courseRepository = new CourseRepositoryMemory();
    const studentRepository = new StudentRepositoryMemory();

    const createCourseUsecase = new CreateCourseUsecase(courseRepository);
    const listCourseByStudentUsecase = new ListCourseByStudentUsecase(courseRepository);
    const createStudentUsecase = new CreateStudentUsecase(studentRepository);
    const subscribeStudentToCourseUsecase = new SubscribeStudentToCourseUsecase(courseRepository, studentRepository);

    // when
    const inputCourse = new CreateCourseInputDto(expectedCourseName, expectedPrice, expectedArea, expectedSubArea, expectedAuthor, expectedQuantityClasses);
    const course = await createCourseUsecase.Execute(inputCourse);

    const inputStudent = new CreateStudentInputDto(expectedName, expectedSurname, expectedEmail);
    const student = await createStudentUsecase.Execute(inputStudent);

    await subscribeStudentToCourseUsecase.Execute(new SubscribeStudentToCourseInputDto(course.pk, student.pk));

    const courses = await listCourseByStudentUsecase.Execute(new ListCourseByStudentInputDto(student.pk));

    // then
    expect(courses).toBeDefined();
    expect(courses.length).toBe(1);

    const [courseByStudent] = courses;
    expect(courseByStudent.pk).toBe(ValueObject.normalizeString(expectedCourseName));
    expect(courseByStudent.sk).toBeDefined();
    expect(courseByStudent.id).toBeDefined();
    expect(courseByStudent.name).toBe(expectedCourseName);
    expect(courseByStudent.price).toBe(expectedPrice);
    expect(courseByStudent.area).toBe(expectedArea);
    expect(courseByStudent.subArea).toBe(expectedSubArea);
    expect(courseByStudent.author).toBe(expectedAuthor);
    expect(courseByStudent.quantityClasses).toBe(expectedQuantityClasses);
    expect(courseByStudent.students.length).toBe(1);
    expect(courseByStudent.students[0]).toBe(student.pk);
    expect(courseByStudent.creationDate).toBeDefined();
  });
});
