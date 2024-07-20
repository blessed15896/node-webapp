import { test } from "node:test";
import { readHandler } from "./readHandler";
import { equal } from "node:assert";
import fs from "node:fs/promises";

const createMockResponse = (testCtx) => ({
  writeHead: testCtx.mock.fn(),
  setHeader: testCtx.mock.fn(),
  write: testCtx.mock.fn(),
  end: testCtx.mock.fn(),
});

test("readHandler tests", async (testCtx) => {
  const req = {};

  await testCtx.test("Successfully reads file", async (innerCtx) => {
    // Arrange
    const data = "json-data";
    innerCtx.mock.method(fs, "readFile", async () => data);
    const res = createMockResponse(innerCtx);

    // Act
    await readHandler(req, res);

    // Assert
    equal(res.setHeader.mock.calls[0].arguments[0], "Content-Type");
    equal(res.setHeader.mock.calls[0].arguments[1], "application/json");
    equal(res.write.mock.calls[0].arguments[0], data);
    equal(res.end.mock.callCount(), 1);
  });

  await testCtx.test("Handles error reading file", async (innerCtx) => {
    // Arrange
    innerCtx.mock.method(fs, "readFile", () => Promise.reject("file error"));
    const res = createMockResponse(innerCtx);

    // Act
    await readHandler(req, res);

    // Assert
    equal(res.writeHead.mock.calls[0].arguments[0], 500);
    equal(res.end.mock.callCount(), 1);
  });
});
