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
import { OrderService } from "@/api/order";

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
      tableData: [],
    });
    // 表格数据
    const colConfigs: Array<any> = reactive([
      { prop: "swh", label: "叫料单号" },
      { prop: "XQCX", label: "需求产线" },
      { prop: "CXMC", label: "产线名称" },
      { prop: "WPH", label: "物品号" },
      { prop: "WPMC", label: "物品名称" },
      { prop: "GGMS", label: "规格描述" },
      { prop: "DW", label: "单位" },
      { prop: "XQSL", label: "需求数量" },
      { prop: "JJDJ", label: "紧急等级" },
      { prop: "GLGDH", label: "关联工单号" },
      { prop: "BZ", label: "备注" },
      { prop: "JLSJ", label: "叫料时间" },
      { prop: "jlr", label: "叫料人" },
    ]);
    // const change = (e: any) => {
    //   (this as any).$forceUpdate();
    // };
    // 搜索数据
    const searchData = () => {
      getList(10, 1)
    }
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
    const getList = async (pageSize: 10, pageIndex: 1) => {
      let day1 = '1990-04-01'
      let day2 = '9999-04-30'
      let d1 = new Date(data.ruleForm.Time[0])
      let d2 = new Date(data.ruleForm.Time[1])
      const OrdersParams = {
        method: 'Agv_CXJL_HXGetSCLLYXT',
        GSH: localStorage.getItem("gsh"),
        cxbm: data.ruleForm.line,
        gdh: data.ruleForm.order,
        wph: data.ruleForm.ItemNo,
        kssj: data.ruleForm.Time.length == 0 ? day1 : d1.getFullYear() + '-' + (d1.getMonth() + 1) + '-' + d1.getDate(),
        jssj: data.ruleForm.Time.length == 0 ? day2 : d2.getFullYear() + '-' + (d2.getMonth() + 1) + '-' + d2.getDate(),
        pageSize: pageSize,
        pageIndex: pageIndex
      }
      const res = await OrderService.getOrderList(OrdersParams);
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
