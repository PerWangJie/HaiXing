<template>
  <div class="title">
    <div class="equipment-line">产线号：{{ line }}</div>
    <div class="equipment-class">
      {{ dayClass }}
    </div>
    <el-dropdown :hide-on-click="false">
      <span class="el-dropdown-link">
        Hi，{{ userName }}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="exitLogin">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <!-- <div class="user">Hi，{{userName}}</div> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, Ref, ref, toRefs, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  name: "title",
  setup() {
    const router = useRouter();
    const store = useStore();
    let data = reactive({
      userName: localStorage.getItem("username"),
      line: store.state.jgdyh
    });
    const num: Ref<number> = ref(1);
    const dayClass: Ref<string> = ref("白 班：9:00-12:00");
    const exitLogin = () => {
      console.log(222)
      router.push({
        path: '/login'
      })
    }
    onMounted(() => {
      setInterval(() => {
        data.line = localStorage.getItem("jgdyh")
      }, 500);
    });
    return {
      num,
      dayClass,
      ...toRefs(data),
      exitLogin
    };
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
  position: relative;
  padding: 0 20px;
  .equipment-line,
  .equipment-class,
  .user {
    height: 100%;
    color: #fff;
    font-size: 27px;
    line-height: 120px;
    margin-right: 90px;
  }
  & /deep/ .el-dropdown {
    position: absolute;
    right: 40px;
    top: 40px;
    .el-dropdown-link {
      color: #fff;
      font-size: 27px;
    }
  }
  // .user {
  //   flex: 1;
  //   text-align: right;
  // }
}
</style>