// 左边的导航栏
<template>
  <div class="nav">
    <div class="nav-title">
      <img src="@/assets/img/title.png" alt="">
    </div>
    <div class="nav-menu">
      <el-menu
        default-active="1"
        class="nav-menu-content"
        @select="menuSelect"
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
import { useRouter } from 'vue-router'

export default defineComponent({
  name: "nav",
  setup() {
    const navList: Array<any> = reactive([
      {label: '工作台', path: '/product'}, 
      {label: '产线叫料', path: '/productline'}, {label: '故障报修', path: '/faultRepair'},
      {label: '工单管理', path: '/orderManagement/outOrder' }, {label: '我的设备', path: '/equipment'},
      // {label: '操作日志'}, {label: '工位登记记录', path: '/stationRecord' }
    ])
    const router = useRouter()
    // 切换菜单
    const menuSelect = (index: number) => {
      router.push(
        {
          path: navList[index - 1].path
        }
      )
    }
    return {
      navList,
      menuSelect
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
  background: rgba(255, 255, 255, 0.05);
  .nav-title {
    width: 100%;
    height: 120px;
    background: rgba(255, 255, 255, 0.1);
    img {
      margin-top: 35px;
    }
  }
  .nav-menu {
    width: 100%;
    flex-grow: 1;
    overflow: auto;
    .nav-menu-content {
      width: 100%;
      border-right: none;
      background: rgb(13, 27, 38);
      .el-menu-item {
        height: 80px;
        line-height: 80px;
        font-size: 24px;
        color: #fff !important;
        &:hover {
          background: rgba(255, 255, 255, 0.05);
        }
        &.is-active {
          color: #fff;
          background: #537BFE;
        }
      }
    }
  }
}
</style>
