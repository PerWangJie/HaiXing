<template>
  <div :class="{ pagination: isPagination, active: isActive }">
    <el-button
      class="first"
      @click="firstHandle"
      :disabled="firstClick"
    ></el-button>
    <el-button
      class="prev"
      @click="prevHandle"
      :disabled="prevClick"
    ></el-button>
    <div class="page-detail">{{ `${currentSize} / ${totalSize}` }}</div>
    <el-button
      class="next"
      @click="nextHandle"
      :disabled="nextClick"
    ></el-button>
    <el-button
      class="last"
      @click="lastHandle"
      :disabled="lastClick"
    ></el-button>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  Ref,
  ref,
  onMounted,
  getCurrentInstance,
  inject,
  watch,
} from "vue";

export default defineComponent({
  name: "pagination",
  props: {
    currentSize: {
      type: Number,
      default: 1,
    },
    totalSize: {
      type: Number,
      default: 1,
    },
    isPagination: {
      type: Boolean,
      default: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    let _this: any = getCurrentInstance();
    // 回到首页
    let firstClick: Ref<boolean> = ref(true);
    // 回到上一页
    let prevClick: Ref<boolean> = ref(true);
    // 回到下一页
    let nextClick: Ref<boolean> = ref(false);
    // 回到末页
    let lastClick: Ref<boolean> = ref(false);
    let currentSize: any = inject("currentSize");
    let totalSize: any = inject("totalSize");
    // 回到首页
    const firstHandle = () => {
      currentSize.value = 1;
    };
    // 回到上一页
    const prevHandle = () => {
      currentSize.value--;
    };
    // 回到下一页
    const nextHandle = () => {
      currentSize.value++;
    };
    // 回到末页
    const lastHandle = () => {
      currentSize.value = totalSize.value;
    };
    watch(currentSize, (newVal: Number, oldVal: Number) => {
      if (newVal === 1) {
        firstClick.value = true;
        prevClick.value = true;
      } else {
        firstClick.value = false;
        prevClick.value = false;
      }
      if (newVal === totalSize.value) {
        nextClick.value = true;
        lastClick.value = true;
      } else {
        nextClick.value = false;
        lastClick.value = false;
      }
    });
    onMounted(() => {});
    return {
      firstClick,
      prevClick,
      nextClick,
      lastClick,
      firstHandle,
      prevHandle,
      nextHandle,
      lastHandle,
    }
  },
});
</script>

<style lang="scss" scoped>
.pagination {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  position: absolute;
  // top: 20px;
  .el-button {
    width: 40px;
    height: 40px;
    float: left;
    text-align: center;
    transform: rotate(270deg);
    border: none;
    &.first {
      background: url("../assets/img/first.png") no-repeat;
      background-position: 5px 6px;
      background-color: rgb(25, 39, 49);
    }
    &.prev {
      background: url("../assets/img/prev.png") no-repeat;
      background-position: 5px 6px;
      background-color: rgb(25, 39, 49);
    }
    &.next {
      background: url("../assets/img/next.png") no-repeat;
      background-position: 5px 6px;
      background-color: rgb(25, 39, 49);
    }
    &.last {
      background: url("../assets/img/last.png") no-repeat;
      background-position: 5px 6px;
      background-color: rgb(25, 39, 49);
    }
  }
  .page-detail {
    width: 120px;
    height: 40px;
    line-height: 40px;
    color: #FFF;
    background: rgb(25, 39, 49);
    font-size: 16px;
    font-weight: bold;
    border-radius: 4px;
    float: left;
    margin: 0 10px;
  }
  &.active {
    display: block;
    position: relative;
    .el-button {
      width: 100% !important;
      height: 40px;
      background-color: rgb(25, 39, 49);
      float: none !important;
      text-align: center;
      margin: 0 0 10px 0;
      transform: rotate(0deg);
      background-position: 65px 6px;
      border: none;
    }
    .page-detail {
      width: 100% !important;
      height: 40px;
      background: rgb(25, 39, 49);
      line-height: 40px;
      color: #FFF;
      font-size: 16px;
      border-radius: 4px;
      font-weight: bold;
      float: none !important;
      margin: 0 0 10px 0;
    }
  }
}
</style>