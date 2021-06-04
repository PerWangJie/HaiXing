<template>
  <div class="outOrder">
    <div class="button-group">
      <div class="operation-button">
        <el-button type="primary" @click="addOrderHandle">新增</el-button>
      </div>
    </div>
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
      <el-table-column fixed="right" label="操作" width="170">
        <template #default="scope">
          <el-button type="text" size="small">开工</el-button>
          <el-button type="text" size="small">查看SOP</el-button>
          <el-button type="text" size="small">查看图纸</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  Ref,
  onMounted,
  reactive,
  provide,
  toRefs,
} from "vue";
import { useRouter } from 'vue-router'
import pagination from "@/components/pagination.vue";

export default defineComponent({
  name: "classCheck",
  setup() {
    const router = useRouter()
    // 当前页码
    let currentSize: Ref<number> = ref(1);
    // 总页码
    let totalSize: Ref<number> = ref(3);
    provide("currentSize", currentSize);
    provide("totalSize", totalSize);
    // 表格数据
    let data = reactive({
      tableData: [
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
      ],
    });
    const colConfigs: Array<any> = reactive([
      { prop: "Number", label: "加工单元" },
      { prop: "Type", label: "销售订单号" },
      { prop: "ItemName", label: "任务单号" },
      { prop: "process", label: "任务类型" },
      { prop: "Spec", label: "物品名称" },
      { prop: "Type1", label: "规格" },
      { prop: "ItemName1", label: "工序" },
      { prop: "process1", label: "批号" },
      { prop: "Spec1", label: "生产日期" },
      { prop: "process2", label: "进度" },
      { prop: "Spec2", label: "创建时间" },
    ]);
    const addOrderHandle = () => {
      console.log(111)
      router.push({
        path: '/orderManagement/addOrder'
      })
    }
    onMounted(() => {});
    return {
      totalSize,
      currentSize,
      colConfigs,
      addOrderHandle,
      ...toRefs(data),
    };
  },
  components: {
    pagination,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.outOrder {
  width: 100%;
  height: 100%;
  .button-group {
    width: 100%;
    height: 80px;
    padding: 0 20px;
    display: flex;
    flex-direction: row;
    .operation-button {
      flex: 1;
      text-align: right;
      .el-button {
        width: 100px;
        height: 40px;
        margin: 20px 20px 0 0;
      }
    }
  }
}
</style>
