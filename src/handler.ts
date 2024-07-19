import { readFileSync } from "fs";
import { IncomingMessage, ServerResponse } from "http";

export const basicHandler = (req: IncomingMessage, res: ServerResponse) => {
  res.write(readFileSync("static/index.html"));
  res.end();
};
