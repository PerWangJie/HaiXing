<template>
  <div class="addLine">
    <p class="title">新增叫料单</p>
    <el-form
      :model="LineForm"
      ref="lineForm"
      label-width="150px"
      label-position="left"
    >
      <el-form-item label="加工单元：" prop="Line">
        <el-input v-model="LineForm.Line"></el-input>
      </el-form-item>
      <el-form-item label="销售订单号：" prop="LineName">
        <el-input v-model="LineForm.LineName"></el-input>
      </el-form-item>
      <el-form-item label="任务单号：" prop="Spec">
        <el-input v-model="LineForm.Spec"></el-input>
      </el-form-item>
      <el-form-item label="任务类型：" prop="Count">
        <el-select v-model="LineForm.Count" placeholder="请选择">
          <el-option
            v-for="item in faultList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="物品名称：" prop="Order">
        <el-input v-model="LineForm.Order"></el-input>
      </el-form-item>
      <el-form-item label="规格：" prop="Remark">
        <el-input v-model="LineForm.Remark" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="批号：" prop="Level">
        <el-input v-model="LineForm.Level" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="生产日期：" prop="Time">
        <el-date-picker v-model="LineForm.Time" type="date" placeholder="选择日期">
        </el-date-picker>
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
    const lineForm = ref(null);
    // 搜索数据
    let data = reactive({
      LineForm: {
        Line: "",
        LineName: "",
        Spec: "",
        Count: "",
        Level: "",
        Order: "",
        Remark: "",
        Time: "",
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
      const form: any = unref(lineForm);
      form.resetFields();
    };
    onMounted(() => {});
    return {
      ...toRefs(data),
      lineForm,
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
