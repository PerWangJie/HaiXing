<template>
  <div class="right">
    <el-button>换班次</el-button>
    <el-button>工位登记</el-button>
    <el-button>变更状态</el-button>
    <div class="product-status"></div>
    <el-button>切换加工单元</el-button>
    <el-button>产出登记</el-button>
    <el-button>缺陷登记</el-button>
    <el-button class="call-response">呼叫</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, onMounted, reactive } from 'vue';

export default defineComponent({
  name: 'right',
  setup() {
    onMounted(() => {
      
    })
    return {
      
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.right {
  height: 100%;
  display: flex;
  flex-flow: column wrap;
  position: relative;
  .product-status {
    width: 100%;
    height: 160px;
    margin: 0 0 20px 0;
    box-shadow: 0 0 10px #ccc;
  }
  .el-button {
    width: 100%;
    height: 60px;
    margin: 0 0 20px 0;
    box-shadow: 0 0 10px #ccc;
  }
  .call-response {
    margin-bottom: 0;
    position: absolute;
    bottom: 0;
  }
}

</style>
