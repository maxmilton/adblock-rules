// REF: https://github.com/brave/adblock-rust/blob/master/js/example.mjs

import { beforeAll, describe, expect, test } from "bun:test";
import { Engine, FilterSet } from "adblock-rs";

import mmMobileList from "../lists/mm-mobile.txt" with { type: "text" };
import mmWorkstationList from "../lists/mm-workstation.txt" with { type: "text" };

// import mmDevelopmentList from "../lists/mm-development.txt" with { type: "text" };
// import optionalList from "../lists/optional.txt" with { type: "text" };

describe("mm-mobile.txt", () => {
  let engine: Engine;

  beforeAll(() => {
    const filterSet = new FilterSet(true);
    filterSet.addFilters(mmMobileList);
    engine = new Engine(filterSet);
  });

  test("blocks font request", () => {
    expect.assertions(1);
    const result = engine.check("http://example.com/test.woff", "http://example.com/", "font");
    expect(result).toBeTrue();
  });

  test("blocks media request", () => {
    expect.assertions(1);
    const result = engine.check("http://example.com/test.mp4", "http://example.com/", "media");
    expect(result).toBeTrue();
  });
});

describe("mm-workstation.txt", () => {
  let engine: Engine;

  beforeAll(() => {
    const filterSet = new FilterSet(true);
    filterSet.addFilters(mmWorkstationList);
    engine = new Engine(filterSet);
  });

  test("blocks font request", () => {
    expect.assertions(1);
    const result = engine.check("http://example.com/test.woff", "http://example.com/", "font");
    expect(result).toBeTrue();
  });

  test("blocks media request", () => {
    expect.assertions(1);
    const result = engine.check("http://example.com/test.mp4", "http://example.com/", "media");
    expect(result).toBeTrue();
  });
});

// describe("mm-development.txt", () => {
//   let engine: Engine;

//   beforeAll(() => {
//     const filterSet = new FilterSet(true);
//     filterSet.addFilters(mmWorkstationList); // intended to be used together
//     filterSet.addFilters(mmDevelopmentList);
//     engine = new Engine(filterSet);
//   });
// });

// describe("mm-optional.txt", () => {
//   let engine: Engine;

//   beforeAll(() => {
//     const filterSet = new FilterSet(true);
//     filterSet.addFilters(optionalList);
//     engine = new Engine(filterSet);
//   });
// });
