import { ConditionalCheckFailedException } from "@aws-sdk/client-dynamodb";
import Course from "../../domain/entity/Course";
import CourseRepository from "../../domain/repository/CourseRepository";
import DynamoDBClientAdapter from "../adapter/DynamoDBClientAdapter";
import CourseAlreadyExistsException from "../../domain/exception/CourseAlreadyExistsException";
import NotFoundException from "../../domain/exception/NotFoundException";
import { TablesNameMapping } from "./TablesNameMapping";

export default class CourseRepositoryDynamodb implements CourseRepository {

  constructor(readonly dynamodbClientAdapter: DynamoDBClientAdapter) {}

  async createCourse(course: Course): Promise<void> {
    try {
      await this.dynamodbClientAdapter
        .put("pk", course, TablesNameMapping.COURSE_TABLE_NAME);
    } catch (e: any) {
      if (e instanceof ConditionalCheckFailedException) {
        throw new CourseAlreadyExistsException();
      }
      throw new Error("Error creating course");
    }
  }

  async getCourse(coursePk: string): Promise<Course | null> {
    const courses = await this.dynamodbClientAdapter
      .query({ "pk": coursePk }, TablesNameMapping.COURSE_TABLE_NAME);
    if (!courses || courses.length === 0) {
      throw new NotFoundException("Course not found");
    }
    return Course.mapFrom(courses[0]);
  }

  async listCourseByArea(area: string): Promise<Course[] | null> {
    const courses = await this.dynamodbClientAdapter
      .query({ "area": area }, TablesNameMapping.COURSE_TABLE_NAME, "area-index");
    if (!courses || courses.length === 0) {
      return null;
    }
    return courses?.map((course: any) => Course.mapFrom(course));
  }

  async listCourseByStudent(studentPk: string): Promise<Course[] | null> {
    const courses = await this.dynamodbClientAdapter
      .scanWithContainsFilter({ "students": studentPk }, TablesNameMapping.COURSE_TABLE_NAME);
    if (!courses || courses.length === 0) {
      return null;
    }
    return courses?.map((course: any) => Course.mapFrom(course));
  }

  async subscribeStudentToCourse(
    coursePk: string,
    studentPk: string
  ): Promise<Course> {
    const courses = await this.dynamodbClientAdapter
      .query({ "pk": coursePk }, TablesNameMapping.COURSE_TABLE_NAME);
    if (!courses || courses.length === 0) {
      throw new NotFoundException("Course not found");
    }

    const students = await this.dynamodbClientAdapter
      .query({ "pk": studentPk }, TablesNameMapping.STUDENTS_TABLE_NAME);
    if (!students || students.length === 0) {
      throw new NotFoundException("Student not found");
    }

    const course = Course.mapFrom(courses[0]);
    course.subscribeStudent(studentPk);

    await this.dynamodbClientAdapter
      .update({ "pk": course.pk, "sk": course.sk },
      { students: course.students }, TablesNameMapping.COURSE_TABLE_NAME);
    return course;
  }
}
