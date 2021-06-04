<template>
  <div class="leaveClass">
    <div class="button-group">
      <div class="operation-button">
        <el-button type="primary" @click="addHandle">新增</el-button>
      </div>
      <pagination
        :currentSize="currentSize"
        :totalSize="totalSize"
        ref="pagination"
        style="top: 95px; left: -10px"
      ></pagination>
    </div>
    <el-table
      :data="tableData"
      :header-cell-style="{ background: 'rgb(25, 39, 49)', color: '#FFF' }"
    >
      <template v-for="{ prop, label } in colConfigs" :key="prop">
        <el-table-column
          :prop="prop"
          :label="label"
          :show-overflow-tooltip="true"
        />
      </template>
      <el-table-column fixed="right" label="操作" width="150">
        <template #default="scope">
          <el-button type="text" size="small" @click="SubstituteList(scope.row)">添加员工</el-button>
          <el-button type="text" size="small" @click="DeletePerson(scope.row)">删除记录</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="personVisible" center>
      <el-transfer
        v-model="personList"
        :data="chooseList"
        :titles="['员工', '已选员工']"
        filterable
        @change="handleChange"
      >
      </el-transfer>
      <template #footer>
        <hr />
        <span class="dialog-footer">
          <el-button type="primary" @click="personAffirm"
            >确 定</el-button
          >
          <el-button @click="personVisible = false" class="shadow"
            >取 消</el-button
          >
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="leaveVisible" center>
      <el-form
        :model="LeaveForm"
        ref="leaveForm"
        label-position="left"
        label-width="100px"
      >
        <el-form-item label="工位：" prop="GWBH">
          <el-select
            v-model="LeaveForm.GWBH"
            placeholder="请选择"
            @change="stationChangeHandle"
          >
            <el-option
              v-for="item in stationList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="员工：" prop="YGBM">
          <el-select v-model="LeaveForm.YGBM" placeholder="请选择">
            <el-option
              v-for="item in peopleList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="离岗原因：" prop="LGYY">
          <el-select v-model="LeaveForm.LGYY" placeholder="请选择">
            <el-option
              v-for="item in reasonList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="离岗时间：" prop="Time">
          <el-time-picker
            is-range
            v-model="LeaveForm.Time"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            format="HH:mm"
            placeholder="选择时间范围"
          >
          </el-time-picker>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="leaveAffirm">确 定</el-button>
          <el-button @click="leaveCancel" class="shadow">取 消</el-button>
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
  onMounted,
  reactive,
  provide,
  toRefs,
} from "vue";
import pagination from "@/components/pagination.vue";
import { useStore } from "vuex";
import { StationService } from "@/api/station"
import { ElMessage } from "element-plus";

export default defineComponent({
  name: "classCheck",
  setup() {
    const store = useStore();
    // 穿梭框数据
    const data = reactive({
      // 选中的开班人员
      personList: [],
      // 开班人员
      chooseList: [],
      // 新增离岗登记
      leaveVisible: false,
      // 替岗人员
      personVisible: false,
      // 工位列表
      stationList: [],
      // 人员列表
      peopleList: [],
      // 离岗原因列表
      reasonList: [],
      LeaveForm: {
        GWBH: "",
        GW: "",
        YGBM: "",
        LGYY: "",
        Time: []
      },
      tableData: [],
      // 需要替补的员工
      SubstitutePerson: ""
    });
    // 当前页码
    let currentSize: Ref<number> = ref(1);
    // 总页码
    let totalSize: Ref<number> = ref(3);
    provide("currentSize", currentSize);
    provide("totalSize", totalSize);
    const colConfigs: Array<any> = reactive([
      { prop: "GW", label: "工位" },
      { prop: "YGXM", label: "离岗员工" },
      { prop: "LGYYSM", label: "离岗原因" },
      { prop: "Time", label: "离岗起止时间" },
      { prop: "TBYGXM", label: "替补员工" },
    ]);
    // 新增人员
    const addHandle = () => {
      data.leaveVisible = true;
    };
    // 确定离岗人员
    const leaveAffirm = async () => {
      data.stationList.map((item: any) => {
        if(item.value == data.LeaveForm.GWBH) {
          data.LeaveForm.GW = item.label
        }
      })
      const LeaveStationParams = {
        method: 'GKJ_INSERTLGDJ',
        GSH: localStorage.getItem("gsh"),
        YGBH: data.LeaveForm.YGBM,
        JGDYBH: localStorage.getItem("jgdyh"),
        LGYY: data.LeaveForm.LGYY,
        CJRID: localStorage.getItem("userid"),
        BCBM: localStorage.getItem("BCBM"),
        LGSJ: (data.LeaveForm.Time[0] as any).toString().split(' ')[4].substring(0, 5),
        SGSJ: (data.LeaveForm.Time[1] as any).toString().split(' ')[4].substring(0, 5),
        GWBH: data.LeaveForm.GWBH,
        GW: data.LeaveForm.GW,
      }
      console.log(LeaveStationParams)
      const res = await StationService.LeaveStation(LeaveStationParams)
      if(res.code == 1000) {
        ElMessage.success('离岗成功')
        getList(10, 1)
        data.leaveVisible = false
        emptyInfor()
      }
    };
    // 取消离岗人员
    const leaveCancel = () => {
      data.leaveVisible = false
      emptyInfor()
    };
    // 获取离岗列表
    const getList = async (pageSize: number, pageIndex: number) => {
      const LeaveParams = {
        method: 'GKJ_CKLGXX',
        GSH: localStorage.getItem("gsh"),
        BCBM: localStorage.getItem("BCBM"),
        JGDYBH: localStorage.getItem("jgdyh"),
        pageSize: pageSize,
        pageIndex: pageIndex
      }
      const res = await StationService.leaveClass(LeaveParams)
      data.tableData = res.data.list
      data.tableData.map((item: any) => {
        item.Time = `${item.LGSJ} - ${item.SGSJ}`
      })
      data.tableData = res.data.list.slice((pageIndex -1) * pageSize, pageSize * pageIndex)
      totalSize.value = Math.ceil(res.data.count/pageSize)
    }
    // 获取工位列表
    const getStationList = async () => {
      const StationParams = {
        method: "GKJ_GetGW",
        GSH: localStorage.getItem("gsh"),
        SCXBH: localStorage.getItem("jgdyh"),
      };
      const res = await StationService.getStation(StationParams);
      data.stationList = res.data.list.map((item: any) => {
        let obj = {
          value: item.GWBH,
          label: item.GWMC
        };
        return obj;
      });
    }
    // 根据工位获取人员信息
    const stationChangeHandle = async (value: any) => {
      const getPersonParams = {
        method: 'GKJ_getZGRYXX',
        GSH: localStorage.getItem("gsh"),
        CXBM: localStorage.getItem("jgdyh"),
        BCBM: localStorage.getItem("BCBM"),
        GWBH: value
      }
      const res = await StationService.getPersonList(getPersonParams);
      data.peopleList = res.data.list.map((item: any) => {
        let obj = {
          value: item.YGBH,
          label: item.YGXM
        }
        return obj
      })
    }
    // 获取离岗原因列表
    const getReasonList = async () => {
      const ReasonParams = {
        method: 'GKJ_GetLGYY'
      }
      const res = await StationService.getReason(ReasonParams);
      data.reasonList = res.data.list.map((item: any) => {
        let obj = {
          value: item.XMFLMC,
          label: item.XMFLMC
        }
        return obj
      })
    }
    // 清况数据
    const emptyInfor = () => {
      data.LeaveForm = {
        GW: "",
        GWBH: "",
        YGBM: "",
        LGYY: "",
        Time: []
      }
    }
    // 添加替补人员 
    const SubstituteList = async (row: any) => {
      data.personVisible = true
      data.SubstitutePerson = row.YGBH
      const SubstituteParams = {
        method: 'GKJ_TJTBYG',
        GSH: localStorage.getItem("gsh"),
        YGBH: row.YGBH
      }
      const res = await StationService.SubstitutePerson(SubstituteParams)
      data.chooseList = res.data.list.map((item: any) => {
        let obj = {
          key: item.YGBH,
          label: item.XM
        }
        return obj
      })
    }
    // 确认替补人员
    const personAffirm = async () => {
      if(data.personList.length === 0) {
        ElMessage.error("请选择替补人员")
      } else if (data.personList.length > 1) {
        ElMessage.error("只能选择一个替补人员")
      } else {
        const AffirmParams = {
          method: 'GKJ_TJLGDJTBYG',
          GSH: localStorage.getItem("gsh"),
          JGDYBH: localStorage.getItem("jgdyh"),
          BCBM: localStorage.getItem("BCBM"),
          YGBH: data.SubstitutePerson,
          TBYGBH: data.personList[0]
        }
        const res = await StationService.SubstitutePersonAffirm(AffirmParams)
        if(res.code == 1000) {
          ElMessage.success("替补人员添加成功")
          getList(10, 1)
          data.personVisible = false
        }
      }
    }
    // 删除离岗人员
    const DeletePerson = async (row: any) => {
      const DeleteParams = {
        method: 'GKJ_SCLGXX',
        GSH: localStorage.getItem("gsh"),
        JGDYBH: localStorage.getItem("jgdyh"),
        BCBM: localStorage.getItem("BCBM"),
        YGBH: row.YGBH
      }
      const res = await StationService.DeletePerson(DeleteParams)
      if(res.code == 1000) {
        ElMessage.success("删除成功")
        getList(10, 1)
      }
    }
    onMounted(() => {
      getList(10, 1)
      getStationList()
      getReasonList()
    });
    return {
      totalSize,
      currentSize,
      colConfigs,
      addHandle,
      ...toRefs(data),
      leaveAffirm,
      leaveCancel,
      getList,
      getStationList,
      stationChangeHandle,
      emptyInfor,
      SubstituteList,
      personAffirm,
      DeletePerson
    };
  },
  components: {
    pagination,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.leaveClass {
  width: 100%;
  height: 100%;
  & /deep/ .el-dialog {
    width: 620px !important;
    hr {
      color: #d6d6d6;
      margin: 0 0 20px 0;
    }
    .el-button {
      &.shadow {
        color: #fff;
        background: rgb(13, 27, 38);
        border: 1px solid #d6d6d6;
      }
    }
  }
  & /deep/ .el-form-item {
    margin-bottom: 10px;
    .el-form-item__label {
      text-align: right;
      color: #fff;
      width: 120px;
    }
    .el-form-item__content {
      text-align: left;
      .el-input,
      .el-date-editor--timerange.el-input__inner {
        width: 400px;
        .el-range-separator {
          position: relative;
          top: -5px;
        }
      }
    }
    .el-radio__label {
      color: #fff;
    }
  }
  .button-group {
    width: 100%;
    height: 80px;
    padding: 0 20px;
    display: flex;
    flex-direction: row;
    .operation-button {
      flex: 1;
      text-align: left;
      z-index: 100;
      .el-button {
        width: 100px;
        height: 40px;
        margin: 20px 20px 0 0;
        &.shadow {
          color: #fff;
          background: rgb(13, 27, 38);
          border: 1px solid #d6d6d6;
        }
      }
    }
  }
}
</style>
