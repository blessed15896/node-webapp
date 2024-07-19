import { IncomingMessage, ServerResponse } from "http";

export const handler = (req: IncomingMessage, res: ServerResponse) => {
  // console.log(`---- HTTP Method: ${req.method}, URL: ${req.url}`);
  // console.log(`host: ${req.headers.host}`);
  // console.log(`accept: ${req.headers.accept}`);
  // console.log(`user-agent: ${req.headers["user-agent"]}`);
  const parsedURL = new URL(req.url ?? "", `http://${req.headers.host}`);
  console.log(`protocol: ${parsedURL.protocol}`);
  console.log(`hostname: ${parsedURL.hostname}`);
  console.log(`port: ${parsedURL.port}`);
  console.log(`pathname: ${parsedURL.pathname}`);
  parsedURL.searchParams.forEach((val, key) =>
    console.log(`Search param: ${key}: ${val}`)
  );
  res.end("Hello World");
};
