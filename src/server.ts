import { createServer } from "http";
import { createServer as createHttpsServer } from "https";
import { readFileSync } from "fs";
import { handler } from "./handler";

const port = 5000;

const server = createServer(handler);

server.listen(port, () =>
  console.log(`(Event) Server listening on port ${port}`)
);

const httpsPort = 5500;

const httpsServer = createHttpsServer(
  { key: readFileSync("key.pem"), cert: readFileSync("cert.pem") },
  handler
);

httpsServer.listen(httpsPort, () =>
  console.log(`HTTPS Server listening on port ${httpsPort}`)
);
