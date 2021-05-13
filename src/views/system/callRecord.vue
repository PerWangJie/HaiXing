<template>
  <div class="callRecord">
    <div class="pagination">
      <pagination :currentSize="currentSize" :totalSize="totalSize" ref="pagination"></pagination>
    </div>
    <div class="callRecord-table">
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
            <el-button type="text" size="small">响应</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, onMounted, reactive, provide } from "vue";
import pagination from '@/components/pagination.vue'

export default defineComponent({
  name: "callRecord",
  setup(ctx) {
    // 当前页码
    let currentSize: Ref<number> = ref(1)
    // 总页码
    let totalSize: Ref<number> = ref(3)
    provide('currentSize', currentSize)
    provide('totalSize', totalSize)
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
      { prop: "Number", label: "异常类型" },
      { prop: "Type", label: "呼叫用户" },
      { prop: "ItemName", label: "呼叫时间" },
      { prop: "Spec", label: "呼叫等级" },
      { prop: "Batch", label: "持续时间" }
    ]);
    onMounted(() => {});
    return {
      totalSize,
      currentSize,
      StatusClick,
      Status,
      tableData,
      colConfigs
    };
  },
  components: {
    pagination
  }
});
</script>

<style scoped lang="scss">
.callRecord {
  padding: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  .pagination {
    width: 100%;
    height: 40px;
    display: flex;
    margin-bottom: 20px;
  }
  .callRecord-table {
    height: 100%;
    flex: 1;
    box-shadow: 0 0 10px #ccc;
    border-radius: 8px;
  }
}
</style>
