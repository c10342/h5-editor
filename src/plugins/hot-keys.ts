import useHotKey from "@/hooks/use-hot-key";
import { computed } from "vue";
import { useStore } from "vuex";
import { GlobalDataProps } from "@/types/store";
import { HotkeysEvent, KeyHandler } from "hotkeys-js";
import ComponentOperations from "./operations";

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
  const operations = new ComponentOperations();
  useHotKey("ctrl+c", () => {
    operations.copy(currentComponentId.value);
  });
  useHotKey("ctrl+v", () => {
    operations.paste();
  });
  useHotKey("esc", () => {
    operations.setActive("");
  });
  useHotKey("backspace, delete", () => {
    operations.delete(currentComponentId.value);
  });
  useHotKey(
    "up",
    wrap(() => {
      operations.move({ step: 1, direction: "Up" });
    })
  );
  useHotKey(
    "down",
    wrap(() => {
      operations.move({ step: 1, direction: "Down" });
    })
  );
  useHotKey(
    "left",
    wrap(() => {
      operations.move({ step: 1, direction: "Left" });
    })
  );
  useHotKey(
    "right",
    wrap(() => {
      operations.move({ step: 1, direction: "Right" });
    })
  );

  useHotKey(
    "shift+up",
    wrap(() => {
      operations.move({ step: 10, direction: "Up" });
    })
  );
  useHotKey(
    "shift+down",
    wrap(() => {
      operations.move({ step: 10, direction: "Down" });
    })
  );
  useHotKey(
    "shift+left",
    wrap(() => {
      operations.move({ step: 10, direction: "Left" });
    })
  );
  useHotKey(
    "shift+right",
    wrap(() => {
      operations.move({ step: 10, direction: "Right" });
    })
  );
  useHotKey("ctrl+z", () => {
    operations.undo();
  });
  useHotKey("ctrl+y", () => {
    operations.redo();
  });
}

export default initHotKeys;
