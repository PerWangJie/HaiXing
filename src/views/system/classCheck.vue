<template>
  <div class="classCheck">
    <div class="classCheck-information">
      <el-tabs v-model="Status" @tab-click="StatusClick">
        <el-tab-pane label="开班登记" name="/classCheck/openClass"></el-tab-pane>
        <el-tab-pane label="离岗登记" name="/classCheck/leaveClass"></el-tab-pane>
        <el-tab-pane label="下岗登记" name="/classCheck/laidOff"></el-tab-pane>
      </el-tabs>
      <pagination :currentSize="currentSize" :totalSize="totalSize" ref="pagination"></pagination>
      <div class="classCheck-table">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, onMounted, reactive, provide } from "vue";
import { useRouter } from 'vue-router'
import pagination from '@/components/pagination.vue'

export default defineComponent({
  name: "classCheck",
  setup() {
    const router = useRouter()
    // 当前页码
    let currentSize: Ref<number> = ref(1)
    // 总页码
    let totalSize: Ref<number> = ref(3)

    provide('currentSize', currentSize)
    provide('totalSize', totalSize)
    // 选中的状态
    let Status: Ref<string> = ref(`/classCheck/openClass`);
    // 切换状态
    const StatusClick = (tab: any, event: any) => {
      router.push(
        {
          path: tab.props.name
        }
      )
      currentSize.value = 1
    }
    onMounted(() => {});
    return {
      StatusClick,
      Status,
      currentSize,
      totalSize
    };
  },
  components: {
    pagination
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

$gray: "~@/assets/img/button-4.png";
$blue: "~@/assets/img/button-2.png";

.classCheck {
  padding: 0 20px;
  height: 100%;
  display: flex;
  flex-direction: row;
  .classCheck-information {
    width: 100%;
    height: 100%;
    padding: 20px 0;
    position: relative;
    display: flex;
    flex-direction: column;
    & /deep/ .el-tabs__active-bar {
      background: none;
    }
    & /deep/ .el-tabs__nav-wrap::after {
      width: 0;
    }
    & /deep/ .el-tabs__item {
      width: 120px;
      height: 40px;
      padding: 0;
      color: #FFF;
      &.is-active {
        background: linear-gradient(
          0deg,
          #537bfe 0%,
          rgba(83, 123, 254, 0) 100%
        );
        color: #fff;
      }
    }
    .classCheck-table {
      height: 100%;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 8px;
      overflow: hidden;
    }
  }
}
</style>
