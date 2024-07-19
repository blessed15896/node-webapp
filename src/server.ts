import express, { Express } from "express";
import { basicHandler } from "./handler";
import { createServer } from "http";

const port = 5000;

const expressApp: Express = express();

expressApp.get("/favicon.ico", (req, res) => {
  res.statusCode = 404;
  res.end();
});

expressApp.get("*", basicHandler);

const server = createServer(expressApp);

server.listen(port, () => console.log(`HTTP Server listening on port ${port}`));
