import { renderHook } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { useIntersectionObserver } from '../useIntersectionObserver';

describe('useIntersectionObserver Hook', () => {
  let observeMock = vi.fn();
  let unobserveMock = vi.fn();
  let disconnectMock = vi.fn();

  beforeEach(() => {
    observeMock = vi.fn();
    unobserveMock = vi.fn();
    disconnectMock = vi.fn();

    // Mock the global IntersectionObserver API for Vitest
    window.IntersectionObserver = vi.fn().mockImplementation(() => ({
      observe: observeMock,
      unobserve: unobserveMock,
      disconnect: disconnectMock,
    })) as unknown as typeof window.IntersectionObserver;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with isIntersecting as false', () => {
    const { result } = renderHook(() => 
      useIntersectionObserver({ root: null, rootMargin: '0px', threshold: 1.0 })
    );

    expect(result.current.isIntersecting).toBe(false);
  });

  it('should attach the observer when the callback ref is called with a DOM node', () => {
    const { result } = renderHook(() => 
      useIntersectionObserver({ root: null, rootMargin: '0px', threshold: 1.0 })
    );

    const mockElement = document.createElement('div');
    
    result.current.targetRef(mockElement);

    expect(window.IntersectionObserver).toHaveBeenCalledTimes(1);
    expect(observeMock).toHaveBeenCalledWith(mockElement);
  });

  it('should disconnect the previous observer if a new node is passed', () => {
    const { result } = renderHook(() => 
      useIntersectionObserver({ root: null, rootMargin: '0px', threshold: 1.0 })
    );

    const mockElement1 = document.createElement('div');
    const mockElement2 = document.createElement('div');

    result.current.targetRef(mockElement1);
    expect(observeMock).toHaveBeenCalledWith(mockElement1);

    result.current.targetRef(mockElement2);
    
    expect(disconnectMock).toHaveBeenCalledTimes(1);
    expect(observeMock).toHaveBeenCalledWith(mockElement2);
  });
});