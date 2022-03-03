<template>
  <el-collapse class="props-collapse-container">
    <el-collapse-item
      :title="ch.text"
      :name="`item-${idx}`"
      v-for="(ch, idx) in groupList"
      :key="idx"
    >
      <div
        v-for="(item, key) in ch.children"
        :key="key"
        class="prop-item"
        :class="[{ 'no-text': !item.text }, `item-${item.key}`]"
      >
        <span class="label" v-if="item.text">{{ item.text }}</span>
        <div class="prop-component">
          <component
            v-if="item"
            :is="item.component"
            :[item.valueProp]="item.value"
            v-bind="item.extraProps"
            v-on="item.events"
          >
            <template v-if="item.options">
              <component
                :is="item.subComponent"
                v-for="(opt, k) in item.options"
                :key="k"
                v-bind="opt"
              >
                <RenderVNode v-if="opt.showText" :vNode="opt.showText" />
              </component>
            </template>
          </component>
        </div>
      </div>
    </el-collapse-item>
  </el-collapse>
</template>

<script lang="ts">
import { computed, defineComponent, VNode } from "vue";
import { useStore } from "vuex";
import { GlobalDataProps } from "@/types/store";
import { reduce } from "lodash-es";
import { mapPropsToForms } from "@/props-map";
import ColorPicker from "../components/color-picker.vue";
import ImageProcess from "../components/image-process.vue";
import IconSwitch from "../components/icon-switch.vue";
import ShadowPicker from "../components/shadow-picker.vue";

interface FormProps {
  // 渲染的组件名称
  component: string;
  // 子组件
  subComponent?: string;
  // 绑定的值
  value: string;
  // 组件的属性
  extraProps?: { [key: string]: any };
  // label标签
  text: string;
  // 子组件参数
  options?: { text: string | VNode; value: any }[];
  // 绑定值的key
  valueProp?: string;
  // 需要绑定的事件名称
  eventName?: string;
  events: {
    [key: string]: (e: any) => void;
  };
}

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
  components: { ColorPicker, ImageProcess, IconSwitch, ShadowPicker },
  setup() {
    const store = useStore<GlobalDataProps>();
    const propsList = computed(() => {
      const componentProps = store.getters.currentComponent?.props ?? {};
      return reduce(
        componentProps,
        (result, value, key) => {
          const item = (mapPropsToForms as any)[key];
          if (item) {
            const {
              valueProp = "model-value",
              initalTransform,
              afterTransform,
              eventName = "change",
            } = item;
            const newItem: FormProps = {
              key,
              ...item,
              value: initalTransform ? initalTransform(value) : value,
              valueProp,
              eventName,
              events: {
                [eventName]: (e: any) => {
                  const finalValue = afterTransform ? afterTransform(e) : e;
                  // 更新组件
                  store.commit("updateComponent", {
                    key,
                    value: finalValue,
                  });
                },
              },
            };

            result[key] = newItem;
          }
          return result;
        },
        {} as { [key: string]: FormProps }
      );
    });
    const groupList = computed(() => {
      const list = defaultEditGroups.map((item) => {
        const children = item.items
          .map((subItem) => {
            return propsList.value[subItem] ?? null;
          })
          .filter((item) => Boolean(item));
        return {
          text: item.text,
          children,
        };
      });
      return [...list];
    });
    return {
      groupList,
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
.prop-item {
  display: flex;
  margin-bottom: 10px;
  flex-direction: row;
  &.no-text {
    display: inline-block;
  }
  .label {
    width: 28%;
  }
  .prop-component {
    width: 70%;
  }

  &.item-fontWeight {
    margin-left: 28%;
  }
  &.item-fontStyle {
    margin: 0 3px;
  }
  &.item-boxShadow {
    .prop-component {
      width: 100%;
    }
  }
  &.item-imageSrc {
    .prop-component {
      width: 100%;
    }
  }

  :deep(.el-input-number) {
    .el-input-number__decrease,
    .el-input-number__increase {
      top: 2px;
    }
  }
}
</style>
