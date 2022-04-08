import { GlobalDataProps } from "@/types/store";
import { useStore } from "vuex";

class ComponentOperations {
  private store = useStore<GlobalDataProps>();

  copy(componentId: string) {
    this.store.commit("copyComponent", componentId);
  }

  paste() {
    this.store.commit("pasteComponent");
  }
  setActive(componentId: string) {
    this.store.commit("setActive", componentId);
  }
  delete(componentId: string) {
    this.store.commit("deleteComponent", componentId);
  }
  move(data: { step: number; direction: "Up" | "Down" | "Left" | "Right" }) {
    this.store.commit("moveComponent", data);
  }

  undo() {
    this.store.commit("undo");
  }
  redo() {
    this.store.commit("redo");
  }
}

export default ComponentOperations;
