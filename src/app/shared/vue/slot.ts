/* eslint-disable no-param-reassign */
import { NormalizedScopedSlot, VNode } from 'vue/types/vnode';
import { coerceArray } from '../helpers';

/**
 * Returns VNodes for named slot either scoped or unscoped
 */
export function normalizeSlot(
  names: string | string[],
  scope: Record<string, unknown> = {},
  $scopedSlots: { [key: string]: NormalizedScopedSlot | undefined } = {},
  $slots: { [key: string]: VNode[] | undefined } = {}
): VNode[] | undefined {
  // Ensure names is an array without "falsy" values
  names = coerceArray(names);
  let slot;
  for (let i = 0; i < names.length && !slot; i += 1) {
    const name = names[i];
    slot = $scopedSlots[name] || $slots[name];
  }
  // Note: in Vue 2.6.x, all named slots are also scoped slots
  return typeof slot === 'function' ? slot(scope) : slot;
}
