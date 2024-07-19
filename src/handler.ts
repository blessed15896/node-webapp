import { IncomingMessage, ServerResponse } from "http";

export const basicHandler = (req: IncomingMessage, res: ServerResponse) => {
  res.setHeader("Content-Type", "text/plain");
  for (let i = 0; i < 10; i++) {
    res.write(`Message: ${i}\n`);
  }
  res.end("End");
};
