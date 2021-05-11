<template>
  <div class="product">
    <div class="product-content">
      <div class="product-details">
        <div v-for="(item, index) in List" :key="index"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, reactive } from "vue";

export default defineComponent({
  name: "Home",
  setup() {
    const List: Array<any> = reactive([{}, {}, {}, {}, {}])
    return {
      List,
    };
  },
  components: {},
});
</script>

<style lang="scss" scoped>
.product {
  padding: 0 0 0 20px;
  .product-content {
    width: 1300px;
    height: 100%;
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
        border-right: 8px solid #537bfe;
        box-shadow: 0px 10px 10px #ccc;
      }
    }
  }
}
</style>
