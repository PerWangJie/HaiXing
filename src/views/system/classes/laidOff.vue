<template>
  <div class="laidOff">
    <el-table
      :data="tableData"
      :header-cell-style="{ background: 'rgb(25, 39, 49)', color: '#FFF' }"
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
          <el-button type="text" size="small">下岗</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, onMounted, reactive, provide, toRefs } from "vue";
import pagination from "@/components/pagination.vue";

export default defineComponent({
  name: "classCheck",
  setup() {
    // 当前页码
    let currentSize: Ref<number> = ref(1);
    // 总页码
    let totalSize: Ref<number> = ref(3);
    provide("currentSize", currentSize);
    provide("totalSize", totalSize);
    // 表格数据
    const tableData: Array<any> = reactive([
      {
        Number: 1,
        Type: 1,
        ItemName: 1,
        process: 1,
        Spec: "22",
        Batch: "123",
        Plan: "111",
      },
      {
        Number: 1,
        Type: 1,
        ItemName: 1,
        process: 1,
        Spec: "22",
        Batch: "123",
        Plan: "111",
      },
    ]);
    const colConfigs: Array<any> = reactive([
      { prop: "Number", label: "工位" },
      { prop: "Type", label: "人员编码" },
      { prop: "ItemName", label: "员工" },
      { prop: "process", label: "上班时间" },
      { prop: "Spec", label: "下班时间" },
      { prop: "Off", label: "下岗时间" },
      { prop: "Status", label: "状态" },
    ]);
    onMounted(() => {});
    return {
      totalSize,
      currentSize,
      colConfigs,
      tableData,
    };
  },
  components: {
    pagination,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.laidOff {
  width: 100%;
  height: 100%;
  & /deep/ .el-dialog {
    width: 620px !important;
    hr {
      color: #D6D6D6;
      margin: 0 0 20px 0;
    }
  }
}
</style>
