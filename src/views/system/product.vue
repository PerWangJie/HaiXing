<template>
  <div class="product">
    <div class="product-chart">
      <div class="top-chart">
        <div class="product-order">
          <el-form
            ref="From"
            v-model="form"
            label-width="100px"
            label-position="left"
          >
            <el-form-item label="当前工单：" prop="JGDYBH">
              <el-input v-model="form.JGDYBH" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="工序：" prop="GXMC">
              <el-input v-model="form.GXMC" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="产品名称：" prop="WPMC">
              <el-input v-model="form.WPMC" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="规格型号：" prop="ItemNo">
              <el-input v-model="form.GG" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="产量：">
              <span class="precent">
                <span style="font-size: 24px">{{ form.BGSL }}</span>
                /
                <span>{{ form.JHSL }}</span>
              </span>
            </el-form-item>
          </el-form>
          <el-progress
            :text-inside="true"
            :stroke-width="20"
            :percentage="percent"
          ></el-progress>
          <div class="bottom-group">
            <button class="green" @click="changeOrderHandle(1)">
              开始生产
            </button>
            <button class="blue" @click="changeOrderHandle(2)">暂停生产</button>
            <button class="red" @click="changeOrderHandle(3)">结束生产</button>
            <button class="bottom blue2" @click="chooseOrder">选择工单</button>
            <button class="bottom blue2" @click="planHandle">报工</button>
            <button class="bottom blue2" @click="belowHandle">
              不合格品登记
            </button>
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
              <gauge-chart ref="gaugeChart" :OEE="OEE"></gauge-chart>
              <div class="gauge">
                <div>
                  <p>{{ OEEList.SJKDL }}%</p>
                  <p>时间稼动率</p>
                </div>
                <div class="middle">
                  <p>{{ OEEList.XNKDL }}%</p>
                  <p>性能稼动率</p>
                </div>
                <div>
                  <p>{{ OEEList.HGPL }}%</p>
                  <p>合格品率</p>
                </div>
              </div>
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
          <button @click="changeUnitHandle">切换加工单元</button>
          <button @click="changeStatusHandle">变更状态</button>
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
          <el-button type="primary" class="bottom2">查看图纸</el-button>
          <el-button type="primary" class="right2 bottom2" @click="sopCheck"
            >查看SOP</el-button
          >
          <el-button type="primary" @click="classCheck">开班登记</el-button>
          <el-button type="primary" class="right2" @click="tiemHandle"
            >时间认领</el-button
          >
        </div>
      </div>
    </div>
    <!-- 切换状态 -->
    <el-dialog v-model="statusVisible" center class="statusDialog">
      <div class="dialog-button">
        <el-button
          :class="[{ shadow: true }, { active: item.isChecked }]"
          v-for="(item, index) in statusList"
          :key="index"
          @click="changeStatus(item, index)"
          >{{ item.value }}</el-button
        >
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="changeOrderStatus">确 定</el-button>
          <el-button @click="statusVisible = false" class="shadow"
            >取 消</el-button
          >
        </span>
      </template>
    </el-dialog>
    <!-- 切换加工单元 -->
    <el-dialog v-model="unitVisible" center>
      <el-tabs v-model="unitStatus">
        <el-tab-pane label="我的" name="first"></el-tab-pane>
      </el-tabs>
      <div class="dialog-button">
        <el-button
          :class="[{ shadow: true }, { active: item.isChecked }]"
          v-for="(item, index) in unitList"
          :key="index"
          @click="changeUnit(item, index)"
          >{{ item.label }}</el-button
        >
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="unitAffirm">确 定</el-button>
          <el-button @click="unitVisible = false" class="shadow"
            >取 消</el-button
          >
        </span>
      </template>
    </el-dialog>
    <!-- 不合格登记 -->
    <el-dialog v-model="belowVisible" center>
      <p class="title">不合格品登记</p>
      <el-form :model="BelowForm" ref="belowForm" label-position="left">
        <el-form-item label="设备编号：" prop="Code">
          <el-select v-model="BelowForm.Code" placeholder="请选择">
            <el-option
              v-for="item in codeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="不良现象：" prop="Below">
          <el-select v-model="BelowForm.Below" placeholder="请选择">
            <el-option
              v-for="item in faultList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数量：" prop="Number">
          <el-input v-model="BelowForm.Number"></el-input>
        </el-form-item>
        <el-form-item label="质检员ID：" prop="Id">
          <el-input v-model="BelowForm.Id"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="belowAffirm">确 定</el-button>
          <el-button @click="belowCancel" class="shadow">取 消</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 报工 -->
    <el-dialog v-model="planVisible" center>
      <p class="title">报工</p>
      <el-form :model="PlanForm" ref="planForm" label-position="left">
        <el-form-item label="加工单元：" prop="Unit">
          <el-input v-model="PlanForm.Unit" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="任务单号：" prop="Code">
          <el-input v-model="PlanForm.Code" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="工序：" prop="GX">
          <el-input v-model="PlanForm.GX" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="物品名称：" prop="ItemName">
          <el-input v-model="PlanForm.ItemName" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="批号：" prop="Batch">
          <el-input v-model="PlanForm.Batch" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="进度：" prop="precent">
          <el-input v-model="PlanForm.precent" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="产出：" prop="number">
          <el-input v-model="PlanForm.number"></el-input>
        </el-form-item>
        <el-form-item label="设备：" prop="equipment">
          <el-select v-model="PlanForm.equipment" placeholder="请选择">
            <el-option
              v-for="item in equipmentList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生产方式：" prop="Type">
          <el-radio-group v-model="PlanForm.Type">
            <el-radio :label="1">个人</el-radio>
            <el-radio :label="2">集体</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="报工人：" prop="person">
          <el-select v-model="PlanForm.person" placeholder="请选择">
            <el-option
              v-for="item in personList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="reportAffirm">确 定</el-button>
          <el-button @click="planVisible = false" class="shadow"
            >取 消</el-button
          >
        </span>
      </template>
    </el-dialog>
    <!-- 时间认领 -->
    <el-dialog
      v-model="timeVisible"
      center
      class="timeDialog"
      style="width: 740px !important"
    >
      <p class="title">时间认领</p>
      <div class="time-content">
        <div class="time">
          <p>异常时间段</p>
          <div v-for="(item, index) in timeList" :key="index">
            {{ item.KSSJ }} -- {{ item.JSSJ }}
          </div>
        </div>
        <div class="reason">
          <p>原因</p>
          <div v-for="(item, index) in timeList" :key="index">
            <el-select
              v-model="item.YYBM"
              placeholder="请选择"
              @change="reasonChangeHandle(item)"
            >
              <el-option
                v-for="item in reasonList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="timeVisible = false" class="shadow"
            >取 消</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  Ref,
  reactive,
  toRefs,
  onMounted,
  provide,
} from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { OrderService } from "@/api/order";
import { ChartService } from "@/api/chart";
import { TimeService } from "@/api/time";
import { UnitService } from "@/api/unit";
import { equipmentService } from "@/api/equipment";
import { ElMessage } from "element-plus";
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
    const router = useRouter();
    const store = useStore();
    const gaugeChart: any = ref(null);
    const data = reactive({
      // 状态系数
      statusNumber: 1,
      // 状态弹框
      statusVisible: false,
      // 加工单元弹框
      unitVisible: false,
      // 不合格登记弹框
      belowVisible: false,
      // 报工弹框
      planVisible: false,
      // 时间认领弹框
      timeVisible: false,
      // 加工单元tab
      unitStatus: "first",
      // 加工单元显示
      unitShow: true,
      // 报工数量/计划数量
      percent: 0,
      // OEE数据列表
      OEEList: {
        SJKDL: "",
        XNKDL: "",
        HGPL: "",
        OEE: "",
      },
      // 状态按钮
      statusList: [
        { value: "正常", isChecked: true, number: "3801" },
        { value: "故障", isChecked: false, number: "3802" },
        { value: "停机", isChecked: false, number: "3803" },
      ],
      // 加工单元按钮
      unitList: [{ value: "", isChecked: false }],
      // 不合格品表单
      BelowForm: {
        Code: "",
        Below: "",
        Number: 0,
        Id: "",
      },
      // 报工表单
      PlanForm: {
        Unit: "",
        Code: "",
        GX: "",
        ItemName: "",
        Batch: "",
        precent: "",
        number: "",
        equipment: "",
        Type: 1,
        person: "",
      },
      // 报工人列表
      personList: [],
      // 设备编号列表
      codeList: [],
      // 不良现象列表
      faultList: [],
      // 设备列表
      equipmentList: [],
      // 报警信息
      inforList: [{ value: "滚动显示报警信息（报警原因、报警信息）" }],
      // 当前工单信息
      form: {
        JGDYBH: "",
        GXMC: "",
        WPMC: "",
        GG: "",
        GXH: "",
        JHSL: 0,
        BGSL: 0,
      },
      OEE: 0,
      // 时间列表
      timeList: [],
      // 不良原因列表
      reasonList: [],
    });
    // SOP查看
    const sopCheck = () => {
      router.push({
        path: "/sopCheck",
      });
    };
    // 开班登记
    const classCheck = () => {
      router.push({
        path: "/classCheck/openClass",
      });
    };
    // 变更状态按钮
    const changeStatusHandle = () => {
      data.statusVisible = true;
    };
    // 变更状态
    const changeStatus = (item: any, index: number) => {
      data.statusList.map((_item) => {
        _item.isChecked = false;
      });
      item.isChecked = true;
      data.statusNumber = index + 1;
    };
    // 切换加工单元按钮
    const changeUnitHandle = () => {
      data.unitVisible = true;
    };
    // 变更加工单元
    const changeUnit = (item: any, index: number) => {
      data.unitList.map((_item) => {
        _item.isChecked = false;
      });
      item.isChecked = true;
    };
    // 不合格登记弹框
    const belowHandle = () => {
      data.belowVisible = true;
    };
    // 选择工单
    const chooseOrder = () => {
      router.push({
        path: "/order",
      });
    };
    // 报工按钮
    const planHandle = () => {
      data.planVisible = true;
      data.PlanForm = {
        Unit: localStorage.getItem("jgdymc") as any,
        Code: localStorage.getItem("rwdh") as any,
        GX: data.form.GXMC,
        ItemName: data.form.WPMC,
        Batch: "",
        precent: `${data.form.BGSL} / ${data.form.JHSL}`,
        number: "",
        equipment: "",
        Type: 1,
        person: localStorage.getItem("userid") as any,
      };
      data.PlanForm.precent = (data.PlanForm.precent as any).toFix(2);
    };
    // 获取当前工单
    const getOrder = async () => {
      const NowOrderParams = {
        method: "GKJ__HXGetGDXX",
        CXXX: localStorage.getItem("jgdyh"),
        GSH: localStorage.getItem("gsh"),
      };
      const res = await OrderService.getNowOrder(NowOrderParams);
      console.log(res.data.list.length);
      if (res.data.list != 0) {
        let { JGDYBH, GXMC, WPMC, GG, GXH, JHSL, BGSL } = res.data.list[0];
        data.form = { JGDYBH, GXMC, WPMC, GG, GXH, JHSL, BGSL };
        if (!data.form.BGSL) {
          data.form.BGSL = 0;
        }
        if(data.form.JHSL !== 0 && data.form.JHSL) {
          data.percent = (data.form.BGSL / data.form.JHSL) * 100;
        } else {
          data.percent = 0
        }
        let status = res.data.list[0].ZT;
        status == "正常"
          ? (data.statusNumber = 1)
          : status == "故障"
          ? (data.statusNumber = 2)
          : status == "停机"
          ? (data.statusNumber = 3)
          : "";
      }
    };
    // 开始 暂停 结束生产
    const changeOrderHandle = async (status: number) => {
      const StatusParams = {
        method: "app_jgdygdxx_update",
        ZTID: localStorage.getItem("gsh"),
        SCXBH: localStorage.getItem("jgdyh"),
        RWDH: localStorage.getItem("rwdh"),
        GXH: data.form.GXH,
        ZT: status,
      };
      const res = await OrderService.orderStatus(StatusParams);
      if (res.code == 1000) {
        router.push({
          path: "/product",
        });
        ElMessage.success("操作成功");
      }
    };
    // 切换状态
    const changeOrderStatus = async (status: string) => {
      data.statusList.map((item) => {
        if (item.isChecked == true) {
          status = item.number;
        }
      });
      const ChangeStatusParams = {
        method: "app_jgdyzt_update",
        ZTID: localStorage.getItem("gsh"),
        SCXBH: localStorage.getItem("jgdyh"),
        XMFLDM: status,
      };
      const res = await OrderService.changeStatus(ChangeStatusParams);
      if (res.code == 1000) {
        data.statusVisible = false;
        ElMessage.success("操作成功");
      }
    };
    // 获取OEE数据
    const getOee = async () => {
      const GaugeParams = {
        method: "app_jgdy_oee",
        ZTID: localStorage.getItem("gsh"),
        SCXBH: localStorage.getItem("jgdyh"),
      };
      const res = await ChartService.getGauge(GaugeParams);
      if (res.data.list.length != 0) {
        data.OEEList = res.data.list[0];
        data.OEE = res.data.list[0].OEE;
      }
    };
    // 时间认领
    const tiemHandle = () => {
      data.timeVisible = true;
    };
    // 获取异常时间段
    const getTimeList = async () => {
      const TimeParams = {
        method: "app_jgdy_wclrllb",
        ZTID: localStorage.getItem("gsh"),
        SCXBH: localStorage.getItem("jgdyh"),
      };
      const res = await TimeService.getTime(TimeParams);
      data.timeList = res.data.list.map((item: any, index: number) => {
        let obj = {
          DJGUID: item.DJGUID,
          JSSJ: item.JSSJ,
          KSSJ: item.KSSJ,
          YYBM: item.YYBM,
        };
        return obj;
      });
    };
    // 获取不良原因
    const getReasonList = async () => {
      const ReasonParams = {
        method: "app.gettjyy",
      };
      const res = await TimeService.getReason(ReasonParams);
      data.reasonList = res.data.list.map((item: any, index: number) => {
        let obj = {
          value: item.xmfldm,
          label: item.xmflmc,
        };
        return obj;
      });
    };
    // 时间认领确定
    const reasonChangeHandle = async (item: any) => {
      console.log(item);
      const ReasonParams = {
        method: "app_jgdy_wclrl",
        DJGUID: item.DJGUID,
        YYBM: item.YYBM,
      };
      const res = await TimeService.TimeChange(ReasonParams);
      if (res.code == 1000) {
        ElMessage.success("操作成功");
      }
    };
    // 获取设备列表
    const getEquipList = async () => {
      const equipmentParams = {
        method: "GKJ_HXGetSBXX",
        RYXX: localStorage.getItem("userid"),
      };
      const res = await equipmentService.getEquipment(equipmentParams);
      data.codeList = res.data.list.map((item: any, index: number) => {
        let obj = {
          value: item.SBBH,
          label: item.SBMC,
        };
        return obj;
      });
    };
    // 获取不良现象列表
    const getFaultList = async () => {
      const FaultParams = {
        method: "GKJ_HXGetBLXX",
        gsh: localStorage.getItem("gsh"),
      };
      const res = await equipmentService.getFault(FaultParams);
      console.log(res.data.list);
      data.faultList = res.data.list.map((item: any, index: number) => {
        let obj = {
          value: item.XXBM,
          label: item.XXSM,
        };
        return obj;
      });
    };
    // 提交不合格品登记
    const belowAffirm = async () => {
      const SubmitFaultParams = {
        method: "GKJ_INSERTBHGPDJ",
        SCRWDH: localStorage.getItem("rwdh"),
        GSH: localStorage.getItem("gsh"),
        ZJRYID: data.BelowForm.Id,
        WPH: data.BelowForm.Code,
        BZS: data.BelowForm.Number,
        JGDYBH: localStorage.getItem("jgdyh"),
        PZBLYYBH: data.BelowForm.Below,
        CJRID: localStorage.getItem("userid"),
      };
      const res = await equipmentService.submitFault(SubmitFaultParams);
      if (res.code == 1000) {
        data.belowVisible = false;
        ElMessage.success("操作成功");
      }
    };
    // 取消报工
    const belowCancel = () => {
      data.BelowForm = {
        Code: "",
        Number: 0,
        Id: "",
        Below: "",
      };
      data.belowVisible = false;
    };
    // 根据人员获取设备(报工)
    const getPersonEquip = async () => {
      const PersonParams = {
        method: "GKJ_HXGetSBXX",
        RYXX: localStorage.getItem("userid"),
      };
      const res = await equipmentService.getPerson(PersonParams);
      data.equipmentList = res.data.list.map((item: any, index: number) => {
        let obj = {
          value: item.SBBH,
          label: item.SBMC,
        };
        return obj;
      });
    };
    // 确认报工
    const reportAffirm = async () => {
      const ReportParams = {
        method: "app_jgdygdbg",
        ZTID: localStorage.getItem("gsh"),
        SCXBH: localStorage.getItem("jgdyh"),
        RWDH: localStorage.getItem("rwdh"),
        GXH: data.form.GXH,
        SBBM: data.PlanForm.equipment,
        BGSL: data.PlanForm.number,
        USERID: data.PlanForm.person,
      };
      const res = await equipmentService.Report(ReportParams);
      if (res.code == 1000) {
        data.planVisible = false;
        ElMessage.success("报工成功");
      }
    };
    // 进入页面时获取设备状态
    const getEquip = async () => {
      const EquipmentStatusParams = {
        method: "app_jgdydqzt",
        ZTID: localStorage.getItem("gsh"),
        SCXBH: localStorage.getItem("jgdyh"),
      };
      const res = await equipmentService.getEquipmentStatus(
        EquipmentStatusParams
      );
      let status = res.data.list[0].zt;
      status == "正常"
        ? (data.statusNumber = 1)
        : status == "故障"
        ? (data.statusNumber = 2)
        : status == "停机"
        ? (data.statusNumber = 3)
        : "";
    };
    // 获取所有加工单元
    const getTotalList = async () => {
      const TotalParams = {
        method: "GKJ_GetQBJGDYBXYYM",
        GSH: localStorage.getItem("gsh"),
      };
      const res = await UnitService.getUnitTotal(TotalParams);
      data.unitList = res.data.list.map((item: any) => {
        let obj = {
          value: item.SCXBH,
          label: item.SCXMC,
          isChecked: false,
        };
        return obj;
      });
    };
    // 切换加工单元
    const unitAffirm = () => {
      console.log(12345);
      let unit = "";
      data.unitList.map((item) => {
        if (item.isChecked == true) {
          unit = item.value;
          store.commit("SET_JGDYH", unit);
          store.state.jgdyh = unit;
          data.unitVisible = false;
        }
      });
    };
    onMounted(() => {
      getOrder();
      getOee();
      getTimeList();
      getReasonList();
      getEquipList();
      getFaultList();
      getPersonEquip();
      getTotalList();
    });
    return {
      ...toRefs(data),
      gaugeChart,
      sopCheck,
      classCheck,
      changeStatusHandle,
      changeStatus,
      changeUnitHandle,
      changeUnit,
      belowHandle,
      chooseOrder,
      planHandle,
      getOrder,
      changeOrderHandle,
      changeOrderStatus,
      getOee,
      tiemHandle,
      getTimeList,
      getReasonList,
      reasonChangeHandle,
      getEquipList,
      belowAffirm,
      belowCancel,
      getPersonEquip,
      reportAffirm,
      getEquip,
      getTotalList,
      unitAffirm,
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
$blue2: "~@/assets/img/button-5.png";

.product {
  padding: 20px;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  & /deep/ .el-dialog {
    width: 640px !important;
    .title {
      margin: 0 0 20px 0;
      text-align: center;
      color: #fff;
      font-size: 24px;
    }
    .time-content {
      width: 100%;
      height: 500px;
      overflow: auto;
      padding: 0 20px;
      display: flex;
      flex-direction: row;
      .time {
        width: 360px;
        margin-right: 20px;
        div {
          width: 100%;
          font-size: 18px;
          color: #fff;
          margin-bottom: 20px;
        }
        p {
          margin: 0;
          margin-bottom: 20px;
          font-size: 14px;
          color: #999;
        }
      }
      .reason {
        flex: 1;
        p {
          margin: 0;
          margin-bottom: 20px;
          font-size: 14px;
          color: #999;
        }

        div {
          height: 15px;
          margin-bottom: 20px;
        }
      }
    }
    .el-form-item {
      margin-bottom: 10px;
      .el-form-item__label {
        text-align: right;
        color: #fff;
        width: 120px;
      }
      .el-form-item__content {
        text-align: left;
        .el-input {
          width: 400px;
        }
      }
      .el-radio__label {
        color: #fff;
      }
    }
    .el-button {
      &.shadow {
        color: #fff;
        background: rgb(13, 27, 38);
        border: 1px solid #d6d6d6;
      }
    }
    .dialog-button {
      height: 500px;
      overflow: auto;
      .el-button {
        margin: 0 20px 20px 20px;
        &.active {
          background: #237ae4;
          border: none !important;
        }
      }
    }
  }
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
          color: #fff !important;
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
          justify-content: space-around;
          button {
            width: 110px;
            height: 40px;
            font-size: 15px;
            margin-bottom: 20px;
            outline: none;
            border: none;
            color: #fff;
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
            &.blue2 {
              background: url($blue2) no-repeat;
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
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            div {
              height: 50px;
              width: 100%;
              margin-top: 15px;
              &.middle {
                border-left: 1px solid #0090ff;
                border-right: 1px solid #0090ff;
              }
              p {
                color: #fff;
                text-align: center;
                &:first-child {
                  margin: 0;
                  font-size: 18px;
                  margin-bottom: 10px;
                }
                &:last-child {
                  margin: 0;
                  font-size: 12px;
                }
              }
            }
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
      height: 100%;
      display: flex;
      flex-direction: column;
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
        flex: 1;
        margin: 40px 0 10px 0;
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
            padding-left: 20px;
            li {
              font-size: 13px;
              color: #fff;
              text-align: left;
              position: relative;
            }
          }
        }
      }
      .bottm-button {
        width: 360px;
        height: 150px;
        .el-button {
          width: 160px;
          height: 60px;
          margin-top: 10px;
          margin-left: 0;
          font-size: 24px;
          &.right2 {
            margin-left: 20px;
          }
          &.bottom2 {
            margin-bottom: 10px;
          }
        }
      }
    }
  }
}
</style>
