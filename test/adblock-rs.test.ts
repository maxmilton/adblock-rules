// REF: https://github.com/brave/adblock-rust/blob/master/js/example.mjs

import { describe, expect, test } from "bun:test";
import { Engine, FilterSet } from "adblock-rs";

describe("FilterSet.intoContentBlocking", () => {
  test("returns undefined when debug=undefined", () => {
    expect.assertions(1);
    const filterSet = new FilterSet();
    filterSet.addFilters("||ads.example.com^");
    // oxlint-disable-next-line typescript/no-confusing-void-expression
    const result = filterSet.intoContentBlocking();
    expect(result).toBeUndefined();
  });

  test("returns undefined when debug=false", () => {
    expect.assertions(1);
    const filterSet = new FilterSet(false);
    filterSet.addFilters("||ads.example.com^");
    // oxlint-disable-next-line typescript/no-confusing-void-expression
    const result = filterSet.intoContentBlocking();
    expect(result).toBeUndefined();
  });

  test("converts network filters to content blocking rules with trigger/action", () => {
    expect.assertions(8);
    const filterSet = new FilterSet(true);
    filterSet.addFilters("||ads.example.com^");
    const result = filterSet.intoContentBlocking();
    expect(result).not.toBeUndefined();
    expect(result.contentBlockingRules).toBeArrayOfSize(2);
    expect(result.contentBlockingRules[0]).toBeObject();
    expect(result.contentBlockingRules[0]).toContainKeys(["trigger", "action"]);
    expect(result.contentBlockingRules[1]).toBeObject();
    expect(result.contentBlockingRules[1]).toContainKeys(["trigger", "action"]);
    expect(result.filtersUsed).toBeArray();
    expect(result.filtersUsed).toContain("||ads.example.com^");
  });
});

describe("Engine.check", () => {
  test("returns boolean when debug option is undefined", () => {
    expect.assertions(3);
    const engine = new Engine(new FilterSet());
    const result = engine.check("http://example.com/x.js", "http://example.com/", "script");
    expect(result).not.toBeUndefined();
    expect(result).toBeBoolean();
    expect(result).not.toBeObject();
  });

  test("returns boolean when debug option is false", () => {
    expect.assertions(3);
    const engine = new Engine(new FilterSet());
    const result = engine.check(
      "http://example.com/x.js",
      "http://example.com/",
      "script",
      null,
      false,
    );
    expect(result).not.toBeUndefined();
    expect(result).toBeBoolean();
    expect(result).not.toBeObject();
  });

  test("returns object when debug option is true", () => {
    expect.assertions(3);
    const engine = new Engine(new FilterSet());
    const result = engine.check(
      "http://example.com/x.js",
      "http://example.com/",
      "script",
      null,
      true,
    );
    expect(result).not.toBeUndefined();
    expect(result).not.toBeBoolean();
    expect(result).toBeObject();
  });

  test("returned object has expected properties when debug option is true", () => {
    expect.assertions(3);
    const engine = new Engine(new FilterSet());
    const result = engine.check(
      "http://example.com/x.js",
      "http://example.com/",
      "script",
      null,
      true,
    );
    expect(result).not.toBeUndefined();
    expect(result).toBeObject();
    expect(result).toContainKeys([
      "filter",
      "exception",
      "important",
      "redirect",
      "rewritten_url",
      "should_block",
    ]);
  });
});
