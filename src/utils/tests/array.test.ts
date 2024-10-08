import {
  removeItemInArray,
  uniqueBy,
  updateItemInArray,
} from "../array.helper";

describe("updateItemInArray", () => {
  it("should update an item with matching id in the array", () => {
    const items = [
      { id: 1, name: "Item 1" },
      { id: 2, name: "Item 2" },
    ];
    const payload = { id: 1, name: "Updated Item 1" };
    const updatedItems = updateItemInArray(items, payload);

    expect(updatedItems).toEqual([
      { id: 1, name: "Updated Item 1" },
      { id: 2, name: "Item 2" },
    ]);
  });

  it("should return the original array if no item with matching id is found", () => {
    const items = [
      { id: 1, name: "Item 1" },
      { id: 2, name: "Item 2" },
    ];
    const payload = { id: 3, name: "New Item" };
    const updatedItems = updateItemInArray(items, payload);

    expect(updatedItems).toEqual(items);
  });
});

describe("removeItemInArray", () => {
  it("should remove an item with matching id from the array", () => {
    const items = [
      { id: 1, name: "Item 1" },
      { id: 2, name: "Item 2" },
    ];
    const updatedItems = removeItemInArray(items, 1, "id");

    expect(updatedItems).toEqual([{ id: 2, name: "Item 2" }]);
  });

  it("should return the original array if no item with matching id is found", () => {
    const items = [
      { id: 1, name: "Item 1" },
      { id: 2, name: "Item 2" },
    ];
    const updatedItems = removeItemInArray(items, 3, "id");

    expect(updatedItems).toEqual(items);
  });

  it("should handle an empty array", () => {
    const items: { id: number; name: string }[] = [];
    const updatedItems = removeItemInArray(items, 1, "id");

    expect(updatedItems).toEqual([]);
  });
});

describe("uniqueBy", () => {
  it("should remove duplicates based on the specified property", () => {
    const items = [
      { id: 1, name: "Item 1" },
      { id: 2, name: "Item 2" },
      { id: 3, name: "Item 1" },
    ];
    const uniqueItems = uniqueBy(items, "name");

    expect(uniqueItems).toEqual([
      { id: 1, name: "Item 1" },
      { id: 2, name: "Item 2" },
    ]);
  });

  it("should handle an empty array", () => {
    const items: { id: number; name: string }[] = [];
    const uniqueItems = uniqueBy(items, "name");

    expect(uniqueItems).toEqual([]);
  });

  it("should return the original array if all items are unique", () => {
    const items = [
      { id: 1, name: "Item 1" },
      { id: 2, name: "Item 2" },
      { id: 3, name: "Item 3" },
    ];
    const uniqueItems = uniqueBy(items, "name");

    expect(uniqueItems).toEqual(items);
  });
});
