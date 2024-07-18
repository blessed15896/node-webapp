import { readFile } from "fs/promises";
import { IncomingMessage, ServerResponse } from "http";

export const handler = (req: IncomingMessage, res: ServerResponse) => {
  readFile("data.json")
    .then((data: Buffer) => res.end(data, () => console.log("File sent")))
    .catch((err: Error) => {
      console.log(`Error: ${err.message}`);
      res.statusCode = 500;
      res.end();
    });
};
