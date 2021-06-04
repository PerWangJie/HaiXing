<template>
  <div class="login">
    <div class="login-box">
      <p class="login-title">智能化车间系统</p>
      <p class="login-user">- 用户登录 -</p>
      <el-input
        v-model="user.userName"
        placeholder="用户名"
        @blur="userBlur"
      ></el-input>
      <el-input v-model="user.password" placeholder="密码"></el-input>
      <el-select
        v-model="user.SCXBH"
        placeholder="请选择"
        @change="OrderChange"
      >
        <el-option
          v-for="item in orderList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-button @click="loginHandle">登 录</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, Ref, ref, toRefs } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { UserService } from "@/api/login";
import { UnitService } from "@/api/unit";
import { ElMessage } from "element-plus"

// 用户信息
interface User {
  userName: string;
  password: string;
  Order: number;
}

export default defineComponent({
  name: "login",
  setup() {
    const store = useStore();
    const router = useRouter();
    let data = reactive({
      user: {
        userName: "",
        password: "",
        SCXBH: "",
        SCXMC: ""
      },
      orderList: [{ value: "", label: "", GSH: "" }],
      GSH: "",
    });
    // http://122.51.182.66:3019/api/do?method=Agv_APP_HXYZDLXX&ygbh=admin&mm=eossoft2019
    // 登录
    const loginHandle = async () => {
      const loginParams = {
        method: "Agv_APP_HXYZDLXX",
        ygbh: data.user.userName,
        mm: data.user.password,
      };
      const res = await UserService.login(loginParams);
      if (res.code == 1000) {
        store.commit("SET_GSH", data.GSH);
        store.commit("SET_JGDYH", data.user.SCXBH);
        store.commit("SET_JGDYMC", data.user.SCXMC);
        store.commit("SET_USERID", res.data.list[0].userid);
        store.commit("SET_USERNAME", res.data.list[0].username);
        router.push({
          path: "/product",
        })
        ElMessage.success('登录成功')
      }
    };
    // 获取加工单元
    const userBlur = async () => {
      const UnitParams = {
        method: "GKJ_HXGetJGDY",
        RYXX: data.user.userName,
      };
      const res = await UnitService.getUnit(UnitParams);
      data.orderList = res.data.list.map((item: any) => {
        let obj = {
          value: item.SCXBH,
          label: item.SCXMC,
          GSH: item.GSH,
        };
        return obj;
      });
      console.log(data.orderList)
      data.user.SCXBH = data.orderList[0].value;
      data.user.SCXMC = data.orderList[0].label;
      data.GSH = data.orderList[0].GSH;
    };
    // 切换加工单元
    const OrderChange = (value: string) => {
      data.orderList.map((item) => {
        if ((item.value = value)) {
          data.GSH = item.GSH;
        }
      });
    };
    return {
      ...toRefs(data),
      loginHandle,
      userBlur,
      OrderChange,
    };
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
      color: #fefefe;
    }
    .login-user {
      margin: 0 0 60px 0;
      font-size: 48px;
      font-family: Microsoft YaHei;
      color: #fefefe;
      letter-spacing: 15px;
    }
    .el-input {
      width: 100%;
      height: 60px !important;
      margin-bottom: 30px;
      & /deep/ .el-input__inner {
        height: 100% !important;
        border-radius: 8px;
        font-size: 22px;
      }
    }
    .el-select {
      width: 100%;
      height: 60px !important;
      margin-bottom: 30px;
      & /deep/ .select-trigger {
        height: 60px !important;
      }
      & /deep/ .el-input {
        height: 60px !important;
      }
      & /deep/ .el-input__suffix {
        top: 10px !important;
      }
      & /deep/ .el-input__inner {
        height: 100% !important;
        border-radius: 8px;
        font-size: 22px;
      }
    }
    .el-button {
      width: 100%;
      height: 70px;
      background: #537bfe;
      color: #fff;
      font-size: 36px;
      border-radius: 8px;
      border: none;
      margin-top: 30px;
    }
  }
}
</style>