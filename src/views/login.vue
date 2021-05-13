<template>
  <div class="login">
    <div class="login-box">
      <p class="login-title">智能化车间系统</p>
      <p class="login-user">- 用户登录 -</p>
      <el-input v-model="user.userName" placeholder="用户名"></el-input>
      <el-input v-model="user.password" placeholder="密码"></el-input>
      <el-button>登 录</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, Ref, ref } from 'vue'

// 用户信息
interface User {
  userName: string;
  password: string;
}

export default defineComponent({
  name: 'login',
  setup() {
    const user: User = reactive({
      userName: '',
      password: ''
    })
    return {
      user
    }
  },
});
</script>

<style lang="scss" scoped>

$circle: "~@/assets/img/bg.png";

.login {
  width: 100%;
  height: 100%;
  background: url($circle) no-repeat;
  background-size: 100% 100%;
  position: relative;
  .login-box {
    width: 720px;
    height: 720px;
    position: absolute;
    top: 50%;
    right: 140px;
    transform: translate(0, -360px);
    background: rgba(255, 255, 255, 0.4);
    border-radius: 19px;
    padding: 70px 60px 90px 60px;
    .login-title {
      margin: 0 0 20px 0;
      font-size: 60px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #FEFEFE;
    }
    .login-user {
      margin: 0 0 60px 0;
      font-size: 48px;
      font-family: Microsoft YaHei;
      color: #FEFEFE;
      letter-spacing: 15px;
    }
    .el-input {
      width: 100%;
      height: 70px;
      margin-bottom: 50px;
      & /deep/ .el-input__inner {
        height: 100%;
        border-radius: 8px;
        font-size: 22px;
      }
    }
    .el-button {
      width: 100%;
      height: 70px;
      background: #537BFE;
      color: #FFF;
      font-size: 36px;
      border-radius: 8px;
      border: none;
      margin-top: 30px;
    }
  }
}

</style>