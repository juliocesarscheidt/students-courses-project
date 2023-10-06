import { DynamoDBDocumentClient, QueryCommand, PutCommand, UpdateCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";

export default class DynamoDBClientAdapter {

  constructor(public readonly dynamodbClient: DynamoDBDocumentClient) {
  }

  generateDynamoDbExpressions(params: { [key: string]: any }, contains: boolean = false) {
    const expression: string[] = [];
    const expressionAttributeValues: { [key: string]: any } = {};
    const expressionAttributeNames: { [key: string]: any } = {};
    Object.keys(params).map((key) => {
      const placeholder = `:${key}`;
      const alias = `#${key}`;
      if (contains) {
        expression.push(`contains(${alias}, ${placeholder})`);
      } else {
        expression.push(`${alias} = ${placeholder}`);
      }
      expressionAttributeValues[placeholder] = params[key];
      expressionAttributeNames[alias] = key;
    });
    return { expression, expressionAttributeValues, expressionAttributeNames };
  }

  async put(keyName: string, params: { [key: string]: any }, tableName: string): Promise<void> {
    const putCommand = new PutCommand({
      TableName: tableName,
      Item: params,
      ConditionExpression: `attribute_not_exists(${keyName})`,
    });
    await this.dynamodbClient.send(putCommand);
  }

  async update(key: { [key: string]: any }, params: { [key: string]: any }, tableName: string): Promise<any> {
    const { expression, expressionAttributeValues, expressionAttributeNames } =
      this.generateDynamoDbExpressions(params);
    const command = new UpdateCommand({
      TableName: tableName,
      Key: key,
      UpdateExpression: `SET ${expression.join(', ')}`,
      ExpressionAttributeValues: expressionAttributeValues,
      ExpressionAttributeNames: expressionAttributeNames,
      ReturnValues: "ALL_NEW",
    });
    await this.dynamodbClient.send(command);
  }

  async query(params: { [key: string]: any }, tableName: string, indexName: string | undefined = undefined): Promise<any[] | null> {
    const { expression, expressionAttributeValues, expressionAttributeNames } =
      this.generateDynamoDbExpressions(params);
    const queryCommand = new QueryCommand({
      TableName: tableName,
      IndexName: indexName,
      Select: "ALL_ATTRIBUTES",
      KeyConditionExpression: expression.join(' AND '),
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
    });
    const response = await this.dynamodbClient.send(queryCommand);
    return response.Items ?? null;
  }

  async scanWithContainsFilter(params: { [key: string]: any }, tableName: string): Promise<any[] | null> {
    return this.scan(params, tableName, true);
  }

  async scan(params: { [key: string]: any }, tableName: string, contains: boolean = false): Promise<any[] | null> {
    const { expression, expressionAttributeValues, expressionAttributeNames } =
      this.generateDynamoDbExpressions(params, contains);
    const queryCommand = new ScanCommand({
      TableName: tableName,
      Select: "ALL_ATTRIBUTES",
      FilterExpression: expression.join(' AND '),
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
    });
    const response = await this.dynamodbClient.send(queryCommand);
    return response.Items ?? null;
  }
}
