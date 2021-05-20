<template>
  <div class="product">
    <div class="product-chart">
      <div class="top-chart">
        <div class="product-order">
          <el-form
            ref="form"
            :model="form"
            label-width="100px"
            label-position="left"
          >
            <el-form-item label="当前工单：" prop="ItemNo">
              <el-input v-model="form.order" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="计划数量：" prop="ItemNo">
              <el-input v-model="form.planCount" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="产品名称：" prop="ItemNo">
              <el-input v-model="form.itemName" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="规格型号：" prop="ItemNo">
              <el-input v-model="form.spec" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="产量：">
              <span class="precent">8600 / 10000</span>
            </el-form-item>
          </el-form>
          <el-progress
            :text-inside="true"
            :stroke-width="20"
            :percentage="50"
          ></el-progress>
          <div class="bottom-group">
            <button class="green">开始生产</button>
            <button class="blue">暂停生产</button>
            <button class="right red">结束生产</button>
            <button class="bottom blue">选择工单</button>
            <button class="bottom blue">时间认领</button>
            <button class="bottom right blue">不合格品登记</button>
          </div>
        </div>
        <div class="product-problem">
          <div class="quality-problem">
            <p>质量问题分类统计</p>
            <div>
              <pie-chart></pie-chart>
            </div>
          </div>
          <div class="oee-time">
            <p>实时OEE</p>
            <div>
              <gauge-chart></gauge-chart>
              <div class="gauge"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="bottom-chart">
        <p class="title">设备时间工作状态图</p>
        <div class="bar-time">
          <bar-chart></bar-chart>
        </div>
        <div class="line-time">
          <line-chart></line-chart>
        </div>
      </div>
    </div>
    <div class="product-control">
      <div class="product-status">
        <div class="status">
          <div>
            <div :class="['icon', statusNumber == 1 ? 'green' : 'gray']">
              <div class="out-circle">
                <div class="in-circle"></div>
              </div>
            </div>
            正常
          </div>
          <div>
            <div
              class="icon"
              :class="['icon', statusNumber == 2 ? 'red' : 'gray']"
            >
              <div class="out-circle">
                <div class="in-circle"></div>
              </div>
            </div>
            故障
          </div>
          <div>
            <div
              class="icon"
              :class="['icon', statusNumber == 3 ? 'yellow' : 'gray']"
            >
              <div class="out-circle">
                <div class="in-circle"></div>
              </div>
            </div>
            停机
          </div>
        </div>
        <div class="change-status">
          <button>切换加工单元</button>
          <button>变更状态</button>
        </div>
        <div class="warn-information">
          <p class="title">报警信息</p>
          <div class="information-content">
            <ul>
              <li v-for="(item, index) in inforList" :key="index">
                {{ item.value }}
              </li>
            </ul>
          </div>
        </div>
        <div class="bottm-button">
          <el-button type="primary">查看图纸</el-button>
          <el-button type="primary" class="right" @click="sopCheck">查看SOP</el-button>
          <el-button type="primary" @click="classCheck">开班登记</el-button>
          <el-button type="primary" class="right">报工</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, reactive } from "vue";
import { useRouter } from 'vue-router'
import pieChart from "@/components/chart/pieChart.vue";
import gaugeChart from "@/components/chart/gaugeChart.vue";
import barChart from "@/components/chart/barChart.vue";
import lineChart from "@/components/chart/lineChart.vue";

// 当前工单接口
interface Order {
  order: string;
  planCount: number;
  itemName: string;
  spec: string;
}

export default defineComponent({
  name: "Home",
  setup() {
    // 定义路由
    const router = useRouter()
    // 报警信息
    const inforList: Array<any> = reactive([
      { value: "滚动显示报警信息（报警原因、报警信息）" },
    ]);
    // 当前工单
    let form: Order = reactive({
      order: "GD281648724",
      planCount: 10000,
      itemName: "保温杯（粉色卡通款）",
      spec: "600ml",
    });
    // SOP查看
    const sopCheck = () => {
      router.push(
        {
          path: '/sopCheck'
        }
      )
    }
    // 开班登记
    const classCheck = () => {
      router.push(
        {
          path: '/classCheck/openClass'
        }
      )
    }
    return {
      form,
      inforList,
      sopCheck,
      classCheck
    };
  },
  components: {
    pieChart,
    gaugeChart,
    barChart,
    lineChart,
  },
});
</script>

<style lang="scss" scoped>
$red: "~@/assets/img/button-3.png";
$green: "~@/assets/img/button-1.png";
$blue: "~@/assets/img/button-2.png";

.product {
  padding: 20px;
  height: 100%;
  display: flex;
  flex-direction: row;
  .product-chart {
    width: 1300px;
    height: 100%;
    margin-right: 20px;
    display: flex;
    flex-direction: column;
    .top-chart {
      width: 100%;
      height: 360px;
      margin-bottom: 20px;
      display: flex;
      flex-direction: row;
      .product-order {
        width: 410px;
        height: 100%;
        background: rgba(255, 255, 255, 0.05);
        margin-right: 20px;
        border-radius: 8px;
        padding: 10px 20px;
        & /deep/ .el-form-item {
          margin-bottom: 0;
        }
        & /deep/ .el-form-item__label {
          color: #fff;
          font-size: 16px;
        }
        & /deep/ .el-input__inner {
          background: transparent;
          border: none;
          padding: 0;
          color: #fff;
        }
        & /deep/ .el-progress {
          margin-bottom: 20px;
        }
        & /deep/ .el-progress-bar__outer {
          background: rgba(0, 144, 255, 0.15);
        }
        .precent {
          color: #fff;
          position: relative;
          right: -90px;
        }
        .bottom-group {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          button {
            width: 110px;
            height: 40px;
            font-size: 15px;
            margin: 0 20px 20px 0;
            outline: none;
            border: none;
            color: #fff;
            &.right {
              margin-right: 0px;
            }
            &.bottom {
              margin-bottom: 0px;
            }
            &.red {
              background: url($red) no-repeat;
              background-size: 100% 100%;
            }
            &.blue {
              background: url($blue) no-repeat;
              background-size: 100% 100%;
            }
            &.green {
              background: url($green) no-repeat;
              background-size: 100% 100%;
            }
          }
        }
      }
      .product-problem {
        flex: 1;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 8px;
        display: flex;
        flex-direction: row;
        .quality-problem,
        .oee-time {
          width: 50%;
          height: 100%;
          padding: 20px;
          display: flex;
          flex-direction: column;
          position: relative;
          p {
            margin: 0;
            font-size: 24px;
            color: #fff;
          }
          div {
            flex: 1;
          }
          .gauge {
            width: 360px;
            height: 80px;
            position: absolute;
            bottom: 20px;
            right: 40px;
            background: rgba(0, 144, 255, 0.1);
            border: 1px solid #0090ff;
            border-radius: 8px;
          }
        }
      }
    }
    .bottom-chart {
      width: 100%;
      flex: 1;
      display: flex;
      flex-direction: column;
      background: rgba(255, 255, 255, 0.05);
      .title {
        height: 40px;
        width: 100%;
        margin: 0;
        padding: 0 20px;
        font-size: 17px;
        line-height: 40px;
        text-align: left;
        font-family: Microsoft YaHei;
        color: #fff;
        background: rgba(255, 255, 255, 0.05);
      }
      .bar-time {
        width: 100%;
        height: 130px;
      }
      .line-time {
        width: 100%;
        flex: 1;
        background: rgba(0, 144, 255, 0.1);
        border: 1px solid #0090ff;
        border-radius: 8px;
      }
    }
  }
  .product-control {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    .product-status {
      width: 100%;
      height: 640px;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 8px;
      .status {
        width: 100%;
        height: 150px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        div {
          height: 150px;
          text-align: center;
          color: #fff;
          .icon {
            height: 100px;
            position: relative;
            .out-circle {
              width: 48px;
              height: 48px;
              border-radius: 50%;
              position: absolute;
              top: 50%;
              left: 50%;
              margin-left: -24px;
              margin-top: -24px;
              .in-circle {
                position: absolute;
                width: 28px;
                height: 28px;
                border-radius: 50%;
                top: 50%;
                left: 50%;
                margin-left: -14px;
                margin-top: -14px;
              }
            }
            &.gray {
              .out-circle {
                background: rgba(204, 204, 204, 0.3);
                .in-circle {
                  background: rgba(204, 204, 204, 1);
                }
              }
            }
            &.green {
              .out-circle {
                background: rgba(56, 191, 101, 0.3);
                .in-circle {
                  background: rgba(56, 191, 101, 1);
                }
              }
            }
            &.red {
              .out-circle {
                background: rgba(255, 50, 93, 0.3);
                .in-circle {
                  background: rgba(255, 50, 93, 1);
                }
              }
            }
            &.yellow {
              .out-circle {
                background: rgba(255, 231, 84, 0.3);
                .in-circle {
                  background: rgba(255, 231, 84, 1);
                }
              }
            }
          }
        }
      }
      .change-status {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        button {
          width: 150px;
          height: 50px;
          font-size: 15px;
          outline: none;
          border: none;
          color: #fff;
          background: url($blue) no-repeat;
          background-size: 100% 100%;
        }
      }
      .warn-information {
        width: 100%;
        height: 400px;
        margin-top: 40px;
        border: 1px solid #0090ff;
        border-radius: 8px;
        padding: 20px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        .title {
          font-size: 17px;
          text-align: left;
          color: #fff;
          margin: 0;
        }
        .information-content {
          flex: 1;
          ul {
            height: 100%;
            width: 100%;
            li {
              font-size: 13px;
              color: #fff;
            }
          }
        }
      }
      .bottm-button {
        width: 100%;
        .el-button {
          width: 170px;
          height: 60px;
          margin-top: 10px;
          margin-left: 0;
          font-size: 24px;
          &.right {
            margin-left: 10px;
          }
        }
      }
    }
  }
}
</style>
