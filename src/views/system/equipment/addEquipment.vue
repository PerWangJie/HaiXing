<template>
  <div class="addEquipment">
    <p class="title">新增叫料单</p>
    <el-form
      :model="EquipmentForm"
      ref="equipmentForm"
      label-width="150px"
      label-position="left"
    >
      <el-form-item label="产线标志：" prop="Line">
        <el-input v-model="EquipmentForm.Line"></el-input>
      </el-form-item>
      <el-form-item label="设备编号：" prop="LineName">
        <el-input v-model="EquipmentForm.LineName"></el-input>
      </el-form-item>
      <el-form-item label="设备名称：" prop="Spec">
        <el-input v-model="EquipmentForm.Spec"></el-input>
      </el-form-item>
      <el-form-item label="备注说明：" prop="People">
        <el-input v-model="EquipmentForm.People" type="textarea"></el-input>
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
  name: "addEquipment",
  setup(props, context) {
    const equipmentForm = ref(null);
    // 搜索数据
    let data = reactive({
      EquipmentForm: {
        Line: "",
        LineName: "",
        Spec: "",
        People: "",
      },
    });
    // 取消
    const exitHandle = () => {
      router.go(-1);
      const form: any = unref(equipmentForm);
      form.resetFields();
    };
    onMounted(() => {});
    return {
      ...toRefs(data),
      equipmentForm,
      exitHandle,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.addEquipment {
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
