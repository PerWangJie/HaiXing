<template>
  <div class="addLine">
    <p class="title">新增报修</p>
    <el-form :model="FaultForm" ref="faultForm" label-position="left">
      <el-form-item label="设备编号：" prop="SBXX">
        <el-input v-model="FaultForm.SBXX" @blur="CodeBlurHandle"></el-input>
      </el-form-item>
      <el-form-item label="设备名称：" prop="SBMC">
        <el-input v-model="FaultForm.SBMC" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="规格型号：" prop="GG">
        <el-input v-model="FaultForm.GG" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="安装地点：" prop="WZMC">
        <el-input v-model="FaultForm.WZMC" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="故障编码：" prop="GZBM">
        <el-select v-model="FaultForm.GZBM" placeholder="请选择">
          <el-option
            v-for="item in faultList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="故障名称：" prop="Order">
        <el-input v-model="FaultForm.Order"></el-input>
      </el-form-item>
      <el-form-item label="计划工时（分钟）：" prop="JHGS">
        <el-input v-model="FaultForm.JHGS"></el-input>
      </el-form-item>
      <el-form-item label="紧急程度：" prop="Warn">
        <el-select v-model="FaultForm.Warn" placeholder="请选择">
          <el-option
            v-for="item in warnList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="描述：" prop="MS">
        <el-input v-model="FaultForm.MS"></el-input>
      </el-form-item>
    </el-form>
    <div class="button-group">
      <el-button type="primary" @click="FaultAffirm">确认</el-button>
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
import { FaultService } from "@/api/fault";
import { ElMessage } from "element-plus"

export default defineComponent({
  name: "addLine",
  setup(props, context) {
    const faultForm = ref(null);
    // 搜索数据
    let data = reactive({
      FaultForm: {
        SBXX: "",
        SBMC: "",
        GG: "",
        WZMC: "",
        GZBM: "",
        Level: 1,
        Order: "",
        JHGS: "",
        Warn: "",
        MS: "",
      },
      faultList: [],
      // 紧急程度列表
      warnList: [],
    });
    // 取消
    const exitHandle = () => {
      router.go(-1);
      const form: any = unref(faultForm);
      form.resetFields();
    };
    // 获取设备故障编码
    const getCodeList = async () => {
      const CodeParams = {
        method: "app.getsbgzyy",
      };
      const res = await FaultService.getCode(CodeParams);
      data.faultList = res.data.list.map((item: any, index: number) => {
        let obj = {
          value: item.xmfldm,
          label: item.xmflmc,
        };
        return obj;
      });
      console.log(data.faultList);
    };
    // 自动带出信息
    const CodeBlurHandle = async () => {
      const InformationParams = {
        method: "GKJ_HXGetSBBHFHSBXX",
        SBXX: data.FaultForm.SBXX,
        GSH: localStorage.getItem("gsh"),
      };
      const res = await FaultService.getInformation(InformationParams);
      const { SBMC, GG, WZMC } = res.data.list[0];
      data.FaultForm.SBMC = SBMC;
      data.FaultForm.GG = GG;
      data.FaultForm.WZMC = WZMC;
    };
    // 获取紧急程度列表
    const WarnList = async () => {
      const CodeParams = {
        method: "app.getsbgzjjqk",
      };
      const res = await FaultService.getWarnList(CodeParams);
      data.warnList = res.data.list.map((item: any, index: number) => {
        let obj = {
          value: item.xmfldm,
          label: item.xmflmc,
        };
        return obj;
      });
      console.log(data.warnList);
    }
    // 提交故障信息
    const FaultAffirm = async () => {
      const submitFaultParams = {
        method: 'GKJ_HXINSERTBXRW',
        GSH: localStorage.getItem("gsh"),
        SBXX: data.FaultForm.SBXX,
        GZBM: data.FaultForm.GZBM, 
        JHGS: data.FaultForm.JHGS, 
        MS: data.FaultForm.MS, 
        CJR: localStorage.getItem("username"),
        CJRID: localStorage.getItem("userid"),
      }
      const res = await FaultService.submitFault(submitFaultParams)
      if (res.code == 1000) {
        ElMessage.success('提交成功')
        router.go(-1)
      }
    }
    onMounted(() => {
      getCodeList();
      WarnList();
    });
    return {
      ...toRefs(data),
      faultForm,
      exitHandle,
      getCodeList,
      CodeBlurHandle,
      WarnList,
      FaultAffirm
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.addLine {
  width: 100%;
  height: 100%;
  padding: 20px;
  .title {
    font-size: 20px;
    margin: 0 0 20px 0;
    color: #fff;
    text-align: left;
  }
  & /deep/ .el-form-item {
    margin-bottom: 10px;
    .el-form-item__label {
      text-align: right;
      color: #fff;
      width: 150px;
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
      left: 150px;
      &.shadow {
        background: rgba(255, 255, 255, 0.05);
      }
    }
  }
}
</style>
