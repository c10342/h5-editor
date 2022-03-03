<template>
  <div class="page-table-container">
    <PropsGroup :propsList="pageProps" @change="onPageDataChange" />
  </div>
</template>

<script lang="ts">
import { GlobalDataProps } from "@/types/store";
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import PropsGroup from "../components/props-group.vue";

export default defineComponent({
  components: { PropsGroup },
  setup() {
    const store = useStore<GlobalDataProps>();
    const pageProps = computed(() => {
      return store.state.page.props;
    });
    const onPageDataChange = (data: any) => {
      store.commit("updatePage", data);
    };
    return { pageProps, onPageDataChange };
  },
});
</script>

<style lang="scss" scoped>
.page-table-container {
  padding: 0 20px;
}
</style>
