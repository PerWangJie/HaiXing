<template>
  <div class="title">
    <div class="equipment-line">
      产线号：{{line}}
    </div>
    <div class="equipment-class">
      {{dayClass}}
    </div>
    <div class="user">Hi，用户名</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue'

export default defineComponent({
  name: 'title',
  setup() {
    const num: Ref<number> = ref(1)
    const line: Ref<string> = ref('hsg8976')
    const dayClass: Ref<string> = ref('白 班：9:00-12:00') 
    return {
      num,
      line,
      dayClass
    }
  },
});
</script>

<style lang="scss" scoped>

.title {
  width: 100%;
  height: 120px;
  box-sizing: border-box;
  padding: 10px 0;
  display: flex;
  flex-direction: row;
  background: rgba(255, 255, 255, 0.05);
  padding: 0 20px;
  .equipment-line, .equipment-class, .user {
    height: 100%;
    color: #fff;
    font-size: 27px;
    line-height: 120px;
    margin-right: 90px;
  }
  .user {
    flex: 1;
    text-align: right;
  }
}

</style>