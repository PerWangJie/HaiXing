<template>
  <div class="addLine">
    <p class="title">新增叫料单</p>
    <el-form
      :model="LineForm"
      ref="lineForm"
      label-width="120px"
      label-position="left"
    >
      <el-form-item label="需求产线：" prop="Line">
        <el-input v-model="LineForm.Line"></el-input>
      </el-form-item>
      <el-form-item label="产线名称：" prop="LineName">
        <el-input v-model="LineForm.LineName"></el-input>
      </el-form-item>
      <el-form-item label="物品号：" prop="ItemNo">
        <el-input v-model="LineForm.ItemNo"></el-input>
      </el-form-item>
      <el-form-item label="物品名称：" prop="ItemName">
        <el-input v-model="LineForm.ItemName"></el-input>
      </el-form-item>
      <el-form-item label="规格描述：" prop="Spec">
        <el-input v-model="LineForm.Spec"></el-input>
      </el-form-item>
      <el-form-item label="单位：" prop="Unit">
        <el-input v-model="LineForm.Unit"></el-input>
      </el-form-item>
      <el-form-item label="需求数量：" prop="Count">
        <el-input v-model="LineForm.Count"></el-input>
      </el-form-item>
      <el-form-item label="紧急等级：" prop="Level">
        <!-- <el-input v-model="LineForm.Level"></el-input> -->
        <el-radio-group v-model="LineForm.Level">
          <el-radio :label="1">备选项</el-radio>
          <el-radio :label="2">备选项</el-radio>
          <el-radio :label="3">备选项</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="关联工单号：" prop="Order">
        <el-input v-model="LineForm.Order"></el-input>
      </el-form-item>
      <el-form-item label="备注：" prop="Remark">
        <el-input v-model="LineForm.Remark"></el-input>
      </el-form-item>
      <el-form-item label="叫料时间：" prop="Time">
        <el-input v-model="LineForm.Time"></el-input>
      </el-form-item>
      <el-form-item label="叫料人：" prop="People">
        <el-input v-model="LineForm.People"></el-input>
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
        ItemNo: "",
        ItemName: "",
        Spec: "",
        Unit: "",
        Count: "",
        Level: 1,
        Order: "",
        Remark: "",
        Time: "",
        People: "",
      }
    })
    // 取消
    const exitHandle = () => {
      router.go(-1)
      const form: any = unref(lineForm);
      form.resetFields()
    }
    onMounted(() => {});
    return {
      ...toRefs(data),
      lineForm,
      exitHandle
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
      .el-input {
        width: 500px;
      }
    }
    .el-radio__label {
      color: #FFF;
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
