<template>
  <div class="today">
    <div class="today-information">
      <el-tabs v-model="Status" @tab-click="StatusClick">
        <el-tab-pane label="执行中" name="first"></el-tab-pane>
        <el-tab-pane label="待执行" name="second"></el-tab-pane>
      </el-tabs>
      <div class="today-table">
        <el-table
          :data="tableData"
          :header-cell-style="{ background: '#F2F2F2', color: '#333' }"
        >
          <template v-for="{ prop, label } in colConfigs" :key="prop">
            <el-table-column
              :prop="prop"
              :label="label"
              :show-overflow-tooltip="true"
            />
          </template>
          <el-table-column fixed="right" label="操作" width="150">
            <template #default="scope">
              <el-button type="text" size="small">当前</el-button>
              <el-button type="text" size="small">暂停</el-button>
              <el-button type="text" size="small">下线</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="product-control">
      <right></right>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, onMounted, reactive } from "vue";
import right from "@/components/right.vue";

export default defineComponent({
  name: "today",
  setup() {
    // 切换状态
    const StatusClick = (value: any) => {
      console.log(value);
    };
    // 选中的状态
    let Status: Ref<string> = ref(`first`);
    // 表格数据
    const tableData: Array<any> = reactive([
      { Number: 1, ItemName: 1, Spec: "22", Batch: "123", Plan: "111" },
    ]);
    const colConfigs: Array<any> = reactive([
      { prop: "Number", label: "任务单号" },
      { prop: "ItemName", label: "物品名称" },
      { prop: "Spec", label: "规格" },
      { prop: "Batch", label: "批号" },
      { prop: "Plan", label: "进度" },
    ]);
    onMounted(() => {});
    return {
      StatusClick,
      Status,
      colConfigs,
      tableData,
    };
  },
  components: {
    right,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.today {
  padding: 0 20px;
  height: 100%;
  display: flex;
  flex-direction: row;
  .today-information {
    width: 1300px;
    height: 100%;
    padding: 20px 0;
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
      &.is-active {
        background: linear-gradient(
          0deg,
          #537bfe 0%,
          rgba(83, 123, 254, 0) 100%
        );
        color: #fff;
      }
    }
    .today-table {
      height: 100%;
      box-shadow: 0 0 10px #ccc;
      border-radius: 8px;
    }
  }
  .product-control {
    height: 100%;
    flex: 1;
    padding: 20px 0 20px 20px;
  }
}
</style>
