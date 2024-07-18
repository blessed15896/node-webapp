import { readFile } from "fs/promises";
import { IncomingMessage, ServerResponse } from "http";

export const handler = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const data: Buffer = await readFile("data.json");
    res.end(data, () => console.log("File sent"));
  } catch (err: any) {
    console.log(`Error: ${err?.message ?? err}`);
    res.statusCode = 500;
    res.end();
  }
};
