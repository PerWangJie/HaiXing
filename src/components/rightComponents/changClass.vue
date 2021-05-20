<template>
  <div class="changClass">
    <el-dialog title="切换班次" v-model="classVisible" width="30%" center>
      <span>需要注意的是内容是默认不居中的</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="classVisible = false">取 消</el-button>
          <el-button type="primary" @click="classVisible = false"
            >确 定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from "vue";

export default defineComponent({
  name: "changClass",
  setup() {
    let classVisible: Ref<boolean> = ref(false);
    return {
      classVisible,
    };
  },
});
</script>

<style lang="scss" scoped>
.changClass {
  & /deep/ .el-dialog {
    width: 380px !important;
    .el-dialog__header {
      background: rgba(83, 123, 254, 0.15);
      height: 64px;
      line-height: 64px;
      font-size: 16px;
      padding: 0;
    }
    .el-dialog__headerbtn {
      display: none;
    }
  }
}
</style>