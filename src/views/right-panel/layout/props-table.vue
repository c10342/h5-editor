<template>
  <div class="props-table">
    <template v-if="currentComponent">
      <template v-if="!isLocked">
        <div
          v-for="(item, key) in propsList"
          :key="key"
          class="prop-item"
          :class="{ 'no-text': !item.text }"
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
                  <RenderVNode :vNode="opt.showText" />
                </component>
              </template>
            </component>
          </div>
        </div>
      </template>
      <template v-else>
        <el-empty description="该元素被锁定，无法编辑"></el-empty>
      </template>
    </template>

    <el-empty v-else description="在画布中选择元素并开始编辑"></el-empty>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, VNode } from "vue";
import { useStore } from "vuex";
import { reduce } from "lodash-es";
import { GlobalDataProps } from "@/types/store";
import { mapPropsToForms } from "@/props-map";
import ColorPicker from "../components/color-picker.vue";
import ImageProcess from "../components/image-process.vue";

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
  components: { ColorPicker, ImageProcess },
  setup(props, context) {
    const store = useStore<GlobalDataProps>();
    const currentComponent = computed(() => {
      return store.getters.currentComponent;
    });
    // 生成需要渲染的组件数据
    const propsList = computed(() => {
      const componentProps = currentComponent.value?.props ?? {};
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

    const isLocked = computed(() => {
      return currentComponent.value?.isLocked;
    });

    return { propsList, isLocked, currentComponent };
  },
});
</script>

<style lang="scss" scoped>
.props-table {
  .prop-item {
    display: flex;
    margin-bottom: 10px;
    flex-direction: row;
    width: 100%;
    &.no-text {
      .prop-component {
        width: 100%;
      }
    }
    .label {
      width: 28%;
    }
    .prop-component {
      width: 70%;
    }

    :deep(.el-input-number) {
      .el-input-number__decrease,
      .el-input-number__increase {
        top: 2px;
      }
    }
  }
}
</style>
