import { vi } from "vitest";
import { fetchMarsPhotos } from "../../../src/features/explore/api";

test("fetchMarsPhotos returns expected data", async () => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ photos: [{ id: 1 }], length: 1 }),
    })
  );
  const { photos, length } = await fetchMarsPhotos(
    "Curiosity",
    "navcam",
    0,
    "http://localhost"
  );
  expect(photos.length).toBe(1);
  expect(length).toBe(1);
});
