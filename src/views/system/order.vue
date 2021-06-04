<template>
  <div class="order">
    <div class="order-information">
      <el-tabs v-model="Status" @tab-click="StatusClick">
        <el-tab-pane label="执行中" name="first"></el-tab-pane>
        <el-tab-pane label="待执行" name="second"></el-tab-pane>
      </el-tabs>
      <pagination
        :currentSize="currentSize"
        :totalSize="totalSize"
        ref="pagination"
        v-show="Status == 'second'"
      ></pagination>
      <div class="order-table">
        <div class="button-group">
          <div class="operation-button">
            <el-button type="primary">确定</el-button>
            <el-button class="shadow">取消</el-button>
          </div>
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
          <el-table-column fixed="right" label="操作" width="170">
            <template #default="scope">
              <el-button type="text" size="small" @click="startWorkHandle(scope.row)">开工</el-button>
              <el-button type="text" size="small">查看SOP</el-button>
              <el-button type="text" size="small">查看图纸</el-button>
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
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import pagination from "@/components/pagination.vue";
import { OrderService } from "@/api/order";
import { ElMessage } from "element-plus"

export default defineComponent({
  name: "order",
  setup() {
    const router = useRouter();
    const store = useStore();
    let data = reactive({
      Status: "first",
      tableData: [
        {}
      ],
    });
    const colConfigs: Array<any> = reactive([
      { prop: "SCRWH", label: "任务单号" },
      { prop: "RWLX", label: "任务类型" },
      { prop: "WPMC", label: "物品名称" },
      { prop: "GG", label: "规格" },
      { prop: "PH", label: "批号" },
      { prop: "GXMC", label: "工序" },
      { prop: "JHSL", label: "进度" }
    ]);
    // 当前页码
    let currentSize: Ref<number> = ref(1);
    // 总页码
    let totalSize: Ref<number> = ref(3);

    provide("currentSize", currentSize);
    provide("totalSize", totalSize)

    // 获取执行中列表
    const getList = async (value: number) => {
      data.tableData = []
      if(value == 1) {
        const OrderParams = {
          method: 'GKJ_GetZXZGD',
          gsh: localStorage.getItem('gsh'),
          jgdybh: localStorage.getItem('jgdyh'),
          pagesize: 10,
          pagesindex:1
        }
        const res = await OrderService.getOrder(OrderParams)
        res.data.list.map((item: any, index: number) => {
          item.JHSL = `${item.JHSL}/${item.BGSL}`
          data.tableData.push({...item});
        });
      } else if (value == 2) {
        const OrderParams = {
          method: 'GKJ_GetDZXGD',
          gsh: localStorage.getItem('gsh'),
          jgdybh: localStorage.getItem('jgdyh'),
          pagesize: 10,
          pagesindex:1
        }
        const res = await OrderService.getOrder(OrderParams)
        data.tableData = res.data.list
      }
    }
    // 切换状态
    const StatusClick = (tab: any, event: any) => {
      if(tab.props.name == 'first') {
        getList(1)
      } else if (tab.props.name == 'second') {
        getList(2)
      }
    }
    // 开工
    const startWorkHandle = async (row: any) => {
      const StatusParams = {
        method: 'app_jgdygdxx_update',
        ZTID: localStorage.getItem('gsh'),
        SCXBH: localStorage.getItem('jgdyh'),
        RWDH: row.SCRWH,
        GXH: row.GXH,
        ZT: 1
      }
      store.commit("SET_RWDH", row.SCRWH)
      const res = await OrderService.orderStatus(StatusParams)
      if (res.code == 1000) {
        router.push(
          {
            path: '/product'
          }
        )
        ElMessage.success('开工成功')
      }
    }
    onMounted(() => {
      getList(1)
    })
    return {
      ...toRefs(data),
      currentSize,
      totalSize,
      colConfigs,
      getList,
      StatusClick,
      startWorkHandle
    };
  },
  components: {
    pagination,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$gray: "~@/assets/img/button-4.png";
$blue: "~@/assets/img/button-2.png";

.order {
  padding: 0 20px;
  height: 100%;
  display: flex;
  flex-direction: row;
  .order-information {
    width: 100%;
    height: 100%;
    padding: 20px 0;
    position: relative;
    display: flex;
    flex-direction: column;
    & /deep/ .el-tabs__active-bar {
      background: none;
    }
    & /deep/ .el-tabs__nav-wrap::after {
      width: 0;
    }
    & /deep/ .el-tabs__item {
      width: 120px;
      height: 40px;
      padding: 0;
      color: #fff;
      &.is-active {
        background: linear-gradient(
          0deg,
          #537bfe 0%,
          rgba(83, 123, 254, 0) 100%
        );
        color: #fff;
      }
    }
    .order-table {
      height: 100%;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 8px;
      overflow: hidden;
      .button-group {
        width: 100%;
        height: 80px;
        padding: 0 20px;
        display: flex;
        flex-direction: row;
        .operation-button {
          flex: 1;
          text-align: right;
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
  }
}
</style>
