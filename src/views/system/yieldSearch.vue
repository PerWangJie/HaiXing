<template>
  <div class="yieldSearch">
    <el-tabs v-model="Status" @tab-click="StatusClick">
      <el-tab-pane label="当天" name="first"></el-tab-pane>
      <el-tab-pane label="当月" name="second"></el-tab-pane>
    </el-tabs>
    <div class="yieldSearch-table">
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
        <el-table-column fixed="right" label="操作" width="100">
          <template #default="scope">
            <el-button type="text" size="small">取消产出</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, onMounted, reactive } from "vue";

export default defineComponent({
  name: "yieldSearch",
  setup() {
    // 切换状态
    const StatusClick = (value: any) => {
      console.log(value);
    };
    // 选中的状态
    let Status: Ref<string> = ref(`first`);
    const tableData: Array<any> = reactive([
      { Number: 1, ItemName: 1, Spec: "22", Batch: "123", Plan: "111" },
    ]);
    const colConfigs: Array<any> = reactive([
      { prop: "Number", label: "任务单号" },
      { prop: "Type", label: "任务类型" },
      { prop: "ItemName", label: "物品名称" },
      { prop: "Spec", label: "规格" },
      { prop: "Batch", label: "批号" },
      { prop: "Num", label: "产出数量" },
      { prop: "Time", label: "产出时间" }
    ]);
    onMounted(() => {});
    return {
      StatusClick,
      Status,
      tableData,
      colConfigs
    };
  },
  components: {
    
  }
});
</script>

<style scoped lang="scss">
.yieldSearch {
  padding: 20px;
  width: 100%;
  height: 100%;
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
      background: linear-gradient(0deg, #537bfe 0%, rgba(83, 123, 254, 0) 100%);
      color: #fff;
    }
  }
  .yieldSearch-table {
    height: 100%;
    flex: 1;
    box-shadow: 0 0 10px #ccc;
    border-radius: 8px;
  }
}
</style>
