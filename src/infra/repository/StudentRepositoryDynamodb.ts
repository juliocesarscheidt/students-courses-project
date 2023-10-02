import { ConditionalCheckFailedException } from "@aws-sdk/client-dynamodb";
import Student from "../../domain/entity/Student";
import StudentRepository from "../../domain/repository/StudentRepository";
import DynamoDBClientAdapter from "../adapter/DynamoDBClientAdapter";
import StudentAlreadyExistsException from "../../domain/exception/StudentAlreadyExistsException";
import NotFoundException from "../../domain/exception/NotFoundException";

export default class StudentRepositoryDynamodb implements StudentRepository {
  coursesTableName: string = "Courses";
  studentsTableName: string = "Students";

  constructor(readonly dynamodbClientAdapter: DynamoDBClientAdapter) {
  }

  async createStudent(
    name: string,
    surname: string,
    fullName: string,
    email: string,
  ): Promise<Student> {
    const student = Student.newStudent(name, surname, fullName, email);
    try {
      await this.dynamodbClientAdapter.put("pk", student, this.studentsTableName);
      return student;
    } catch (e: any) {
      if (e instanceof ConditionalCheckFailedException) {
        throw new StudentAlreadyExistsException();
      }
      throw new Error("Error creating student");
    }
  }

  async getStudent(studentPk: string): Promise<Student | null> {
    const students = await this.dynamodbClientAdapter.query({ "pk": studentPk }, this.studentsTableName);
    if (!students || students.length === 0) {
      throw new NotFoundException("Student not found");
    }
    return Student.mapFrom(students[0]);
  }
}
