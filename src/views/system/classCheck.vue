<template>
  <div class="classCheck">
    <div class="classCheck-information">
      <el-tabs v-model="Status" @tab-click="StatusClick">
        <el-tab-pane label="开班登记" name="/classCheck/openClass"></el-tab-pane>
        <el-tab-pane label="离岗登记" name="/classCheck/leaveClass"></el-tab-pane>
        <el-tab-pane label="下岗登记" name="/classCheck/laidOff"></el-tab-pane>
      </el-tabs>
      <div class="classCheck-table">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, onMounted, onBeforeUnmount, reactive, provide } from "vue";
import { useRouter } from 'vue-router'
import { useStore } from "vuex";
import pagination from '@/components/pagination.vue'

export default defineComponent({
  name: "classCheck",
  setup() {
    const router = useRouter()
    const store = useStore();
    // // 当前页码
    // let currentSize: Ref<number> = ref(1)
    // // 总页码
    // let totalSize: Ref<number> = ref(2)

    // provide('currentSize', currentSize)
    // provide('totalSize', totalSize)
    // 选中的状态
    let Status: Ref<string> = ref(`/classCheck/openClass`);
    // 切换状态
    const StatusClick = (tab: any, event: any) => {
      router.push(
        {
          path: tab.props.name
        }
      )
      // currentSize.value = 1
    }
    onMounted(() => {});
    onBeforeUnmount(() => {
      localStorage.setItem("BCBM", "")
    })
    return {
      StatusClick,
      Status,
      // currentSize,
      // totalSize
    };
  },
  components: {
    pagination
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

$gray: "~@/assets/img/button-4.png";
$blue: "~@/assets/img/button-2.png";

.classCheck {
  padding: 0 20px;
  height: 100%;
  display: flex;
  flex-direction: row;
  .classCheck-information {
    width: 100%;
    height: 100%;
    padding: 20px 0;
    position: relative;
    display: flex;
    flex-direction: column;
    .classCheck-table {
      height: 100%;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 8px;
      overflow: hidden;
    }
  }
}
</style>
