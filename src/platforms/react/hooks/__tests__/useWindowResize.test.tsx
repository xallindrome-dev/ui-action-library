import { act, renderHook } from "@testing-library/react";
import { useResize, useWindowResize } from "../useWindowResize";

describe("useWindowResize", () => {
  beforeEach(() => {
    // Set up fake timers
    vi.useFakeTimers();
  });

  afterEach(() => {
    // Clear the fake timers after each test
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it("should update window width on resize", () => {
    const { result } = renderHook(() => useWindowResize());

    act(() => {
      // Simulate a window resize
      window.innerWidth = 800;
      window.dispatchEvent(new Event("resize"));

      vi.advanceTimersByTime(200); // simulate debounce
    });

    expect(result.current).toBe(800);
  });

  it("should handle resize with a custom debounce time", () => {
    const { result } = renderHook(() => useWindowResize(1250, 300));

    act(() => {
      // Simulate a window resize
      window.innerWidth = 1000;
      window.dispatchEvent(new Event("resize"));

      vi.advanceTimersByTime(300); // simulate debounce
    });

    expect(result.current).toBe(1000);
  });
});

describe("useResize", () => {
  it("should call handleResize on mount", () => {
    const handleResize = vi.fn();
    renderHook(() => useResize(handleResize));

    // Verify that handleResize is called on mount
    expect(handleResize).toHaveBeenCalled();
  });
});
