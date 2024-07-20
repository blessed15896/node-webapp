import express, { Express } from "express";
import { createServer } from "http";
import { readHandler } from "./readHandler";
import httpProxy from "http-proxy";
import cors from "cors";

const port = 5000;
const expressApp: Express = express();
const proxy = httpProxy.createProxyServer({
  target: "http://localhost:5100",
  ws: true,
});
expressApp.use(
  cors({
    origin: "http://localhost:5100", // webpack-dev-server url
  })
);

expressApp.use(express.json());

expressApp.post("/read", readHandler);

expressApp.use(express.static("static"));
expressApp.use(express.static("node_modules/bootstrap/dist"));
expressApp.use((req, res) => proxy.web(req, res));

const server = createServer(expressApp);
server.on("upgrade", (req, socket, head) => proxy.ws(req, socket, head));
server.listen(port, () => console.log(`HTTP Server listening on port ${port}`));
