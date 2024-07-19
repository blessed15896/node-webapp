import express, { Express } from "express";
import { createServer } from "http";
import { readHandler } from "./readHandler";

const port = 5000;
const expressApp: Express = express();

expressApp.post("/read", readHandler);

expressApp.get("/sendcity", (req, res) =>
  res.sendFile("city.png", { root: "static" })
);

expressApp.get("/downloadcity", (req, res) => res.download("static/city.png"));

expressApp.use(express.static("static"));
expressApp.use(express.static("node_modules/bootstrap/dist"));

const server = createServer(expressApp);
server.listen(port, () => console.log(`HTTP Server listening on port ${port}`));
