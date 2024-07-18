import { readFile } from "fs/promises";
import { IncomingMessage, ServerResponse } from "http";
import { endPromise } from "./promises";

export const handler = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const data: Buffer = await readFile("package.json");
    await endPromise.bind(res)(data);
    console.log("File sent");
  } catch (err: any) {
    console.log(`Error: ${err?.message ?? err}`);
    res.statusCode = 500;
    res.end();
  }
};
