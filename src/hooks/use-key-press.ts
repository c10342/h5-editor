import { onBeforeUnmount, onMounted } from "vue";

const useKeyPress = (key: string, cb: () => any) => {
  const trigger = (event: KeyboardEvent) => {
    if (event.code === key) {
      cb();
    }
  };

  onMounted(() => {
    document.addEventListener("keydown", trigger);
  });

  onBeforeUnmount(() => {
    document.removeEventListener("keydown", trigger);
  });
};

export default useKeyPress;
