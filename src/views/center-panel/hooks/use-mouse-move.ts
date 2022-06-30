type Callback = (e: MouseEvent) => void;

export default function useMouseMove(
  onMouseMove: Callback,
  onMouseUpFn?: Callback
) {
  const onMouseUp = (event: MouseEvent) => {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
    onMouseUpFn && onMouseUpFn(event);
  };
  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
}
