import { PluginObject } from 'vue';
import BaseCard from './Card.vue';
import BaseItemGroup from './ItemGroup.vue';
import BaseHoverButton from './HoverButton.vue';
import BaseItem from './Item.vue';

export const BaseComponentsPlugin: PluginObject<void> = {
  install(Vue) {
    Vue.component(BaseCard.name, BaseCard);
    Vue.component(BaseItemGroup.name, BaseItemGroup);
    Vue.component(BaseHoverButton.name, BaseHoverButton);
    Vue.component(BaseItem.name, BaseItem);
  },
};
