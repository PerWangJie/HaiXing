
import { http } from "./http";

declare module 'vue/types/vue' {
  interface Vue {
    $http: http;
  }
}