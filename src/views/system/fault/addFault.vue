<template>
  <div class="addLine">
    <p class="title">新增叫料单</p>
    <el-form
      :model="FaultForm"
      ref="faultForm"
      label-width="150px"
      label-position="left"
    >
      <el-form-item label="设备编号：" prop="Line">
        <el-input v-model="FaultForm.Line"></el-input>
      </el-form-item>
      <el-form-item label="设备名称：" prop="LineName">
        <el-input v-model="FaultForm.LineName" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="规格型号：" prop="Spec">
        <el-input v-model="FaultForm.Spec" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="安装地点：" prop="Unit">
        <el-input v-model="FaultForm.Unit" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="故障编码：" prop="Count">
        <el-select v-model="FaultForm.Count" placeholder="请选择">
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
        <el-input v-model="LineForm.Order"></el-input>
      </el-form-item>
      <el-form-item label="计划工时（分钟）：" prop="Remark">
        <el-input v-model="LineForm.Remark"></el-input>
      </el-form-item>
      <el-form-item label="故障名称：" prop="Level">
        <el-radio-group v-model="LineForm.Level">
          <el-radio :label="1">备选项</el-radio>
          <el-radio :label="2">备选项</el-radio>
          <el-radio :label="3">备选项</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="描述：" prop="People">
        <el-input v-model="LineForm.People" type="textarea"></el-input>
      </el-form-item>
    </el-form>
    <div class="button-group">
      <el-button type="primary">确认</el-button>
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

export default defineComponent({
  name: "addLine",
  setup(props, context) {
    const faultForm = ref(null);
    // 搜索数据
    let data = reactive({
      FaultForm: {
        Line: "",
        LineName: "",
        Spec: "",
        Unit: "",
        Count: "",
        Level: 1,
        Order: "",
        Remark: "",
        People: "",
      },
      faultList: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
    });
    // 取消
    const exitHandle = () => {
      router.go(-1);
      const form: any = unref(faultForm);
      form.resetFields();
    };
    onMounted(() => {});
    return {
      ...toRefs(data),
      faultForm,
      exitHandle,
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
