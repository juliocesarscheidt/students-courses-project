import { ConditionalCheckFailedException } from "@aws-sdk/client-dynamodb";
import Course from "../../domain/entity/Course";
import CourseRepository from "../../domain/repository/CourseRepository";
import DynamoDBClientAdapter from "../adapter/DynamoDBClientAdapter";
import CourseAlreadyExistsException from "../../domain/exception/CourseAlreadyExistsException";
import NotFoundException from "../../domain/exception/NotFoundException";

export default class CourseRepositoryDynamodb implements CourseRepository {
  coursesTableName: string = "Courses";
  studentsTableName: string = "Students";

  constructor(readonly dynamodbClientAdapter: DynamoDBClientAdapter) {
  }

  async createCourse(
    name: string,
    price: number,
    area: string,
    subArea: string,
    author: string,
    quantityClasses: number
  ): Promise<Course> {
    const course = Course.newCourse(name, price, area, subArea, author, quantityClasses);
    try {
      await this.dynamodbClientAdapter.put("pk", course, this.coursesTableName);
      return course;
    } catch (e: any) {
      if (e instanceof ConditionalCheckFailedException) {
        throw new CourseAlreadyExistsException();
      }
      throw new Error("Error creating course");
    }
  }

  async getCourse(coursePk: string): Promise<Course | null> {
    const courses = await this.dynamodbClientAdapter.query({ "pk": coursePk }, this.coursesTableName);
    if (!courses || courses.length === 0) {
      throw new NotFoundException("Course not found");
    }
    return Course.mapFrom(courses[0]);
  }

  async listCourseByArea(area: string): Promise<Course[] | null> {
    const courses = await this.dynamodbClientAdapter.query({ "area": area }, this.coursesTableName, "area-index");
    if (!courses || courses.length === 0) {
      return null;
    }
    return courses?.map((course: any) => Course.mapFrom(course));
  }

  async subscribeStudentToCourse(
    coursePk: string,
    studentPk: string
  ): Promise<Course> {
    const courses = await this.dynamodbClientAdapter.query({ "pk": coursePk }, this.coursesTableName);
    if (!courses || courses.length === 0) {
      throw new NotFoundException("Course not found");
    }

    const students = await this.dynamodbClientAdapter.query({ "pk": studentPk }, this.studentsTableName);
    if (!students || students.length === 0) {
      throw new NotFoundException("Student not found");
    }

    const course = Course.mapFrom(courses[0]);
    course.subscribeStudent(studentPk);

    await this.dynamodbClientAdapter.update({ "pk": course.pk, "sk": course.sk },
      { students: course.students }, this.coursesTableName);
    return course;
  }
}
