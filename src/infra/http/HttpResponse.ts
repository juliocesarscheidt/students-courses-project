export default class HttpResponse {
  statusCode: number;
  data: any;
  metadata: any;
  error?: any;

  constructor({ statusCode, data, metadata, error }: {
    statusCode: number,
    data: any,
    metadata: any,
    error?: any
  }) {
    this.statusCode = statusCode;
    this.data = data;
    this.metadata = metadata;
    this.error = error;
  }
}
