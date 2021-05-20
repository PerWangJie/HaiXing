<template>
  <div class="productline">
    <div class="productline-information">
      <el-form
        :model="ruleForm"
        ref="ruleFormsss"
        label-width="100px"
        label-position="left"
      >
        <el-row>
          <el-col :span="5">
            <el-form-item label="需求产线：" prop="line">
              <el-input v-model="ruleForm.line"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="关联工单：" prop="order">
              <el-input v-model="ruleForm.order"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="物品号：" prop="ItemNo">
              <el-input v-model="ruleForm.ItemNo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="叫料日期：" prop="Time">
              <el-date-picker
                v-model="ruleForm.Time"
                value-format="yyyy-MM-dd"
                type="daterange"
                style="position: relative; top: 2px"
                range-separator="~"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="searchData">查询</el-button>
            <el-button class="shadow" @click="resetForm('ruleForm')"
              >重置</el-button
            >
          </el-col>
        </el-row>
      </el-form>
      <div class="productline-new">
        <el-button type="primary" @click="addLineHandle">新增叫料单</el-button>
        <pagination
          :currentSize="currentSize"
          :totalSize="totalSize"
          ref="pagination"
        ></pagination>
      </div>
      <div class="productline-table">
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
              <el-button type="text" size="small">当前</el-button>
              <el-button type="text" size="small">暂停</el-button>
              <el-button type="text" size="small">下线</el-button>
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
  name: "productline",
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
        line: "",
        order: "",
        ItemNo: "",
        Time: "",
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
      { prop: "Number", label: "任务单号" },
      { prop: "Type", label: "任务类型" },
      { prop: "ItemName", label: "物品名称" },
      { prop: "process", label: "工序" },
      { prop: "Spec", label: "规格" },
      { prop: "Batch", label: "批号" },
      { prop: "Plan", label: "进度" },
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
          path: '/productline/addLine'
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
.productline {
  padding: 0 20px;
  height: 100%;
  display: flex;
  flex-direction: row;
  .productline-information {
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
    .productline-new {
      position: relative;
      width: 100%;
      display: flex;
      margin-bottom: 20px;
      .el-button {
        z-index: 100;
      }
    }
  }
  .productline-table {
    height: 100%;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
  }
}
</style>
