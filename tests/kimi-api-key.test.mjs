import assert from "node:assert/strict";
import test from "node:test";

import { queryKimi } from "../index.js";

const TEST_ENV = "DSH_PLUGINS_TEST_KIMI_KEY";

test("Kimi quota uses the configured API key and adapts usage windows", async () => {
  const originalFetch = globalThis.fetch;
  const originalKey = process.env[TEST_ENV];
  const requests = [];
  process.env[TEST_ENV] = "test-kimi-key";
  globalThis.fetch = async (url, options) => {
    requests.push({ url, options });
    return new Response(
      JSON.stringify({
        user: { membership: { level: "LEVEL_ADVANCED" } },
        limits: [
          {
            window: { duration: 300, timeUnit: "TIME_UNIT_MINUTE" },
            detail: { limit: 100, used: 25, resetTime: "2026-08-25T00:00:00Z" },
          },
        ],
        usage: { limit: 1000, remaining: 700, resetTime: "2026-08-31T00:00:00Z" },
      }),
      { status: 200, headers: { "content-type": "application/json" } },
    );
  };

  try {
    const result = await queryKimi(
      { get: () => undefined },
      { kimiApiKeyEnv: TEST_ENV, kimiBaseUrl: "https://api.kimi.test/coding/v1/" },
      1000,
    );

    assert.deepEqual(result, {
      status: "ok",
      keyConfigured: true,
      error: null,
      plan: "Advanced",
      windows: [
        {
          name: "5h",
          usedPercent: 25,
          resetsAt: "2026-08-25T00:00:00Z",
          limitWindowSeconds: null,
        },
        {
          name: "weekly",
          usedPercent: 30,
          resetsAt: "2026-08-31T00:00:00Z",
          limitWindowSeconds: null,
        },
      ],
    });
    assert.equal(requests.length, 1);
    assert.equal(requests[0].url, "https://api.kimi.test/coding/v1/usages");
    assert.equal(requests[0].options.headers.Authorization, "Bearer test-kimi-key");
  } finally {
    globalThis.fetch = originalFetch;
    if (originalKey === undefined) delete process.env[TEST_ENV];
    else process.env[TEST_ENV] = originalKey;
  }
});

test("Kimi quota reports an invalid configured API key without OAuth fallback", async () => {
  const originalFetch = globalThis.fetch;
  const originalKey = process.env[TEST_ENV];
  process.env[TEST_ENV] = "invalid-test-key";
  globalThis.fetch = async () => new Response("{}", { status: 401 });

  try {
    const result = await queryKimi(
      { get: () => undefined },
      { kimiApiKeyEnv: TEST_ENV, kimiBaseUrl: "https://api.kimi.test/coding/v1" },
      1000,
    );
    assert.deepEqual(result, {
      status: "error",
      keyConfigured: true,
      error: "unauthorized",
      plan: null,
      windows: [],
    });
  } finally {
    globalThis.fetch = originalFetch;
    if (originalKey === undefined) delete process.env[TEST_ENV];
    else process.env[TEST_ENV] = originalKey;
  }
});
