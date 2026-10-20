import { describe, expect, it } from "vitest";
import { earnedXp, parseSolved, totalXp } from "./xp";

const items = [
  { id: "a", xp: 0 },
  { id: "b", xp: 10 },
  { id: "c", xp: 25 },
];

describe("xp", () => {
  it("totals all available xp", () => {
    expect(totalXp(items)).toBe(35);
  });

  it("only counts solved items", () => {
    expect(earnedXp(items, new Set(["b", "c"]))).toBe(35);
    expect(earnedXp(items, new Set(["a"]))).toBe(0);
    expect(earnedXp(items, new Set())).toBe(0);
  });

  it("parses stored ids and drops unknown ones", () => {
    expect(parseSolved('["b","gone",3]', items)).toEqual(new Set(["b"]));
  });

  it("tolerates missing or corrupt storage", () => {
    expect(parseSolved(null, items)).toEqual(new Set());
    expect(parseSolved("{not json", items)).toEqual(new Set());
    expect(parseSolved('{"b":true}', items)).toEqual(new Set());
  });
});
