import { onBeforeUnmount, onMounted, Ref } from "vue";

const useClickOutside = (
  elementRef: Ref<null | HTMLElement>,
  cb: () => any
) => {
  const trigger = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target && elementRef.value) {
      if (!elementRef.value.contains(target)) {
        cb();
      }
    }
  };
  onMounted(() => {
    document.addEventListener("click", trigger);
  });
  onBeforeUnmount(() => {
    document.removeEventListener("click", trigger);
  });
};

export default useClickOutside;
