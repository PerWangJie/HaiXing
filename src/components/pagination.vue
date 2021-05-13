<template>
  <div class="pagination-page">
    <el-button @click="firstHandle" :disabled="firstClick">|＜</el-button>
    <el-button @click="prevHandle" :disabled="prevClick">＜</el-button>
    <div class="page-detail">{{ `${currentSize} / ${totalSize}`}}</div>
    <el-button @click="nextHandle" :disabled="nextClick">＞</el-button>
    <el-button @click="lastHandle" :disabled="lastClick">＞|</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, onMounted, getCurrentInstance, inject, watch } from "vue";

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
  },
  setup(props, context) {
    let _this: any = getCurrentInstance()
    // 回到首页
    let firstClick: Ref<boolean> = ref(true)
    // 回到上一页
    let prevClick: Ref<boolean> = ref(true)
    // 回到下一页
    let nextClick: Ref<boolean> = ref(false)
    // 回到末页
    let lastClick: Ref<boolean> = ref(false)
    let currentSize: any = inject('currentSize')
    let totalSize: any = inject('totalSize')
    // 回到首页
    const firstHandle = () => {
      currentSize.value = 1
    }
    // 回到上一页
    const prevHandle = () => { 
      currentSize.value --
    }
    // 回到下一页
    const nextHandle = () => { 
      currentSize.value ++
    }
    // 回到末页
    const lastHandle = () => { 
      currentSize.value = totalSize.value
    }
    watch(currentSize, (newVal:Number, oldVal: Number)=> {
      if(newVal === 1) {
        firstClick.value = true
        prevClick.value = true
      } else {
        firstClick.value = false
        prevClick.value = false
      }
      if(newVal === totalSize.value) {
        nextClick.value = true
        lastClick.value = true
      } else {
        nextClick.value = false
        lastClick.value = false
      }
    })
    onMounted(() => {

    })
    return {
      firstClick,
      prevClick,
      nextClick,
      lastClick,
      firstHandle,
      prevHandle,
      nextHandle,
      lastHandle
    };
  },
});
</script>

<style lang="scss" scoped>
.pagination-page {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  .el-button {
    width: 40px;
    height: 40px;
    box-shadow: 0 0 10px #ccc;
    float: left;
    text-align: center;
  }
  .page-detail {
    width: 120px;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    font-weight: bold;
    box-shadow: 0 0 10px #ccc;
    float: left;
    margin: 0 10px;
  }
}
</style>