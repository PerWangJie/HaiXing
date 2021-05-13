<template>
  <div class="title">
    <div class="equipment-information">
      <p class="equipment-code">
        设备
        <span>0101051</span>
      </p>
      <p class="machine-unit">五十一加工单元</p>
    </div>
    <div class="product-information">
      <div>MO20200602003</div>
      <div>RO20 EPB右钳体</div>
      <div>30*15</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue'

export default defineComponent({
  name: 'title',
  setup() {
    const num: Ref<number> = ref(1)
    return {
      num
    }
  },
});
</script>

<style lang="scss" scoped>

.title {
  display: flex;
  width: 100%;
  height: 120px;
  box-sizing: border-box;
  padding: 10px 0;
  border-bottom: 1px solid #D6D6D6;
  display: flex;
  flex-direction: row;
  .equipment-information {
    width: 400px;
    height: 100%;
    padding: 15px 20px;
    border-right: 1px solid #537BFE;
    color: #333;
    p.equipment-code {
      margin: 0;
      font-size: 17px;
      text-align: left;
      span {
        font-size: 17px;
        float: right;
      }
    }
    p.machine-unit {
      font-size: 22px;
    }
  }
  .product-information {
    flex: 1;
    display: flex;
    flex-direction: row;
    div {
      font-size: 18px;
      color: #333;
      margin: 40px 80px 0 20px;
    }
  }
}

</style>