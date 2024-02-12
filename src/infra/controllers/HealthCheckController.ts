import HttpResponse from "../http/HttpResponse";
import HttpResponseBuilder from "../http/HttpResponseBuilder";

export default class HealthCheckController {

  constructor() {}

  async getLiveness(params: any): Promise<HttpResponse> {
    const response = { status: "Alive" };
    return new HttpResponseBuilder(200).setData(response).build();
  }

  async getReadiness(params: any): Promise<HttpResponse> {
    const response = { status: "Ready" };
    return new HttpResponseBuilder(200).setData(response).build();
  }
}
