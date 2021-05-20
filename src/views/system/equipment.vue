<template>
  <div class="equipment">
    <div class="equipment-information">
      <div class="equipment-new">
        <el-button type="primary" @click="addEquipmentHandle">添加设备</el-button>
        <pagination
          :currentSize="currentSize"
          :totalSize="totalSize"
          ref="pagination"
        ></pagination>
      </div>
      <div class="equipment-table">
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
          <el-table-column fixed="right" label="操作" width="120">
            <template #default="scope">
              <el-button type="text" size="small">编辑</el-button>
              <el-button type="text" size="small">删除</el-button>
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
  toRefs,
} from "vue";
import { useRouter } from 'vue-router'
import pagination from "@/components/pagination.vue";

export default defineComponent({
  name: "equipment",
  setup(props, context) {
    const router = useRouter()
    // 当前页码
    let currentSize: Ref<number> = ref(1);
    // 总页码
    let totalSize: Ref<number> = ref(3);
    provide("currentSize", currentSize);
    provide("totalSize", totalSize);
    // 搜索数据
    let data = reactive({
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
    });
    // 表格数据
    const colConfigs: Array<any> = reactive([
      { prop: "Number", label: "设备产线标志" },
      { prop: "Type", label: "设备编号" },
      { prop: "ItemName", label: "设备名称" },
      { prop: "process", label: "备注说明" }
    ]);
    // 新增叫料单
    const addEquipmentHandle = () => {
      router.push(
        {
          path: '/equipment/addEquipment'
        }
      )
    }
    onMounted(() => {});
    return {
      ...toRefs(data),
      totalSize,
      currentSize,
      colConfigs,
      addEquipmentHandle
    };
  },
  components: {
    pagination,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.equipment {
  padding: 0 20px;
  height: 100%;
  display: flex;
  flex-direction: row;
  .equipment-information {
    width: 100%;
    height: 100%;
    padding: 20px 0;
    position: relative;
    display: flex;
    flex-direction: column;
    .equipment-new {
      position: relative;
      width: 100%;
      display: flex;
      margin-bottom: 20px;
      .el-button {
        z-index: 100;
      }
    }
  }
  .equipment-table {
    height: 100%;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
  }
}
</style>
