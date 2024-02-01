import HttpAdapter from "./infra/http/HttpAdapter";
import Router from "./infra/http/Router";
import RepositoryFactoryMemory from "./infra/factory/RepositoryFactoryMemory";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import DynamoDBClientAdapter from "./infra/adapter/DynamoDBClientAdapter";
import RepositoryFactoryDynamodb from "./infra/factory/RepositoryFactoryDynamodb";

const http = new HttpAdapter();

// to execute with in-memory database, default is false
const runInMemory = process.env.IN_MEMORY === "true" || false;

let factory: RepositoryFactoryDynamodb | RepositoryFactoryMemory;

if (runInMemory) {
  factory = new RepositoryFactoryMemory();
} else {
  const dynamodbClient = DynamoDBDocumentClient.from(
    new DynamoDBClient({ region: process.env.AWS_REGION }),
    { marshallOptions: { convertEmptyValues: true,
      removeUndefinedValues: true, convertClassInstanceToMap: true } });
  const dynamodbClientAdapter = new DynamoDBClientAdapter(dynamodbClient);
  factory = new RepositoryFactoryDynamodb(dynamodbClientAdapter);
}

new Router(http, factory);
http.listen(4040);
