// getObjDeepValue.test.ts

import { describe, expect, it } from "vitest";
import { getObjDeepValue } from "../object.helper";

describe("getObjDeepValue", () => {
  const sampleObject = {
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
    const value = getObjDeepValue(sampleObject, "a.b.c");
    expect(value).toBe(42);

    const valueString = getObjDeepValue(sampleObject, "x.y.z");
    expect(valueString).toBe("hello");
  });

  it("should return undefined when the key path does not exist", () => {
    const value = getObjDeepValue(sampleObject, "a.b.d");
    expect(value).toBeUndefined();

    const valueInvalid = getObjDeepValue(sampleObject, "x.y.a");
    expect(valueInvalid).toBeUndefined();
  });

  it("should handle cases where the key is an empty string", () => {
    const value = getObjDeepValue(sampleObject, "");
    expect(value).toEqual(sampleObject); // Should return the entire object
  });

  it("should return undefined when object is empty", () => {
    const emptyObject = {};
    const value = getObjDeepValue(emptyObject, "a.b.c");
    expect(value).toBeUndefined();
  });

  it("should handle edge cases with complex paths", () => {
    const complexObject = {
      "a.b": {
        c: {
          "d.e": {
            f: 100,
          },
        },
      },
    };
    const value = getObjDeepValue(complexObject, "a.b.c.d.e.f");
    expect(value).toBe(100);
  });
});
