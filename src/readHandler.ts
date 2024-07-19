import { IncomingMessage, ServerResponse } from "http";
import { Transform } from "stream";

export const readHandler = async (
  req: IncomingMessage,
  res: ServerResponse
) => {
  if (req.headers["content-type"] == "application/json") {
    req.pipe(createFromJsonTransform()).on("data", (payload) => {
      if (payload instanceof Array) {
        res.write(`Received an array with ${payload.length} items`);
      } else {
        res.write("Did not receive an array");
      }
      res.end();
    });
  } else req.pipe(createLowerTransform()).pipe(res);
};

const createLowerTransform = () =>
  new Transform({
    transform(data, encoding, callback) {
      callback(null, data.toString().toLowerCase());
    },
  });

const createFromJsonTransform = () =>
  new Transform({
    readableObjectMode: true,
    transform(data, encoding, callback) {
      callback(null, JSON.parse(data));
    },
  });
