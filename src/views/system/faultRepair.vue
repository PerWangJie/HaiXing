<template>
  <div class="faultRepair">
    <div class="faultRepair-information">
      <el-form
        :model="ruleForm"
        ref="ruleFormsss"
        label-width="100px"
        label-position="left"
      >
        <el-row>
          <el-col :span="6">
            <el-form-item label="故障编号：" prop="faultCode">
              <el-input v-model="ruleForm.faultCode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="设备编号：" prop="Code">
              <el-input v-model="ruleForm.Code"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="报修人：" prop="People">
              <el-input v-model="ruleForm.People"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" @click="searchData">查询</el-button>
            <el-button class="shadow" @click="resetForm('ruleForm')"
              >重置</el-button
            >
          </el-col>
        </el-row>
      </el-form>
      <div class="faultRepair-new">
        <el-button type="primary" @click="addLineHandle">新增报修</el-button>
        <pagination
          :currentSize="currentSize"
          :totalSize="totalSize"
          ref="pagination"
        ></pagination>
      </div>
      <div class="faultRepair-table">
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
          <el-table-column fixed="right" label="操作" width="80">
            <template #default="scope">
              <el-button type="text" size="small">解除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
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
  unref,
  toRefs,
} from "vue";
import { useRouter } from 'vue-router'
import pagination from "@/components/pagination.vue";

export default defineComponent({
  name: "faultRepair",
  setup(props, context) {
    const router = useRouter()
    const ruleFormsss = ref(null);
    // 当前页码
    let currentSize: Ref<number> = ref(1);
    // 总页码
    let totalSize: Ref<number> = ref(3);
    provide("currentSize", currentSize);
    provide("totalSize", totalSize);
    // 搜索数据
    let data = reactive({
      ruleForm: {
        faultCode: "",
        Code: "",
        People: ""
      },
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
    // 表格数据
    const colConfigs: Array<any> = reactive([
      { prop: "Number", label: "设备编号" },
      { prop: "Type", label: "设备名称" },
      { prop: "ItemName", label: "规格型号" },
      { prop: "process", label: "安装地点" },
      { prop: "Spec", label: "故障编码" },
      { prop: "Batch", label: "故障名称" },
      { prop: "Plan", label: "计划工时（分钟）" },
      { prop: "Level", label: "紧急程度" },
      { prop: "People", label: "报修人" },
      { prop: "Time", label: "报修时间" },
      { prop: "Time2", label: "解除时间" },
    ]);
    // const change = (e: any) => {
    //   (this as any).$forceUpdate();
    // };
    // 搜索数据
    const searchData = () => {
      
    };
    // 重置表单
    const resetForm = () => {
      const form: any = unref(ruleFormsss);
      form.resetFields();
    };
    // 新增叫料单
    const addLineHandle = () => {
      router.push(
        {
          path: '/faultRepair/addFault'
        }
      )
    }
    onMounted(() => {});
    return {
      ...toRefs(data),
      totalSize,
      currentSize,
      colConfigs,
      searchData,
      ruleFormsss,
      resetForm,
      addLineHandle
    };
  },
  components: {
    pagination,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.faultRepair {
  padding: 0 20px;
  height: 100%;
  display: flex;
  flex-direction: row;
  .faultRepair-information {
    width: 100%;
    height: 100%;
    padding: 20px 0;
    position: relative;
    display: flex;
    flex-direction: column;
    & /deep/ .el-col {
      .el-button {
        position: relative;
        top: 3px;
        left: 5px;
        &.shadow {
          background: rgba(255, 255, 255, 0.05);
        }
      }
    }
    & /deep/ .el-form-item__label {
      padding-left: 10px;
      color: #FFF;
    }
    & /deep/ .el-date-editor {
      width: 300px;
    }
    .faultRepair-new {
      position: relative;
      width: 100%;
      display: flex;
      margin-bottom: 20px;
      .el-button {
        z-index: 100;
      }
    }
  }
  .faultRepair-table {
    height: 100%;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
  }
}
</style>
