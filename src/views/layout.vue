<template>
  <div class="layout">
    <nav-tag></nav-tag>
    <div class="main-content">
      <title-nav></title-nav>
      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from "vue";
import navTag from "@/components/navTag.vue";
import titleNav from "@/components/title.vue";

export default defineComponent({
  name: "layout",
  setup() {
    const num: Ref<number> = ref(1);
    return {
      num,
    };
  },
  components: {
    navTag,
    titleNav,
  },
});
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: row;
  .main-content {
    width: 1720px;
    height: 100%;
    display: flex;
    flex-direction: column;
    .content {
      width: 100%;
      flex: 1;
    }
  }
}
</style>