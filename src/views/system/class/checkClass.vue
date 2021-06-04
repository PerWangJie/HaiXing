<template>
  <div class="addGroup">
    <p class="title">新增班次</p>
    <el-form :model="ClassForm" ref="classForm" label-position="left">
      <el-form-item label="加工单元：" prop="CXMC">
        <el-input v-model="ClassForm.CXMC" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="班次日期：" prop="endTime">
        <el-input v-model="ClassForm.SCRQ" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="班次名称：" prop="BCMC">
        <el-input v-model="ClassForm.BCMC" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="班次编码：" prop="BCBM">
        <el-input v-model="ClassForm.BCBM" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="开始时间：" prop="JHSBSJ">
        <el-input v-model="ClassForm.JHSBSJ" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="结束时间：" prop="JHXBSJ">
        <el-input v-model="ClassForm.JHXBSJ" :disabled="true"></el-input>
      </el-form-item>
    </el-form>
    <div class="add-staff">
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
      </el-table>
    </div>
    <div class="button-group">
      <el-button class="shadow" @click="exitHandle">取消</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import router from "@/router";
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
import { useRouter } from "vue-router";
import { ClassService } from "@/api/class";

export default defineComponent({
  name: "addGroup",
  setup(props, context) {
    const router = useRouter();
    const classForm = ref(null);
    // 搜索数据
    let data = reactive({
      classVisible: false,
      staff: "",
      ClassForm: {
        BCBM: "",
        LineName: "",
        startTime: new Date(2016, 9, 10, 0o0, 0o0),
        endTime: new Date(2016, 9, 10, 0o0, 0o0),
        Unit: "",
        date: new Date(),
      },
      unitList: [],
      staffData: [{ number: "11", name: "11" }],
      // 选中的开班人员
      personList: [],
      // 开班人员
      chooseList: [],
      // 排班类型列表
      ClassList: [],
      arr: [],
      tableData: [],
    });
    // 表格数据
    const colConfigs: Array<any> = reactive([
      { prop: "YGBH", label: "员工编码" },
      { prop: "YGXM", label: "员工" },
      { prop: "GWMC", label: "岗位" },
      { prop: "BJHSBSJ", label: "上班时间" },
      { prop: "BJHXBSJ", label: "下班时间" },
    ]);
    // 取消
    const exitHandle = () => {
      router.go(-1);
      const form: any = unref(classForm);
      form.resetFields();
    };
    // 获取查看列表标体
    const checkClass = async () => {
      let row = router.currentRoute.value.query;
      const CheckClassParams = {
        method: "GKJ_CKBCDYLB",
        GSH: localStorage.getItem("gsh"),
        CXBM: row.CXBM,
        BCBM: row.BCBM,
        SCRQ: row.SCRQ,
      };
      const res = await ClassService.CheckClass(CheckClassParams);
      data.tableData = res.data.list;
    };
    // 获取查看列表标头
    const checkClassTitle = async () => {
      let row = router.currentRoute.value.query;
      const CheckClassParams = {
        method: "GKJ_CKBCDYLBBT",
        GSH: localStorage.getItem("gsh"),
        CXBM: row.CXBM,
        BCBM: row.BCBM,
        SCRQ: row.SCRQ,
      };
      const res = await ClassService.CheckClass(CheckClassParams);
      data.ClassForm = res.data.list[0];
    };
    onMounted(() => {
      checkClass();
      checkClassTitle()
    });
    return {
      ...toRefs(data),
      classForm,
      colConfigs,
      exitHandle,
      checkClass,
      checkClassTitle
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.addGroup {
  width: 100%;
  height: 100%;
  padding: 20px;
  & /deep/ .el-date-editor.el-input {
    width: 200px !important;
    margin-right: 20px;
  }
  & /deep/ .el-select .el-input {
    width: 200px !important;
  }
  & /deep/ .el-select.unit .el-input {
    width: 500px !important;
  }
  .title {
    font-size: 20px;
    margin: 0 0 20px 0;
    color: #fff;
    text-align: left;
  }
  .add-staff {
    width: 100%;
    text-align: left;
    margin-top: 20px;
    padding-left: 120px;
    .el-table {
      margin-top: 20px;
      width: 950px;
      max-height: 50vh;
      overflow: auto;
    }
  }
  & /deep/ .el-dialog {
    width: 620px !important;
    .el-button {
      &.shadow {
        color: #fff;
        background: rgb(13, 27, 38);
        border: 1px solid #d6d6d6;
      }
    }
  }
  & /deep/ .el-form-item {
    margin-bottom: 10px;
    .el-form-item__label {
      text-align: right;
      color: #fff;
      width: 120px;
    }
    .el-form-item__content {
      text-align: left;
      .el-input,
      .el-textarea__inner {
        width: 500px;
      }
    }
    .el-radio__label {
      color: #fff;
    }
  }
  .button-group {
    width: 100%;
    box-sizing: border-box;
    text-align: left;
    margin-top: 20px;
    .el-button {
      position: relative;
      left: 120px;
      &.shadow {
        background: rgba(255, 255, 255, 0.05);
      }
    }
  }
}
</style>
