import { Request, Response } from "express";
import { readFile } from "node:fs";

export const readHandler = async (req: Request, res: Response) => {
  readFile("data.json", (err, data) => {
    if (err != null) res.writeHead(500, err.message);
    else {
      res.setHeader("Content-Type", "application/json");
      res.write(data);
    }
    res.end();
  });
};
