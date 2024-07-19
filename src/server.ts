import { createServer } from "http";
import { createServer as createHttpsServer } from "https";
import { readFileSync } from "fs";
import {
  defaultHandler,
  newUrlHandler,
  notFoundHandler,
  redirectionHandler,
} from "./handler";
import express, { Express } from "express";

const port = 5000;

const server = createServer(redirectionHandler);

server.listen(port, () =>
  console.log(`(Event) Server listening on port ${port}`)
);

const httpsPort = 5500;

const expressApp: Express = express();
expressApp.get("/favicon.ico", notFoundHandler);
expressApp.get("/newurl/:message?", newUrlHandler);
expressApp.get("*", defaultHandler);

const httpsServer = createHttpsServer(
  { key: readFileSync("key.pem"), cert: readFileSync("cert.pem") },
  expressApp
);

httpsServer.listen(httpsPort, () =>
  console.log(`HTTPS Server listening on port ${httpsPort}`)
);
