import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import useActive from "../useActive";

describe("useActive", () => {
  it("returns true when the link matches the current pathname", () => {
    const TestComponent = () => {
      const isActive = useActive("/home");
      return <div>{isActive ? "Active" : "Not Active"}</div>;
    };

    const { getByText } = render(
      <MemoryRouter initialEntries={["/home"]}>
        <TestComponent />
      </MemoryRouter>
    );

    expect(getByText("Active")).toBeTruthy();
  });

  it("returns true when the link is a subpath of the current pathname", () => {
    const TestComponent = () => {
      const isActive = useActive("/home");
      return <div>{isActive ? "Active" : "Not Active"}</div>;
    };

    const { getByText } = render(
      <MemoryRouter initialEntries={["/home/products"]}>
        <TestComponent />
      </MemoryRouter>
    );

    expect(getByText("Active")).toBeTruthy();
  });

  it("returns false when the link does not match the current pathname", () => {
    const TestComponent = () => {
      const isActive = useActive("/home/products");
      return <div>{isActive ? "Active" : "Not Active"}</div>;
    };

    const { getByText } = render(
      <MemoryRouter initialEntries={["/home"]}>
        <TestComponent />
      </MemoryRouter>
    );

    expect(getByText("Not Active")).toBeTruthy();
  });
});
