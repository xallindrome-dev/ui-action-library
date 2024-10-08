import type { KeyValuePair } from "../../types";
import { convertToQueryString } from "../routing.helper";

describe("convertToQueryString", () => {
  it("should convert an object with key-value pairs to a query string", () => {
    const params: KeyValuePair = { name: "John Doe", age: "30" };
    const result = convertToQueryString(params);
    expect(result).toBe("?name=John%20Doe&age=30");
  });

  it("should return a query string with special characters encoded", () => {
    const params: KeyValuePair = {
      city: "New York",
      "job title": "Software Engineer",
    };
    const result = convertToQueryString(params);
    expect(result).toBe("?city=New%20York&job%20title=Software%20Engineer");
  });

  it('should handle an empty object and return just "?"', () => {
    const params: KeyValuePair = {};
    const result = convertToQueryString(params);
    expect(result).toBe("?");
  });

  it("should handle numbers and booleans correctly by converting them to strings", () => {
    const params: KeyValuePair = { id: 123, active: true };
    const result = convertToQueryString(params);
    expect(result).toBe("?id=123&active=true");
  });

  it("should handle a single key-value pair", () => {
    const params: KeyValuePair = { search: "testing" };
    const result = convertToQueryString(params);
    expect(result).toBe("?search=testing");
  });
});
