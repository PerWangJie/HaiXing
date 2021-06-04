<template>
  <div class="addGroup">
    <p class="title">新增小组</p>
    <el-form :model="GroupForm" ref="groupForm" label-position="left">
      <el-form-item label="小组代码：" prop="Line">
        <el-input v-model="GroupForm.Line"></el-input>
      </el-form-item>
      <el-form-item label="小组名称：" prop="LineName">
        <el-input v-model="GroupForm.LineName"></el-input>
      </el-form-item>
    </el-form>
    <div class="add-staff">
      <el-button type="primary" @click="addStaffHandle">添加员工</el-button>
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
        <el-table-column prop="DemQuantity" label="分配系数">
          <template #default="scope">
            <el-input
              v-model.number="scope.row.DemQuantity"
              placeholder="请输入"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template #default="scope">
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="button-group">
      <el-button type="primary">确认</el-button>
      <el-button class="shadow" @click="exitHandle">取消</el-button>
    </div>
    <el-dialog v-model="groupVisible" center>
      <div class="choose-staff">
        <div class="search-staff">
          <el-input v-model="staff" :width="200"></el-input>
          <el-button type="primary" @click="searchHandle">查询</el-button>
        </div>
        <div class="staff-table">
          <el-table
            :data="staffData"
            @selection-change="staffChange"
            :header-cell-style="{
              background: 'rgb(25, 39, 49)',
              color: '#FFF',
            }"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column prop="number" label="员工工号"> </el-table-column>
            <el-table-column prop="name" label="员工姓名"> </el-table-column>
          </el-table>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="groupVisible = false" class="shadow"
            >取 消</el-button
          >
          <el-button type="primary" @click="groupVisible = false"
            >确 定</el-button
          >
        </span>
      </template>
    </el-dialog>
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
  name: "addGroup",
  setup(props, context) {
    const groupForm = ref(null);
    // 搜索数据
    let data = reactive({
      groupVisible: false,
      staff: "",
      GroupForm: {
        Line: "",
        LineName: "",
      },
      tableData: [
        {
          Number: "1",
          Type: "1",
          ItemName: "1",
        },
      ],
      staffData: [{ number: "11", name: "11" }],
    });
    // 表格数据
    const colConfigs: Array<any> = reactive([
      { prop: "Number", label: "员工工号" },
      { prop: "Type", label: "组员姓名" },
    ]);
    // 新增员工
    const addStaffHandle = () => {
      data.groupVisible = true;
    };
    // 搜索员工
    const searchHandle = () => {
      console.log(data.staff)
    }
    // 选择员工
    const staffChange = (selection: any) => {
      console.log(selection)
    }
    // 取消
    const exitHandle = () => {
      router.go(-1);
      const form: any = unref(groupForm);
      form.resetFields();
    };
    onMounted(() => {});
    return {
      ...toRefs(data),
      groupForm,
      colConfigs,
      addStaffHandle,
      searchHandle,
      staffChange,
      exitHandle,
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
      width: 600px;
      max-height: 50vh;
      overflow: auto;
    }
  }
  & /deep/ .el-dialog {
    width: 600px !important;
    .choose-staff {
      width: 100%;
      .search-staff {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        .el-input {
          width: 200px !important;
          margin-right: 10px;
        }
      }
      .staff-table {
        width: 100%;
        height: 210px;
        overflow: hidden;
        background: rgb(13, 27, 38);
        margin-top: 20px;
      }
    }
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
