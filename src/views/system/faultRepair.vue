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
            <el-form-item label="故障编号：" prop="GZBH">
              <el-input v-model="ruleForm.GZBH"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="设备编号：" prop="SBBH">
              <el-input v-model="ruleForm.SBBH"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="报修人：" prop="BXR">
              <el-input v-model="ruleForm.BXR"></el-input>
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
import { FaultService } from "@/api/fault";

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
        GZBH: "",
        SBBH: "",
        BXR: ""
      },
      tableData: [
        
      ],
    });
    // 表格数据
    const colConfigs: Array<any> = reactive([
      { prop: "SBBH", label: "设备编号" },
      { prop: "SBMC", label: "设备名称" },
      { prop: "XH", label: "规格型号" },
      { prop: "SBSZWZMC", label: "安装地点" },
      { prop: "GZBM", label: "故障编码" },
      { prop: "GZMC", label: "故障名称" },
      { prop: "XDWCGS", label: "计划工时（分钟）" },
      { prop: "JJCD", label: "紧急程度" },
      { prop: "CJR", label: "报修人" },
      { prop: "CJSJ", label: "报修时间" },
      { prop: "QRSJ", label: "解除时间" },
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
    // 获取故障报修列表
    const getList = async (pageSize: 10, pageIndex: 1) => {
      const OrdersParams = {
        method: 'GKJ_GETGZYXT',
        GZBH: data.ruleForm.GZBH,
        SBBH: data.ruleForm.SBBH,
        BXR: data.ruleForm.BXR,
        GSH: localStorage.getItem("gsh"),
        pageSize: pageSize,
        pageIndex: pageIndex
      }
      const res = await FaultService.getFault(OrdersParams);
      data.tableData = res.data.list.slice((pageIndex -1) * pageSize, pageSize * pageIndex)
      totalSize.value = Math.ceil(res.data.count/pageSize)
    }
    onMounted(() => {
      getList(10, 1)
    });
    return {
      ...toRefs(data),
      totalSize,
      currentSize,
      colConfigs,
      searchData,
      ruleFormsss,
      resetForm,
      addLineHandle,
      getList
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
