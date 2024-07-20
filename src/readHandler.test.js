import { test } from "node:test";
import { readHandler } from "./readHandler";
import { equal } from "node:assert";
import fs from "node:fs";

test("readHandler tests", async (testCtx) => {
  // Arrange
  const data = "json-data";
  testCtx.mock.method(fs, "readFile", (file, cb) => cb(undefined, data));
  const req = {};
  const res = {
    setHeader: testCtx.mock.fn(),
    write: testCtx.mock.fn(),
    end: testCtx.mock.fn(),
  };

  // Act
  await readHandler(req, res);

  // Assert
  equal(res.setHeader.mock.calls[0].arguments[0], "Content-Type");
  equal(res.setHeader.mock.calls[0].arguments[1], "application/json");
  equal(res.write.mock.calls[0].arguments[0], data);
  equal(res.end.mock.callCount(), 1);
});
