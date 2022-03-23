import hotkeys, { KeyHandler } from "hotkeys-js";
import { onMounted, onUnmounted } from "vue";

export default function useHotKey(key: string, callBack: KeyHandler) {
  onMounted(() => {
    hotkeys(key, callBack);
  });
  onUnmounted(() => {
    hotkeys.unbind(key, callBack);
  });
}
