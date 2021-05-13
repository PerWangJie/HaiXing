<template>
  <div class="product">
    <div class="product-content">
      <div class="product-details">
        <div v-for="(item, index) in List" :key="index">
          <p>{{ item.name }}</p>
          <p>{{ item.value }}</p>
          <p>
            {{ item.total }}
            <span>{{ item.totalNum }}</span>
          </p>
        </div>
      </div>
      <div class="product-image"></div>
      <div class="product-table">
        <p class="title">用料追踪明细</p>
        <el-table :data="tableData" :header-cell-style="{background:'#F2F2F2',color:'#333'}">
          <template v-for="{ prop, label } in colConfigs" :key="prop">
            <el-table-column
              :prop="prop"
              :label="label"
              :show-overflow-tooltip="true"
            />
          </template>
        </el-table>
      </div>
    </div>
    <div class="product-control">
      <right></right>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, reactive } from "vue";
import right from '@/components/right.vue'

export default defineComponent({
  name: "Home",
  setup() {
    const List: Array<any> = reactive([
      { name: "预计耗时", value: "50", total: "总数", totalNum: "2000" },
      { name: "预计耗时", value: "50", total: "总数", totalNum: "2000" },
      { name: "预计耗时", value: "50", total: "总数", totalNum: "2000" },
      { name: "预计耗时", value: "50", total: "总数", totalNum: "2000" },
      { name: "预计耗时", value: "50", total: "总数", totalNum: "2000" },
    ]);
    const colConfigs: Array<any> = reactive([
      { prop: "ItemName", label: "材料名称" },
      { prop: "Spec", label: "材料规格" },
      { prop: "Batch", label: "批号" },
      { prop: "Number", label: "数量" },
    ]);
    return {
      List,
      colConfigs,
    };
  },
  components: {
    right
  },
});
</script>

<style lang="scss" scoped>
.product {
  padding: 0 20px;
  height: 100%;
  display: flex;
  flex-direction: row;
  .product-content {
    width: 1300px;
    height: 100%;
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    .product-details {
      width: 100%;
      height: 120px;
      display: flex;
      flex-direction: row;
      div {
        width: 100%;
        margin-right: 20px;
        justify-content: space-around;
        border-radius: 8px;
        border-left: 8px solid #537bfe;
        box-shadow: 0 0 10px #ccc;
        padding: 13px;
        p {
          color: #333;
          &:first-child {
            font-size: 15px;
            margin: 0;
            text-align: left;
          }
          &:nth-child(2) {
            font-size: 23px;
            margin: 15px 0;
          }
          &:last-child {
            font-size: 15px;
            margin: 0;
            text-align: left;
            span {
              float: right;
            }
          }
        }
      }
    }
    .product-image {
      height: 280px;
      width: 100%;
      margin-bottom: 15px;
    }
    .product-table {
      flex: 1;
      .title {
        color: #333;
        font-size: 15px;
        text-align: left;
        margin: 0 0 10px 0;
      }
    }
  }
  .product-control {
    height: 100%;
    flex: 1;
    padding: 20px 0 20px 20px;
  }
}
</style>
