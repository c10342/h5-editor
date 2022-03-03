<template>
  <div class="props-table">
    <template v-if="currentComponent">
      <template v-if="!isLocked">
        <PropsList />
      </template>
      <template v-else>
        <el-empty description="该元素被锁定，无法编辑"></el-empty>
      </template>
    </template>

    <el-empty v-else description="在画布中选择元素并开始编辑"></el-empty>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import { GlobalDataProps } from "@/types/store";
import PropsList from "../components/props-list.vue";

export default defineComponent({
  components: { PropsList },
  setup() {
    const store = useStore<GlobalDataProps>();
    const currentComponent = computed(() => {
      return store.getters.currentComponent;
    });

    const isLocked = computed(() => {
      return store.getters.currentComponent?.isLocked;
    });

    return { isLocked, currentComponent };
  },
});
</script>
