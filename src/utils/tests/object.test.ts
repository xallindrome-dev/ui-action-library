// getObjDeepValue.test.ts
import type { KeyObjectDef } from "../../types";
import { getObjDeepValue, groupValues } from "../object.helper";

describe("getObjDeepValue", () => {
  const objectInstance = {
    a: {
      b: {
        c: 42,
      },
    },
    x: {
      y: {
        z: "hello",
      },
    },
  };

  it("should retrieve the deep value when the key path exists", () => {
    const value = getObjDeepValue(objectInstance, "a.b.c");
    expect(value).toBe(42);

    const valueString = getObjDeepValue(objectInstance, "x.y.z");
    expect(valueString).toBe("hello");
  });

  it("should return undefined when the key path does not exist", () => {
    const value = getObjDeepValue(objectInstance, "a.b.d");
    expect(value).toBeUndefined();

    const valueInvalid = getObjDeepValue(objectInstance, "x.y.a");
    expect(valueInvalid).toBeUndefined();
  });

  it("should handle cases where the key is an empty string", () => {
    const value = getObjDeepValue(objectInstance, "");
    expect(value).toEqual(objectInstance);
  });

  it("should return undefined when object is empty", () => {
    const emptyObject = {};
    const value = getObjDeepValue(emptyObject, "a.b.c");
    expect(value).toBeUndefined();
  });

  it("should handle edge cases with complex paths", () => {
    const complexObject = {
      a: {
        b: {
          c: {
            d: {
              e: {
                f: 100,
              },
            },
          },
        },
      },
    };
    const value = getObjDeepValue(complexObject, "a.b.c.d.e.f");
    expect(value).toBe(100);
  });
});

describe("groupValues", () => {
  it("should group objects by a specified key", () => {
    const list: KeyObjectDef[] = [
      { category: "fruit", name: "apple" },
      { category: "fruit", name: "banana" },
      { category: "vegetable", name: "carrot" },
    ];
    const result = groupValues(list, "category");

    expect(result).toEqual({
      fruit: [
        { category: "fruit", name: "apple" },
        { category: "fruit", name: "banana" },
      ],
      vegetable: [{ category: "vegetable", name: "carrot" }],
    });
  });

  it("should return an empty object for an empty list", () => {
    const list: KeyObjectDef[] = [];
    const result = groupValues(list, "category");

    expect(result).toEqual({});
  });

  it("should handle cases where some objects do not contain the specified key", () => {
    const list: KeyObjectDef[] = [
      { category: "fruit", name: "apple" },
      { name: "banana" },
      { category: "vegetable", name: "carrot" },
    ];
    const result = groupValues(list, "category");

    expect(result).toEqual({
      fruit: [{ category: "fruit", name: "apple" }],
      undefined: [{ name: "banana" }],
      vegetable: [{ category: "vegetable", name: "carrot" }],
    });
  });

  it("should handle cases where all objects have the same key value", () => {
    const list: KeyObjectDef[] = [
      { category: "fruit", name: "apple" },
      { category: "fruit", name: "banana" },
      { category: "fruit", name: "cherry" },
    ];
    const result = groupValues(list, "category");

    expect(result).toEqual({
      fruit: [
        { category: "fruit", name: "apple" },
        { category: "fruit", name: "banana" },
        { category: "fruit", name: "cherry" },
      ],
    });
  });

  it("should handle cases where each object has a unique key value", () => {
    const list: KeyObjectDef[] = [
      { id: "1", value: "a" },
      { id: "2", value: "b" },
      { id: "3", value: "c" },
    ];
    const result = groupValues(list, "id");

    expect(result).toEqual({
      "1": [{ id: "1", value: "a" }],
      "2": [{ id: "2", value: "b" }],
      "3": [{ id: "3", value: "c" }],
    });
  });
});
