import { expect, test } from "vitest";
import { InvalidQueryError } from "./errors/invalid-query-error.js";
import { Query } from "./query.js";

test("should parse a valid Query string", () => {
  expect(Query.parse("key1=value1&key2=value2")).toMatchObject({
    pairs: new Map([
      ["key1", "value1"],
      ["key2", "value2"],
    ]),
  });

  expect(Query.parse("key1=value1&key2=value2").toString()).toBe(
    "key1=value1&key2=value2",
  );

  expect(JSON.stringify(Query.parse("key1=value1&key2=value2"))).toBe(
    '"key1=value1&key2=value2"',
  );
});

test("should handle empty query", () => {
  expect(Query.parse("")).toMatchObject({
    pairs: new Map(),
  });
});

test("should handle keys without values", () => {
  expect(Query.parse("key1&key2=value2")).toMatchObject({
    pairs: new Map([
      ["key1", ""],
      ["key2", "value2"],
    ]),
  });

  expect(Query.parse("key1&key2=value2").toString()).toBe("key1&key2=value2");
});

test("should handle percent-encoded characters", () => {
  expect(Query.parse("key=%20value")).toMatchObject({
    pairs: new Map([["key", "%20value"]]),
  });

  expect(Query.parse("key=%20value").toString()).toBe("key=%20value");
});

test("should handle duplicate keys by converting to Set", () => {
  const query = Query.parse("key=value1&key=value2&key=value3");
  expect(query.pairs.get("key")).toEqual(["value1", "value2", "value3"]);
});

test("should handle complex query strings", () => {
  const complexQuery =
    "search=typescript%20guide&category=programming&sort=date&filter=advanced&page=1";
  const query = Query.parse(complexQuery);

  expect(query.pairs.get("search")).toBe("typescript%20guide");
  expect(query.pairs.get("category")).toBe("programming");
  expect(query.pairs.get("sort")).toBe("date");
  expect(query.pairs.get("filter")).toBe("advanced");
  expect(query.pairs.get("page")).toBe("1");
});

test("should parse a valid IRI query", () => {
  expect(Query.parse("쿼리=\uE000", { isIri: true })).toMatchObject({
    pairs: new Map([["쿼리", "\uE000"]]),
  });

  expect(Query.parse("쿼리", { isIri: true }).toString()).toBe("쿼리");
});

test("should throw error for invalid query strings", () => {
  expect(() => Query.parse("invalid<key>=value")).toThrow(InvalidQueryError);
  expect(() => Query.parse("key=invalid<value>")).toThrow(InvalidQueryError);
  expect(() => Query.parse("쿼리")).toThrow(InvalidQueryError);
});
