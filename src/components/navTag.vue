// 左边的导航栏
<template>
  <div class="nav">
    <div class="nav-title">
      <img src="@/assets/title.png" alt="">
    </div>
    <div class="nav-menu">
      <el-menu
        default-active="1"
        class="nav-menu-content"
      >
        <el-menu-item v-for="(item, index) in navList" :key="index" :index="index + 1">
          <template #title>{{item.label}}</template>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, reactive } from "vue";

export default defineComponent({
  name: "nav",
  setup() {
    const navList: Array<any> = reactive([
      {label: '产品加工'}, {label: 'SOP查看'},
      {label: '今日任务'}, {label: '产出查询'},
      {label: '设备相关'}, {label: '呼叫记录'},
      {label: '操作日志'},
    ])
    return {
      navList
    }
  },
})
</script>

<style lang="scss" scoped>
.nav {
  width: 200px;
  height: 100%;
  display: flex;
  flex-direction: column;
  .nav-title {
    width: 100%;
    height: 120px;
    border-bottom: 1px solid #D6D6D6;
    img {
      margin-top: 35px;
    }
  }
  .nav-menu {
    width: 100%;
    flex-grow: 1;
    overflow: auto;
    box-shadow: 0px 10px 10px #ccc;
    .nav-menu-content {
      width: 100%;
      border-right: none;
      .el-menu-item {
        height: 80px;
        line-height: 80px;
        font-size: 24px;
        &.is-active {
          color: #fff;
          background: #537BFE;
        }
      }
    }
  }
}
</style>
