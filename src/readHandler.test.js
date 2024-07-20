import { test } from "node:test";
import { readHandler } from "./readHandler";
import { equal } from "node:assert";

test("readHandler tests", (testCtx) => {
  // Arrange
  const req = { pipe: testCtx.mock.fn() };
  const res = { cookie: testCtx.mock.fn() };

  // Act
  readHandler(req, res);

  // Assert
  equal(req.pipe.mock.callCount(), 1);
  equal(req.pipe.mock.calls[0].arguments[0], res);
  equal(res.cookie.mock.callCount(), 1);
  equal(res.cookie.mock.calls[0].arguments[0], "sessionID");
  equal(res.cookie.mock.calls[0].arguments[1], "mysecretcode");
});
