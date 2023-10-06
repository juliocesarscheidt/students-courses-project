
import HttpAdapter from "./infra/http/HttpAdapter";
import Router from "./infra/http/Router";

import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import DynamoDBClientAdapter from "./infra/adapter/DynamoDBClientAdapter";
import RepositoryFactoryDynamodb from "./infra/factory/RepositoryFactoryDynamodb";

const http = new HttpAdapter();

const dynamodbClient = DynamoDBDocumentClient.from(
  new DynamoDBClient({ region: process.env.AWS_REGION }),
  { marshallOptions: { convertEmptyValues: true,
    removeUndefinedValues: true, convertClassInstanceToMap: true } });

const dynamodbClientAdapter = new DynamoDBClientAdapter(dynamodbClient);
const factory = new RepositoryFactoryDynamodb(dynamodbClientAdapter);
new Router(http, factory);

http.listen(4040);
