import { ConditionalCheckFailedException } from "@aws-sdk/client-dynamodb";
import Student from "../../domain/entity/Student";
import StudentRepository from "../../domain/repository/StudentRepository";
import DynamoDBClientAdapter from "../adapter/DynamoDBClientAdapter";
import StudentAlreadyExistsException from "../../domain/exception/StudentAlreadyExistsException";
import NotFoundException from "../../domain/exception/NotFoundException";
import { TablesNameMapping } from "./TablesNameMapping";

export default class StudentRepositoryDynamodb implements StudentRepository {

  constructor(readonly dynamodbClientAdapter: DynamoDBClientAdapter) {}

  async createStudent(student: Student): Promise<void> {
    try {
      await this.dynamodbClientAdapter
        .put("pk", student, TablesNameMapping.STUDENTS_TABLE_NAME);
    } catch (e: any) {
      if (e instanceof ConditionalCheckFailedException) {
        throw new StudentAlreadyExistsException();
      }
      throw new Error("Error creating student");
    }
  }

  async getStudent(studentPk: string): Promise<Student | null> {
    const students = await this.dynamodbClientAdapter
      .query({ "pk": studentPk }, TablesNameMapping.STUDENTS_TABLE_NAME);
    if (!students || students.length === 0) {
      throw new NotFoundException("Student not found");
    }
    return Student.mapFrom(students[0]);
  }
}
