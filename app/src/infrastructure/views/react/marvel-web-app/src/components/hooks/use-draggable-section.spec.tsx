import { renderHook } from '@testing-library/react-hooks';
import { useDraggableSection } from '../hooks/use-draggable-section';

describe('useDraggableSection', () => {
  it('should return the object with the onMouseDown event handler', () => {
    const scrollRef = {
      current: document.createElement('div'),
    };
    const { result } = renderHook(() =>
      useDraggableSection(scrollRef),
    );
    expect(result.current).toHaveProperty('onMouseDown');
  });

  it('should not change the scroll position when onMouseDown is called', () => {
    const scrollRef = {
      current: document.createElement('div'),
    };
    scrollRef.current.scrollLeft = 0;
    const { result } = renderHook(() =>
      useDraggableSection(scrollRef),
    );
    result.current.onMouseDown({
      pageX: 0,
      preventDefault: () => {},
    });
    expect(scrollRef.current.scrollLeft).toBe(0);
  });
});
