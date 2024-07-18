import { IncomingMessage, ServerResponse } from "http";
import { Worker } from "worker_threads";
import { endPromise, writePromise } from "./promises";

const total = 2_000_000_000;
const iterations = 5;
let shared_counter = 0;

export const handler = async (req: IncomingMessage, res: ServerResponse) => {
  const request = shared_counter++;
  const worker = new Worker(__dirname + "/count_worker.js", {
    workerData: {
      iterations,
      total,
      request,
    },
  });
  worker.on("message", async (iter: number) => {
    const msg = `Request: ${request}, Iteration: ${iter}`;
    console.log(msg);
    await writePromise.bind(res)(msg + "\n");
  });
  worker.on("exit", async (code: number) => {
    if (code == 0) await endPromise.bind(res)("Done");
    else {
      res.statusCode = 500;
      await res.end();
    }
  });
  worker.on("error", async (error) => {
    console.log(error);
    res.statusCode = 500;
    await res.end();
  });
};
