<template>
  <div class="sopCheck">
    <div class="sopCheck-title"></div>
    <div class="sopCheck-content">
      <div class="sopCheck-image">
        <viewer class="viewer" ref="viewer">
          <img :src="imgUrl" alt="" />
        </viewer>
      </div>
      <div class="sopCheck-pagination">
        <pagination
          :currentSize="currentSize"
          :totalSize="totalSize"
          :isActive="true"
          ref="pagination"
        ></pagination>
        <button class="exit-button" @click="exitHandle">返回</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, provide } from "vue";
import { useRouter } from 'vue-router'
import pagination from "@/components/pagination.vue";
import "viewerjs/dist/viewer.css";
import Viewer from "v-viewer/src/component.vue";

export default defineComponent({
  name: "sopCheck",
  setup() {
    // 定义路由
    const router = useRouter()
    let imgUrl: Ref<any> = require("@/assets/img/bg.png");
    // 当前页码
    let currentSize: Ref<number> = ref(1);
    // 总页码
    let totalSize: Ref<number> = ref(10);
    provide("currentSize", currentSize);
    provide("totalSize", totalSize);
    // 返回工作台
    const exitHandle = () => {
      router.go(-1)
    }
    return {
      imgUrl,
      currentSize,
      totalSize,
      exitHandle
    };
  },
  components: {
    pagination,
    Viewer,
  },
});
</script>

<style lang="scss" scoped>
.sopCheck {
  width: 100%;
  height: 100%;
  background: #000F1A;
  .sopCheck-title {
    width: 100%;
    height: 40px;
    background: rgba(255, 255, 255, 0.1);
  }
  .sopCheck-content {
    width: 100%;
    display: flex;
    flex-direction: row;
    height: calc(100% - 40px);
    .sopCheck-image {
      width: 1720px;
      height: 100%;
      .viewer {
        width: 100%;
        height: 100%;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .sopCheck-pagination {
      background: rgba(255, 255, 255, 0.05);
      height: 100%;
      flex: 1;
      box-shadow: 0px 10px 10px #ccc;
      position: relative;
      padding: 20px;
      .exit-button {
        width: calc(100% - 40px);
        height: 40px;
        border: none;
        outline: none;
        font-size: 17px;
        line-height: 40px;
        color: #FFF;
        background: #237AE4;
        border-radius: 8px;
        position: absolute;
        bottom: 20px;
        left: 20px;
      }
    }
  }
}
.viewer-toolbar > ul > li {
  width: 48px !important;
  height: 48px !important;
}

</style>
