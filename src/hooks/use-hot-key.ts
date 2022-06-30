import hotkeys, { KeyHandler } from "hotkeys-js";
import { onMounted, onBeforeUnmount } from "vue";

export default function useHotKey(key: string, callBack: KeyHandler) {
  onMounted(() => {
    hotkeys(key, callBack);
  });
  onBeforeUnmount(() => {
    hotkeys.unbind(key, callBack);
  });
}
