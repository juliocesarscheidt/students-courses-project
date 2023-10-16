import AbstractRepositoryFactory from "../../domain/factory/AbstractRepositoryFactory";
import CourseRepository from "../../domain/repository/CourseRepository";
import StudentRepository from "../../domain/repository/StudentRepository";
import DynamoDBClientAdapter from "../adapter/DynamoDBClientAdapter";
import CourseRepositoryDynamodb from "../repository/dynamodb/CourseRepositoryDynamodb";
import StudentRepositoryDynamodb from "../repository/dynamodb/StudentRepositoryDynamodb";

export default class RepositoryFactoryDynamodb implements AbstractRepositoryFactory {
  constructor(readonly dynamodbClientAdapter: DynamoDBClientAdapter) {
  }

  createCourseRepository(): CourseRepository {
    return new CourseRepositoryDynamodb(this.dynamodbClientAdapter);
  }

  createStudentRepository(): StudentRepository {
    return new StudentRepositoryDynamodb(this.dynamodbClientAdapter);
  }
}
