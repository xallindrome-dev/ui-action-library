// getObjDeepValue.test.ts

import { describe, expect, it } from "vitest";
import { getObjDeepValue } from "../object.helper";

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
