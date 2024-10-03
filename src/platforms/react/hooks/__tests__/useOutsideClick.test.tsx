import { act, renderHook } from "@testing-library/react";
import { useOutsideClick } from "../useOutsideClick";

describe("useOutsideClick", () => {
  it("should close when clicking outside the element", () => {
    const ref = { current: document.createElement("div") };
    const setIsOpen = vi.fn();

    renderHook(() => useOutsideClick(ref, true, setIsOpen));

    act(() => {
      // Simulate a click outside the element
      document.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
      document.dispatchEvent(new MouseEvent("mouseup", { bubbles: true }));
    });

    expect(setIsOpen).toHaveBeenCalledWith(false);
  });

  it("should not close when clicking inside the element", () => {
    const ref = { current: document.createElement("div") };
    const setIsOpen = vi.fn();

    renderHook(() => useOutsideClick(ref, true, setIsOpen));

    act(() => {
      // Simulate a click inside the element
      ref.current.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    });

    expect(setIsOpen).not.toHaveBeenCalled();
  });

  it("should call onOutsideClick callback when clicking outside the element", () => {
    const ref = { current: document.createElement("div") };
    const setIsOpen = vi.fn();
    const onOutsideClick = vi.fn();

    renderHook(() => useOutsideClick(ref, true, setIsOpen, onOutsideClick));

    act(() => {
      // Simulate a click outside the element
      document.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
      document.dispatchEvent(new MouseEvent("mouseup", { bubbles: true }));
    });

    expect(onOutsideClick).toHaveBeenCalled();
  });

  it("should not call onOutsideClick callback when clicking inside the element", () => {
    const ref = { current: document.createElement("div") };
    const setIsOpen = vi.fn();
    const onOutsideClick = vi.fn();

    renderHook(() => useOutsideClick(ref, true, setIsOpen, onOutsideClick));

    act(() => {
      // Simulate a click inside the element
      ref.current.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    });

    expect(onOutsideClick).not.toHaveBeenCalled();
  });

  it("should not close when clicking outside the element if isOpen is false", () => {
    const ref = { current: document.createElement("div") };
    const setIsOpen = vi.fn();

    renderHook(() => useOutsideClick(ref, false, setIsOpen));

    act(() => {
      // Simulate a click outside the element
      document.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    });

    expect(setIsOpen).not.toHaveBeenCalled();
  });
});
