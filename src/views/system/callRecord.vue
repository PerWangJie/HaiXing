<template>
  <div class="callRecord">
    <div class="callRecord-information">
      <div class="callRecord-new">
        <el-button type="primary" @click="callHandle">呼叫</el-button>
        <pagination
          :currentSize="currentSize"
          :totalSize="totalSize"
          ref="pagination"
        ></pagination>
      </div>
      <div class="callRecord-table">
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
              <el-button type="text" size="small">响应</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-dialog v-model="callVisible" center class="callDialog">
        <div style="margin-bottom: 25px;">
          <p class="title">选择异常类型</p>
          <el-button
            :class="[{ shadow: true }, { active: item.isChecked }]"
            v-for="(item, index) in typeList"
            :key="index"
            @click="changeType(item, index)"
            >{{ item.value }}</el-button
          >
        </div>
        <div>
          <p class="title">选择呼叫等级</p>
          <el-button
            :class="[{ shadow: true }, { active: item.isChecked }]"
            v-for="(item, index) in levelList"
            :key="index"
            @click="changeLevel(item, index)"
            >{{ item.value }}</el-button
          >
        </div>
        <template #footer>
          <span class="dialog-footer">
            <el-button type="primary" @click="callVisible = false"
              >确 定</el-button
            >
            <el-button @click="callVisible = false" class="shadow"
              >取 消</el-button
            >
          </span>
        </template>
      </el-dialog>
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
  toRefs,
} from "vue";
import pagination from "@/components/pagination.vue";

export default defineComponent({
  name: "callRecord",
  setup(props, context) {
    // 当前页码
    let currentSize: Ref<number> = ref(1);
    // 总页码
    let totalSize: Ref<number> = ref(3);
    provide("currentSize", currentSize);
    provide("totalSize", totalSize);
    // 搜索数据
    let data = reactive({
      callVisible: false,
      tableData: [
        {
          Number: 1,
          Type: 1,
          ItemName: 1,
          process: 1,
        },
        {
          Number: 1,
          Type: 1,
          ItemName: 1,
          process: 1,
        },
      ],
      // 异常类型列表
      typeList: [
        {value: '设备异常', isChecked: true},
        {value: '质量异常', isChecked: false},
        {value: '工艺异常', isChecked: false},
        {value: '工装异常', isChecked: false}
      ],
      // 呼叫等级列表
      levelList: [
        {value: '预警', isChecked: true},
        {value: '警告', isChecked: false},
        {value: '三级', isChecked: false},
        {value: '四级', isChecked: false},
        {value: '五级', isChecked: false}
      ]
    });
    // 表格数据
    const colConfigs: Array<any> = reactive([
      { prop: "Unit", label: "加工单元" },
      { prop: "Date", label: "班次日期" },
      { prop: "Number", label: "班次编码" },
      { prop: "Type", label: "班次名称" },
      { prop: "ItemName", label: "班次时间" },
      { prop: "process", label: "创建人" },
      { prop: "Time", label: "创建时间" },
      { prop: "Status", label: "状态" },
    ]);
    // 弹出异常框
    const callHandle = () => {
      data.callVisible = true;
    }
    // 选择异常类型
    const changeType = (item: any, index: number) => {
      data.typeList.map(_item => {
        _item.isChecked = false
      })
      item.isChecked = true
    }
    // 选择呼叫等级
    const changeLevel = (item: any, index: number) => {
      data.levelList.map(_item => {
        _item.isChecked = false
      })
      item.isChecked = true
    }
    onMounted(() => {});
    return {
      ...toRefs(data),
      totalSize,
      currentSize,
      colConfigs,
      callHandle,
      changeType,
      changeLevel
    };
  },
  components: {
    pagination,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.callRecord {
  padding: 0 20px;
  height: 100%;
  display: flex;
  flex-direction: row;
  & /deep/ .el-dialog {
    width: 640px !important;
    .title {
      margin: 0 0 20px 0;
      text-align: left;
      color: #fff;
      font-size: 20px;
    }
    .el-button {
      &.shadow {
        color: #fff;
        background: rgb(13, 27, 38);
        border: 1px solid #d6d6d6;
      }
      &.active {
        background: #237ae4;
        border: none !important;
      }
    }
  }
  .callRecord-information {
    width: 100%;
    height: 100%;
    padding: 20px 0;
    position: relative;
    display: flex;
    flex-direction: column;
    .callRecord-new {
      position: relative;
      width: 100%;
      display: flex;
      margin-bottom: 20px;
      .el-button {
        z-index: 100;
      }
    }
  }
  .callRecord-table {
    height: 100%;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
  }
}
</style>
