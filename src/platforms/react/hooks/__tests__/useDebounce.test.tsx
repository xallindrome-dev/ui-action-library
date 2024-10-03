import { act, renderHook } from "@testing-library/react";
import useDebounce, { debounce } from "../useDebounce";

// Mock setTimeout to control time in tests
vi.useFakeTimers();

describe("useDebounce", () => {
  it("should debounce the value updates", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "initial", delay: 500 },
      }
    );

    // Check initial value
    expect(result.current).toBe("initial");

    // Update value and trigger debounce
    act(() => {
      rerender({ value: "updated", delay: 500 });
      // Fast-forward time
      vi.advanceTimersByTime(400);
    });

    // Value should still be initial as the delay is not passed yet
    expect(result.current).toBe("initial");

    // Fast-forward time to trigger debounce
    act(() => {
      vi.advanceTimersByTime(500);
    });

    // Value should now be updated
    expect(result.current).toBe("updated");
  });

  it("should cancel debounce on unmount", () => {
    const { result, rerender, unmount } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "initial", delay: 500 },
      }
    );

    // Check initial value
    expect(result.current).toBe("initial");

    // Update value and trigger debounce
    act(() => {
      rerender({ value: "updated", delay: 500 });
      // Fast-forward time
      vi.advanceTimersByTime(400);
    });

    // Value should still be initial as the delay is not passed yet
    expect(result.current).toBe("initial");

    // Unmount component
    act(() => {
      unmount();
    });

    // Fast-forward time, should not affect the value as the component is unmounted
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    // Value should still be initial as the component is unmounted
    expect(result.current).toBe("initial");
  });

  it("should debounce the function calls", () => {
    const mockFn = vi.fn();
    const debouncedFn = debounce(mockFn, 500);

    // Call the debounced function multiple times in quick succession
    debouncedFn();
    debouncedFn();
    debouncedFn();

    // Fast-forward time
    vi.advanceTimersByTime(400);

    // Function should not have been called yet
    expect(mockFn).not.toHaveBeenCalled();

    // Fast-forward time to trigger the debounced function
    vi.advanceTimersByTime(1000);

    // Function should be called only once
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
