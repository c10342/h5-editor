import useHotKey from "@/hooks/use-hot-key";
import { computed } from "vue";
import { useStore } from "vuex";
import { GlobalDataProps } from "@/types/store";
import { HotkeysEvent, KeyHandler } from "hotkeys-js";

const wrap = (callback: KeyHandler) => {
  const fn = (keyboardEvent: KeyboardEvent, hotkeysEvent: HotkeysEvent) => {
    keyboardEvent.preventDefault();
    callback(keyboardEvent, hotkeysEvent);
  };
  return fn;
};

function initHotKeys() {
  const store = useStore<GlobalDataProps>();
  const currentComponentId = computed(() => store.state.currentComponentId);
  useHotKey("ctrl+c", () => {
    store.commit("copyComponent", currentComponentId.value);
  });
  useHotKey("ctrl+v", () => {
    store.commit("pasteComponent");
  });
  useHotKey("esc", () => {
    store.commit("setActive", "");
  });
  useHotKey("backspace, delete", () => {
    store.commit("deleteComponent", currentComponentId.value);
  });
  useHotKey(
    "up",
    wrap(() => {
      store.commit("moveComponent", { step: 1, direction: "Up" });
    })
  );
  useHotKey(
    "down",
    wrap(() => {
      store.commit("moveComponent", { step: 1, direction: "Down" });
    })
  );
  useHotKey(
    "left",
    wrap(() => {
      store.commit("moveComponent", { step: 1, direction: "Left" });
    })
  );
  useHotKey(
    "right",
    wrap(() => {
      store.commit("moveComponent", { step: 1, direction: "Right" });
    })
  );

  useHotKey(
    "shift+up",
    wrap(() => {
      store.commit("moveComponent", { step: 10, direction: "Up" });
    })
  );
  useHotKey(
    "shift+down",
    wrap(() => {
      store.commit("moveComponent", { step: 10, direction: "Down" });
    })
  );
  useHotKey(
    "shift+left",
    wrap(() => {
      store.commit("moveComponent", { step: 10, direction: "Left" });
    })
  );
  useHotKey(
    "shift+right",
    wrap(() => {
      store.commit("moveComponent", { step: 10, direction: "Right" });
    })
  );
  useHotKey("ctrl+z", () => {
    store.commit("undo");
  });
}

export default initHotKeys;
