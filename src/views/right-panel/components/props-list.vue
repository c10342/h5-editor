<template>
  <el-collapse class="props-collapse-container">
    <el-collapse-item
      :title="ch.text"
      :name="`item-${idx}`"
      v-for="(ch, idx) in groupList"
      :key="idx"
    >
      <PropsGroup :propsList="ch.children" @change="onPropsChange" />
    </el-collapse-item>
  </el-collapse>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import { GlobalDataProps } from "@/types/store";
import PropsGroup from "./props-group.vue";

interface GroupProps {
  text: string;
  items: string[];
}
const defaultEditGroups: GroupProps[] = [
  {
    text: "基本属性",
    items: [
      "text",
      "fontSize",
      "fontFamily",
      "fontWeight",
      "fontStyle",
      "textDecoration",
      "lineHeight",
      "textAlign",
      "color",
      "backgroundColor",
      "imageSrc",
    ],
  },
  {
    text: "尺寸",
    items: [
      "height",
      "width",
      "paddingLeft",
      "paddingRight",
      "paddingTop",
      "paddingBottom",
    ],
  },
  {
    text: "边框",
    items: ["borderStyle", "borderColor", "borderWidth", "borderRadius"],
  },
  {
    text: "阴影与透明度",
    items: ["opacity", "boxShadow"],
  },
  {
    text: "位置",
    items: ["left", "top"],
  },
  {
    text: "事件功能",
    items: ["actionType", "url"],
  },
];

export default defineComponent({
  components: { PropsGroup },
  setup() {
    const store = useStore<GlobalDataProps>();
    const groupList = computed(() => {
      const propsObj = store.getters.currentComponent?.props ?? {};
      const list = defaultEditGroups.map((item) => {
        const children = item.items.reduce((prev, cur) => {
          if (cur in propsObj) {
            prev[cur] = propsObj[cur];
          }
          return prev;
        }, {} as any);
        return {
          text: item.text,
          children,
        };
      });

      return list;
    });
    const onPropsChange = (data: any) => {
      // 更新组件
      store.commit("updateComponent", data);
    };
    return {
      groupList,
      onPropsChange,
    };
  },
});
</script>

<style lang="scss" scoped>
.props-collapse-container {
  :deep(.el-collapse-item__header) {
    padding: 0 20px;
    background-color: #fafafa;
  }
  :deep(.el-collapse-item__content) {
    padding: 0 20px;
    padding-top: 10px;
  }
}
</style>
