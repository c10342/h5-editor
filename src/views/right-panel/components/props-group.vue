<template>
  <div
    v-for="(item, key) in list"
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
</template>

<script lang="ts">
import { reduce } from "lodash-es";
import { computed, defineComponent, VNode } from "vue";
import { mapPropsToForms } from "@/props-map";
import ColorPicker from "./color-picker.vue";
import ImageProcess from "./image-process.vue";
import IconSwitch from "./icon-switch.vue";
import ShadowPicker from "./shadow-picker.vue";
import BackgroundProcess from "./background-process.vue";

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

export default defineComponent({
  components: {
    ColorPicker,
    ImageProcess,
    IconSwitch,
    ShadowPicker,
    BackgroundProcess,
  },
  props: {
    propsList: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ["change"],
  setup(props, context) {
    const list = computed(() => {
      return reduce(
        props.propsList,
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
                  context.emit("change", {
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
    return { list };
  },
});
</script>

<style lang="scss" scoped>
.prop-item {
  display: flex;
  margin-bottom: 10px;
  flex-direction: row;
  align-items: center;
  &.no-text {
    display: inline-block;
  }
  .label {
    width: 28%;
    color: #303133;
    font-size: 13px;
    font-weight: 500;
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
  &.item-backgroundImage {
    display: block;
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
