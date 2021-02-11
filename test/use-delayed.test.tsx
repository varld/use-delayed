import { useState } from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import delay from 'delay';
import useDelayed from '../src';

describe('use-delayed', () => {
  it('exports', () => {
    expect(typeof useDelayed).toEqual('function');
  });

  it('delays updates', async () => {
    let useTest = () => {
      let [count, setCount] = useState(0);
      let delayedCount = useDelayed(count, 500);

      return {
        count,
        setCount,
        delayedCount
      };
    };

    let { result } = renderHook(() => useTest());

    expect(result.current.count).toBe(0);
    expect(result.current.delayedCount).toBe(0);

    act(() => {
      result.current.setCount(5);
    });

    expect(result.current.count).toBe(5);
    expect(result.current.delayedCount).toBe(0);

    await delay(500);

    expect(result.current.count).toBe(5);
    expect(result.current.delayedCount).toBe(5);
  });

  it('ignores values', async () => {
    let useTest = () => {
      let [count, setCount] = useState(0);
      let delayedCount = useDelayed(count, 500, [5]);

      return {
        count,
        setCount,
        delayedCount
      };
    };

    let { result } = renderHook(() => useTest());

    expect(result.current.count).toBe(0);
    expect(result.current.delayedCount).toBe(0);

    act(() => {
      result.current.setCount(5);
    });

    expect(result.current.count).toBe(5);
    expect(result.current.delayedCount).toBe(5);

    act(() => {
      result.current.setCount(10);
    });

    expect(result.current.count).toBe(10);
    expect(result.current.delayedCount).toBe(5);

    await delay(500);

    expect(result.current.count).toBe(10);
    expect(result.current.delayedCount).toBe(10);
  });
});
