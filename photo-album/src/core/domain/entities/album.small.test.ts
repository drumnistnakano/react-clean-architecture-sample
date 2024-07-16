import { describe, expect, test } from "vitest";
import { albumDummyFrom } from "./album.dummy";

describe("Album", () => {
  test("Success", () => {
    const album = albumDummyFrom();
    expect(album.userId).toBe(1);
    expect(album.id).toBe(1);
    expect(album.title).toBe("Sample Album");
  });

  test("Custom properties", () => {
    const album = albumDummyFrom({ userId: 2, title: "Custom Album" });
    expect(album.userId).toBe(2);
    expect(album.id).toBe(1); // Default value
    expect(album.title).toBe("Custom Album");
  });
});
