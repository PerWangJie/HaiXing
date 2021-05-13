<template>
  <div class="stationRecord">
    <div class="pagination">
      <pagination :currentSize="currentSize" :totalSize="totalSize" ref="pagination"></pagination>
    </div>
    <div class="stationRecord-table">
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
      </el-table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, onMounted, reactive, toRefs, provide } from "vue";
import pagination from '@/components/pagination.vue'

export default defineComponent({
  name: "stationRecord",
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
    // 表格数据
    const tableData: Array<any> = reactive([
      { Number: 1, ItemName: 1, Spec: "22", Batch: "123", Plan: "111" },
    ]);
    const colConfigs: Array<any> = reactive([
      { prop: "Number", label: "产线" },
      { prop: "Type", label: "班次" },
      { prop: "ItemName", label: "工位" },
      { prop: "Spec", label: "登记类型" },
      { prop: "Batch", label: "登记内容" },
      { prop: "Spec1", label: "操作人" },
      { prop: "Batch1", label: "操作时间" }
    ]);
    onMounted(() => {
      // console.log(pagination.value)
    });
    return {
      totalSize,
      currentSize,
      StatusClick,
      Status,
      tableData,
      colConfigs,
    };
  },
  components: {
    pagination
  }
});
</script>

<style scoped lang="scss">
.stationRecord {
  padding: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  .pagination {
    position: relative;
    width: 100%;
    height: 40px;
    margin-bottom: 20px;
  }
  .stationRecord-table {
    height: 100%;
    flex: 1;
    box-shadow: 0 0 10px #ccc;
    border-radius: 8px;
  }
}
</style>
