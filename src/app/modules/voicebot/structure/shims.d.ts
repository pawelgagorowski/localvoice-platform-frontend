import { StructureOperation } from './types';

declare module 'vue/types/vue' {
  interface Vue {
    readonly $structureOperation: typeof StructureOperation;
  }
}
