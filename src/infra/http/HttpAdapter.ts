import express from "express";
import bodyParser from "body-parser";
import Http from "./Http";
import HttpResponse from "./HttpResponse";

export default class HttpAdapter implements Http {
  private app: any;

  constructor() {
    this.app = express();
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
    this.app.all('*', (req: any, res: any, next: any) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, HEAD, DELETE, OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type, x-access-token');
      next();
    })
  }

  on(url: string, method: string, fn: any): void {
    this.app[method](url, async (req: any, res: any) => {
      // console.log(req.body)
      const response: HttpResponse = await fn(req.params, req.body, req.query, req.headers);
      return res
        .status(response.statusCode)
        .json({ data: response.data, metadata: response.metadata, error: response.error });
    });
  }

  listen(port: number): void {
    this.app.listen(port, () => console.info(`[INFO] Server listening on ${port}`));
  }
}
