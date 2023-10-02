import HttpResponse from "./HttpResponse";

export default class HttpResponseBuilder {
  data: any | undefined;
  metadata: any | undefined;
  error?: any | undefined;

  constructor(readonly statusCode: number) {
  }

  public build(): HttpResponse {
    const response = new HttpResponse(this);
    return response;
  }

  setData(data: any) {
    this.data = data;
    return this;
  }

  setMetadata(metadata: any) {
    this.metadata = metadata;
    return this;
  }

  setError(error: any) {
    this.error = error;
    return this;
  }
}
