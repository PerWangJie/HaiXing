<template>
  <div class="laidOff">
    <div class="button-group">
      <pagination
        :currentSize="currentSize"
        :totalSize="totalSize"
        ref="pagination"
        style="top: 95px; left: -10px"
      ></pagination>
    </div>
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
          <el-button type="text" size="small" @click="laidOffHandle(scope.row)" :disabled="scope.row.ZT == '已下岗'">下岗</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, onMounted, reactive, provide, toRefs } from "vue";
import pagination from "@/components/pagination.vue";
import { StationService } from "@/api/station"
import { ElMessage } from "element-plus";

export default defineComponent({
  name: "classCheck",
  setup() {
    // 当前页码
    let currentSize: Ref<number> = ref(1);
    // 总页码
    let totalSize: Ref<number> = ref(3);
    provide("currentSize", currentSize);
    provide("totalSize", totalSize);
    let data = reactive({
      tableData: []
    })
    const colConfigs: Array<any> = reactive([
      { prop: "GWBM", label: "工位" },
      { prop: "YGBH", label: "人员编码" },
      { prop: "YGXM", label: "员工" },
      { prop: "JHSBSJ", label: "上班时间" },
      { prop: "JHXBSJ", label: "下班时间" },
      { prop: "BXBSJ", label: "下岗时间" },
      { prop: "ZT", label: "状态" },
    ]);
    // 获取下岗列表
    const getList = async (pageSize: number, pageIndex: number) => {
      const laidOffParams = {
        method: "GKJ_ZGRYXX",
        GSH: localStorage.getItem("gsh"),
        CXBM: localStorage.getItem("jgdyh"),
        BCBM: localStorage.getItem("BCBM"),
        pageSize: pageSize,
        pageIndex: pageIndex
      }
      const res = await StationService.laidOffPerson(laidOffParams)
      data.tableData = res.data.list.slice((pageIndex -1) * pageSize, pageSize * pageIndex)
      totalSize.value = Math.ceil(res.data.count/pageSize)
    }
    // 下岗
    const laidOffHandle = async (row: any) => {
      let arr = []
      let obj = {
        YGBH: row.YGBH
      }
      arr.push(obj)
      const laidOffParams = {
        GSH: localStorage.getItem("gsh"),
        CXBM: localStorage.getItem("jgdyh"),
        BCBM: localStorage.getItem("BCBM"),
        CJYH: localStorage.getItem("userid"),
        data: arr
      }
      const res = await StationService.laidOffPersonHandle(laidOffParams)
      if(res.code == 1000) {
        ElMessage.success("下岗成功")
        getList(10, 1)
      }
    }
    onMounted(() => {
      getList(10, 1)
    });
    return {
      totalSize,
      currentSize,
      colConfigs,
      getList,
      ...toRefs(data),
      laidOffHandle
    };
  },
  components: {
    pagination,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.laidOff {
  width: 100%;
  height: 100%;
  & /deep/ .el-dialog {
    width: 620px !important;
    hr {
      color: #D6D6D6;
      margin: 0 0 20px 0;
    }
  }
  .button-group {
    width: 100%;
    height: 80px;
    padding: 0 20px;
    display: flex;
    flex-direction: row;
    .operation-button {
      flex: 1;
      text-align: left;
      z-index: 100;
      .el-button {
        width: 100px;
        height: 40px;
        margin: 20px 20px 0 0;
        &.shadow {
          color: #fff;
          background: rgb(13, 27, 38);
          border: 1px solid #d6d6d6;
        }
      }
    }
  }
}
</style>
