import { IncomingMessage, ServerResponse } from "http";

export const handler = (req: IncomingMessage, res: ServerResponse) => {
  console.log(`---- HTTP Method: ${req.method}, URL: ${req.url}`);
  console.log(`host: ${req.headers.host}`);
  console.log(`accept: ${req.headers.accept}`);
  console.log(`user-agent: ${req.headers["user-agent"]}`);
  res.end("Hello World");
};
