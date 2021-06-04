<template>
  <div class="productGroup">
    <div class="productGroup-information">
      <div class="productGroup-new">
        <el-button type="primary" @click="addproductGroupHandle">添加小组</el-button>
        <pagination
          :currentSize="currentSize"
          :totalSize="totalSize"
          ref="pagination"
        ></pagination>
      </div>
      <div class="productGroup-table">
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
              <el-button type="text" size="small">修改</el-button>
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
import { GroupService } from '@/api/group'

export default defineComponent({
  name: "productGroup",
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
        
      ],
    });
    // 表格数据
    const colConfigs: Array<any> = reactive([
      { prop: "XZBH", label: "小组代码" },
      { prop: "xzmc", label: "小组名称" },
      { prop: "CJRQ", label: "维护时间" },
    ]);
    // 新增小组
    const addproductGroupHandle = () => {
      router.push(
        {
          path: '/productGroup/addGroup'
        }
      )
    }
    // 生产小组列表
    const getList = async (pageSize: number, pageIndex: number) => {
      const GroupParams = {
        method: 'GKJ_HXGetSCXZ',
        ZYXM: localStorage.getItem('username'),
        pageSize: pageSize,
        pageIndex: pageIndex
      }
      const res = await GroupService.getGroup(GroupParams)
      data.tableData = res.data.list
      data.tableData = res.data.list.slice((pageIndex -1) * pageSize, pageSize * pageIndex)
      totalSize.value = Math.ceil(res.data.count/pageSize)
    }
    onMounted(() => {
      getList(10, 1)
    });
    return {
      ...toRefs(data),
      totalSize,
      currentSize,
      colConfigs,
      addproductGroupHandle,
      getList
    };
  },
  components: {
    pagination,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.productGroup {
  padding: 0 20px;
  height: 100%;
  display: flex;
  flex-direction: row;
  .productGroup-information {
    width: 100%;
    height: 100%;
    padding: 20px 0;
    position: relative;
    display: flex;
    flex-direction: column;
    .productGroup-new {
      position: relative;
      width: 100%;
      display: flex;
      margin-bottom: 20px;
      .el-button {
        z-index: 100;
      }
    }
  }
  .productGroup-table {
    height: 100%;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
  }
}
</style>
