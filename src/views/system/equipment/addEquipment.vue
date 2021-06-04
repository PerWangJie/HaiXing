<template>
  <div class="addEquipment">
    <p class="title">新增加工单元</p>
    <el-form :model="EquipmentForm" ref="equipmentForm" label-position="left">
      <el-form-item label="加工单元编号：" prop="Line">
        <el-select v-model="EquipmentForm.JGDYBH" filterable placeholder="请选择" @change="equipmentChange">
          <el-option
            v-for="item in unitList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称：" prop="Name">
        <el-input v-model="EquipmentForm.Name" :disabled="true"></el-input>
      </el-form-item>
    </el-form>
    <div class="button-group">
      <el-button type="primary" @click="unitAffirm">确认</el-button>
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
import { equipmentService } from "@/api/equipment";
import { ElMessage } from "element-plus";

export default defineComponent({
  name: "addEquipment",
  setup(props, context) {
    const equipmentForm = ref(null);
    // 搜索数据
    let data = reactive({
      EquipmentForm: {
        JGDYBH: "",
        Name: "",
      },
      unitList: []
    });
    // 取消
    const exitHandle = () => {
      router.go(-1);
      const form: any = unref(equipmentForm);
      form.resetFields();
    };
    // 获取加工单元列表
    const getList = async () => {
      const UnitCodeParams = {
        method: "GKJ_GetJGDYBBHDQ",
        GSH: localStorage.getItem("gsh"),
        RYXX: localStorage.getItem("userid"),
      };
      const res = await equipmentService.getUnitCode(UnitCodeParams);
      data.unitList = res.data.list.map((item: any, index: number) => {
        let obj = {
          value: item.SCXBH,
          label: item.SCXMC
        }
        return obj
      })
    }
    // 切换加工单元
    const equipmentChange = (value: any) => {
      data.unitList.map((item: any) => {
        if(value = item.value) {
          data.EquipmentForm.Name = item.label
        }
      })
    }
    // 新增加工单元
    const unitAffirm = async () => {
      const addUnitParams = {
        method: 'GKJ_HXUPDATESBXX',
        GSH: localStorage.getItem('gsh'),
        JGDYBH: data.EquipmentForm.JGDYBH,
        CJR: localStorage.getItem('userid'),
      }
      const res = await equipmentService.addUnit(addUnitParams)
      if (res.code ==1000) {
        ElMessage.success('新增成功')
        router.go(-1)
      }
    }
    onMounted(() => {
      getList();
    });
    return {
      ...toRefs(data),
      equipmentForm,
      exitHandle,
      getList,
      equipmentChange,
      unitAffirm
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
