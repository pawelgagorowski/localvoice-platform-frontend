/* eslint-disable no-param-reassign */
import { VNode } from 'vue';

/**
 * Create comment node
 *
 * @private
 * @author https://stackoverflow.com/questions/43003976/a-custom-directive-similar-to-v-if-in-vuejs#43543814
 */
export function commentNode(el: HTMLElement, vnode: VNode) {
  const comment = document.createComment(' ');

  Object.defineProperty(comment, 'setAttribute', {
    value: (): void => undefined,
  });

  vnode.text = ' ';
  vnode.elm = comment;
  vnode.isComment = true;
  vnode.tag = undefined;

  vnode.data = vnode.data || {};
  vnode.data.directives = undefined;

  if (vnode.componentInstance) {
    (vnode.componentInstance as any).$el = comment;
  }

  if (el.parentNode) {
    el.parentNode.replaceChild(comment, el);
  }
}
