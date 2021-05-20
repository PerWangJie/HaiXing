<template>
  <div class="leaveClass">
    <div class="button-group">
      <div class="operation-button">
        <el-button type="primary" @click="addHandle">新增</el-button>
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
      <el-table-column fixed="right" label="操作" width="150">
        <template #default="scope">
          <el-button type="text" size="small">添加员工</el-button>
          <el-button type="text" size="small">删除记录</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="personVisible" center>
      <el-transfer
        v-model="personList"
        :data="chooseList"
        :titles="['员工', '已选员工']"
        filterable
        @change="handleChange"
      >
      </el-transfer>
      <template #footer>
        <hr>
        <span class="dialog-footer">
          <el-button type="primary" @click="personVisible = false"
            >确 定</el-button
          >
          <el-button @click="personVisible = false">取 消</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, onMounted, reactive, provide, toRefs } from "vue";
import pagination from "@/components/pagination.vue";

export default defineComponent({
  name: "classCheck",
  setup() {
    // 穿梭框数据
    const Persondata = reactive({
      // 选中的开班人员
      personList: [],
      // 开班人员
      chooseList: [
        {key: 1, label: '人员1'}, {key: 2, label: '人员2'}
      ]
    })
    // 当前页码
    let currentSize: Ref<number> = ref(1);
    // 总页码
    let totalSize: Ref<number> = ref(3);
    provide("currentSize", currentSize);
    provide("totalSize", totalSize);
    // 显示新增人员弹窗
    let personVisible: Ref<boolean> = ref(false);
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
      { prop: "Type", label: "离岗员工" },
      { prop: "ItemName", label: "离岗原因" },
      { prop: "process", label: "离岗起止时间" },
      { prop: "Spec", label: "替补员工" },
    ]);
    // 新增人员
    const addHandle = () => {
      personVisible.value = true;
    }
    onMounted(() => {});
    return {
      totalSize,
      currentSize,
      personVisible,
      colConfigs,
      tableData,
      addHandle,
      ...toRefs(Persondata),
    };
  },
  components: {
    pagination,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.leaveClass {
  width: 100%;
  height: 100%;
  & /deep/ .el-dialog {
    width: 620px !important;
    hr {
      color: #D6D6D6;
      margin: 0 0 20px 0;
    }
  }
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
        &.shadow {
          color: #fff;
          background: rgb(13, 27, 38);
          border: 1px solid #d6d6d6;
        }
      }
    }
  }
}
</style>
