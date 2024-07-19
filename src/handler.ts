import { IncomingMessage, ServerResponse } from "http";
import { Request, Response } from "express";

export const redirectionHandler = (
  req: IncomingMessage,
  res: ServerResponse
) => {
  res.writeHead(302, { location: "https://localhost:5500" });
  res.end();
};

export const notFoundHandler = (req: Request, res: Response) => {
  res.sendStatus(404);
};

export const newUrlHandler = (req: Request, res: Response) => {
  const msg = req.params.message ?? "(No Message)";
  res.send(`Hello, ${msg}`);
};

export const defaultHandler = (req: Request, res: Response) => {
  if (req.query.keyword) {
    res.send(`Hello, ${req.query.keyword}`);
  } else {
    res.send(`Hello, ${req.protocol.toUpperCase()}`);
  }
};
