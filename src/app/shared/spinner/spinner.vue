<template>
  <span role="progressbar" class="sys-spinner" :style="{ width: `${diameter}px`, height: `${diameter}px` }">
    <div class="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </span>
</template>

<script lang="ts">
import Vue from 'vue';
import { DOCUMENT, platform } from '../helpers/platform';
import { SPINNER_BASE_SIZE_REDUCED, SPINNER_BASE_STROKE_WIDTH } from './types';

const fallbackAnimation = platform.EDGE || platform.TRIDENT;
const styleRoot = DOCUMENT.head;
const diameters = new Set<number>();

type NewType = string;

export default Vue.extend({
  props: {
    diameter: { type: Number, default: SPINNER_BASE_SIZE_REDUCED, validator: (v) => v > 0 },
    strokeWidth: { type: Number },
    rounded: { type: Boolean, default: false },
  },
  computed: {
    circleRadius(): number {
      return (this.diameter - SPINNER_BASE_STROKE_WIDTH) / 2;
    },

    viewBox(): string {
      const viewBox = this.circleRadius * 2 + this.strokeWidth;
      return `0 0 ${viewBox} ${viewBox}`;
    },

    strokeWidthMethod(): number {
      return this.strokeWidth || Math.abs(this.diameter / 10);
    },

    strokeDashOffset(): number {
      if (fallbackAnimation) {
        return this.strokeCircumference * 0.2;
      }
      return null;
    },

    strokeCircumference(): number {
      return 2 * Math.PI * this.circleRadius;
    },

    computedStyles(): Record<string, NewType> {
      return {
        animationName: `sys-spinner-stroke-rotate-${this.diameter}`,
        strokeDashoffset: `${this.strokeDashOffset}px`,
        strokeDasharray: `${this.strokeCircumference}px`,
        strokeWidth: `${this.strokeWidth}%`,
        strokeLinecap: this.rounded ? 'round' : 'butt',
      };
    },
  },

  mounted(): void {
    this.attachStyleNode();

    const animationClass = `sys-spinner${fallbackAnimation ? '-fallback' : ''}-animation`;
    this.$el.classList.add(animationClass);
  },

  updated(): void {
    this.attachStyleNode();
  },

  methods: {
    attachStyleNode() {
      if (diameters.has(this.diameter)) {
        return;
      }

      const styleTag: HTMLStyleElement = DOCUMENT.createElement('style');
      styleTag.setAttribute('sys-spinner-animation', String(this.diameter));
      styleTag.textContent = getAnimationStyles(this.strokeCircumference, this.diameter);
      styleRoot.appendChild(styleTag);
      diameters.add(this.diameter);
    },
  },
});

const ANIMATION_TEMPLATE = `
 @keyframes sys-spinner-stroke-rotate-DIAMETER {
    0%      { stroke-dashoffset: START_VALUE;  transform: rotate(0); }
    12.5%   { stroke-dashoffset: END_VALUE;    transform: rotate(0); }
    12.5001%  { stroke-dashoffset: END_VALUE;    transform: rotateX(180deg) rotate(72.5deg); }
    25%     { stroke-dashoffset: START_VALUE;  transform: rotateX(180deg) rotate(72.5deg); }

    25.0001%   { stroke-dashoffset: START_VALUE;  transform: rotate(270deg); }
    37.5%   { stroke-dashoffset: END_VALUE;    transform: rotate(270deg); }
    37.5001%  { stroke-dashoffset: END_VALUE;    transform: rotateX(180deg) rotate(161.5deg); }
    50%     { stroke-dashoffset: START_VALUE;  transform: rotateX(180deg) rotate(161.5deg); }

    50.0001%  { stroke-dashoffset: START_VALUE;  transform: rotate(180deg); }
    62.5%   { stroke-dashoffset: END_VALUE;    transform: rotate(180deg); }
    62.5001%  { stroke-dashoffset: END_VALUE;    transform: rotateX(180deg) rotate(251.5deg); }
    75%     { stroke-dashoffset: START_VALUE;  transform: rotateX(180deg) rotate(251.5deg); }

    75.0001%  { stroke-dashoffset: START_VALUE;  transform: rotate(90deg); }
    87.5%   { stroke-dashoffset: END_VALUE;    transform: rotate(90deg); }
    87.5001%  { stroke-dashoffset: END_VALUE;    transform: rotateX(180deg) rotate(341.5deg); }
    100%    { stroke-dashoffset: START_VALUE;  transform: rotateX(180deg) rotate(341.5deg); }
  }
`;

function getAnimationStyles(strokeCircumference: number, diameter: number): string {
  return ANIMATION_TEMPLATE.replace(/START_VALUE/g, `${0.95 * strokeCircumference}`)
    .replace(/END_VALUE/g, `${0.2 * strokeCircumference}`)
    .replace(/DIAMETER/g, `${diameter}`);
}
</script>

<style lang="scss">
@import './spinner';
</style>
