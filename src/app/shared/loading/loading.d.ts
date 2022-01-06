import { LoadingService } from './loading.service';

declare module 'vue/types/vue' {
  interface Vue {
    $loading: LoadingService;
  }
}
