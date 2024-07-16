import { describe, expect, test } from "vitest";
import { photoDummyFrom } from "./photo.dummy";

describe("Photo", () => {
  test("Success", () => {
    const photo = photoDummyFrom();
    expect(photo.albumId).toBe(1);
    expect(photo.id).toBe(1);
    expect(photo.title).toBe("Sample Photo");
    expect(photo.url).toBe("https://via.placeholder.com/600/92c952");
    expect(photo.thumbnailUrl).toBe("https://via.placeholder.com/150/92c952");
  });

  test("Custom properties", () => {
    const photo = photoDummyFrom({ albumId: 2, title: "Custom Photo" });
    expect(photo.albumId).toBe(2);
    expect(photo.id).toBe(1); // Default value
    expect(photo.title).toBe("Custom Photo");
    expect(photo.url).toBe("https://via.placeholder.com/600/92c952"); // Default value
    expect(photo.thumbnailUrl).toBe("https://via.placeholder.com/150/92c952"); // Default value
  });
});
