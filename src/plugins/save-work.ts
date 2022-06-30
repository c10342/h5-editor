import { GlobalDataProps } from "@/types/store";
import { onBeforeUnmount, onMounted } from "vue";
import { useStore } from "vuex";

export default function saveWork() {
  const store = useStore<GlobalDataProps>();
  let timer: any = 0;

  function saveWork() {
    if (timer === null) {
      return;
    }
    timer = window.setTimeout(() => {
      if (store.state.isDirty) {
        // 有修改才保存
        store.dispatch("saveWork").then(() => {
          saveWork();
        });
      } else {
        saveWork();
      }
    }, 5000);
  }

  onMounted(() => {
    saveWork();
  });

  onBeforeUnmount(() => {
    clearTimeout(timer);
    timer = null;
  });
}
