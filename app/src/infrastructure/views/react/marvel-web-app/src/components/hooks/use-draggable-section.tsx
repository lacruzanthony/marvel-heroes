export const useDraggableSection = (
  scrollRef: React.RefObject<HTMLDivElement>,
) => {
  const onMouseDown = (
    e:
      | React.MouseEvent
      | {
          pageX: 0;
          preventDefault: () => void;
        },
  ) => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    scrollContainer.style.cursor = 'grabbing';
    scrollContainer.style.userSelect = 'none';

    const startX = e.pageX - scrollContainer.offsetLeft;
    const scrollLeft = scrollContainer.scrollLeft;

    const onMouseMove = (e: MouseEvent) => {
      const x = e.pageX - scrollContainer.offsetLeft;
      const walk = (x - startX) * 1;
      scrollContainer.scrollLeft = scrollLeft - walk;
    };

    const onMouseUp = () => {
      scrollContainer.style.cursor = 'grab';
      scrollContainer.style.removeProperty('user-select');
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };
  return { onMouseDown };
};
