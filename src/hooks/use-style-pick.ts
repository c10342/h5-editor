import { pick } from "lodash-es";
import { computed } from "vue";

const useStylePick = (props: any, pickStyles: string[]) => {
  return computed(() => pick(props, pickStyles));
};

export default useStylePick;
