<template>
  <div class="addGroup">
    <p class="title">新增班次</p>
    <el-form :model="ClassForm" ref="classForm" label-position="left">
      <el-form-item label="加工单元：" prop="Unit">
        <el-select v-model="ClassForm.Unit" placeholder="请选择" class="unit">
          <el-option
            v-for="item in unitList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="班次日期：" prop="endTime">
        <el-date-picker
          v-model="ClassForm.date"
          type="date"
          placeholder="选择日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="班次名称：" prop="LineName">
        <el-select
          v-model="ClassForm.LineName"
          placeholder="请选择"
          class="unit"
          @change="classChange"
        >
          <el-option
            v-for="item in ClassList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="班次编码：" prop="BCBM">
        <el-input v-model="ClassForm.BCBM"></el-input>
      </el-form-item>
      <el-form-item label="开始时间：" prop="startTime">
        <el-time-picker
          v-model="ClassForm.startTime"
          format="HH:mm"
          value-format="HH:mm"
          placeholder="任意时间点"
        >
        </el-time-picker>
      </el-form-item>
      <el-form-item label="结束时间：" prop="endTime">
        <el-time-picker
          v-model="ClassForm.endTime"
          format="HH:mm"
          value-format="HH:mm"
          placeholder="任意时间点"
        >
        </el-time-picker>
      </el-form-item>
    </el-form>
    <div class="add-staff">
      <el-button type="primary" @click="addClassHandle">新增</el-button>
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
        <el-table-column prop="GWBH" label="工位">
          <template #default="scope">
            <el-select
              v-model="scope.row.GWBH"
              placeholder="请选择"
              class="unit"
              @change="classChange"
              style="width: 150px !important; border-radius: 8px;"
            >
              <el-option
                v-for="item in stationList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="startTime" label="上班时间">
          <template #default="scope">
            <el-time-picker
              v-model="scope.row.BJHSBSJ"
              format="HH:mm"
              value-format="HH:mm"
              placeholder="任意时间点"
              style="width: 150px !important"
            >
            </el-time-picker>
          </template>
        </el-table-column>
        <el-table-column prop="endTime" label="下班时间">
          <template #default="scope">
            <el-time-picker
              v-model="scope.row.BJHXBSJ"
              format="HH:mm"
              value-format="HH:mm"
              placeholder="任意时间点"
              style="width: 150px !important"
            >
            </el-time-picker>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template #default="scope">
            <el-button
              type="text"
              size="small"
              @click="deleteRow(scope.row, scope.$index)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="button-group">
      <el-button type="primary" @click="classAffirm">确认</el-button>
      <el-button class="shadow" @click="exitHandle">取消</el-button>
    </div>
    <el-dialog v-model="classVisible" center>
      <el-transfer
        v-model="personList"
        :data="chooseList"
        :titles="['员工', '已选员工']"
        filterable
        @change="personChange"
      >
      </el-transfer>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="classVisible = false" class="shadow"
            >取 消</el-button
          >
          <el-button type="primary" @click="personAffirm">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import router from "@/router";
import {
  defineComponent,
  ref,
  Ref,
  onMounted,
  reactive,
  provide,
  unref,
  toRefs,
} from "vue";
import { ClassService } from "@/api/class";
import { UnitService } from "@/api/unit";
import { PersonService } from "@/api/person";
import { StationService } from "@/api/station";
import { ElMessage } from "element-plus";

export default defineComponent({
  name: "addGroup",
  setup(props, context) {
    const classForm = ref(null);
    // 搜索数据
    let data = reactive({
      classVisible: false,
      staff: "",
      ClassForm: {
        BCBM: "",
        LineName: "",
        startTime: new Date(2016, 9, 10, 0o0, 0o0),
        endTime: new Date(2016, 9, 10, 0o0, 0o0),
        Unit: "",
        date: new Date(),
      },
      unitList: [],
      staffData: [{ number: "11", name: "11" }],
      // 选中的开班人员
      personList: [],
      // 开班人员
      chooseList: [],
      // 排班类型列表
      ClassList: [],
      // 工位列表
      stationList: [],
      arr: [],
      tableData: [
        {
          XM: "",
          YGBH: "",
          BMMC: "",
          BJHSBSJ: new Date(2016, 9, 10, 0o0, 0o0),
          BJHXBSJ: new Date(2016, 9, 10, 0o0, 0o0),
        },
      ],
    });
    // 表格数据
    const colConfigs: Array<any> = reactive([
      { prop: "YGBH", label: "员工编码" },
      { prop: "XM", label: "员工" },
      { prop: "BMMC", label: "岗位" },
    ]);
    let arr: Array<any> = [];
    // 新增员工
    const addClassHandle = () => {
      data.classVisible = true;
    };
    // 搜索员工
    const searchHandle = () => {
      console.log(data.staff);
    };
    // 选择员工
    const staffChange = (selection: any) => {
      console.log(selection);
    };
    // 取消
    const exitHandle = () => {
      router.go(-1);
      const form: any = unref(classForm);
      form.resetFields();
    };
    // 获取排班类型列表
    const getList = async () => {
      const ClassTypeParams = {
        method: "GKJ_GetBCXL",
        GSH: localStorage.getItem("gsh"),
      };
      const res = await ClassService.getClassType(ClassTypeParams);
      data.ClassList = res.data.list.map((item: any, index: number) => {
        let obj = {
          value: item.BCBM,
          label: item.BCMC,
          startTime: item.SBSJ,
          endTime: item.XBSJ,
        };
        return obj;
      });
    };
    // 确认新增排班信息
    const classAffirm = async () => {
      let date = new Date(data.ClassForm.date);
      data.tableData.map((item: any) => {
        data.stationList.map((_item: any) => {
          if(item.GWBH == _item.value) {
            item.GWMC = _item.label
          }
        })
        item.BJHSBSJ = item.BJHSBSJ.toString().split(' ')[4].substring(0, 5)
        item.BJHXBSJ = item.BJHXBSJ.toString().split(' ')[4].substring(0, 5)
      })
      const SaveClassParams = {
        GSH: localStorage.getItem("gsh"),
        CXBM: data.ClassForm.Unit,
        BCBM: data.ClassForm.LineName,
        SCRQ:
          date.getFullYear() +
          "-" +
          (date.getMonth() + 1) +
          "-" +
          date.getDate(),
        CJYH: localStorage.getItem("userid"),
        BZ: "",
        data: data.tableData,
      }
      // let a = 'Wed Jun 02 2021 08:00:00 GMT+0800 (中国标准时间)'
      // console.log(a.split(' ')[4].substring(0, 5))
      const res = await ClassService.saveClass(SaveClassParams);
      if (res.code == 1000) {
        ElMessage.success("新增成功");
        router.go(-1);
      }
    };
    // 切换班次
    const classChange = (value: any) => {
      let date = new Date();
      data.ClassList.map((item: any) => {
        if (value == item.value) {
          data.ClassForm.BCBM = item.value;
          data.ClassForm.startTime = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            item.startTime.split(":")[0],
            item.startTime.split(":")[1]
          );
          data.ClassForm.endTime = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            item.endTime.split(":")[0],
            item.endTime.split(":")[1]
          );
        }
      });
    };
    // 获取加工单元
    const getUnitList = async () => {
      const UnitParams = {
        method: "GKJ_HXGetJGDY",
        RYXX: localStorage.getItem("userid"),
      };
      const res = await UnitService.getUnit(UnitParams);
      data.unitList = res.data.list.map((item: any) => {
        let obj = {
          value: item.SCXBH,
          label: item.SCXMC,
        };
        return obj;
      });
    };
    // 获取加工单元
    const getPersonList = async () => {
      const PersonParams = {
        method: "Agv_PAD_HXGetYGXX",
        YGBH: localStorage.getItem("userid"),
        gsh: localStorage.getItem("gsh"),
      };
      const res = await PersonService.getPerson(PersonParams);
      data.chooseList = res.data.list.map((item: any) => {
        let obj = {
          key: item.YGBH,
          label: item.XM,
          BMMC: item.BMMC,
        };
        return obj;
      });
    };
    // 选择人员
    const personChange = (value: any, direction: any, movedKeys: any) => {};
    // 选定员工
    const personAffirm = () => {
      arr = [];
      data.chooseList.map((item: any) => {
        data.personList.map((_item: any) => {
          if (item.key == _item) {
            arr.push(_item);
            console.log(arr);
          }
        });
      });
      data.chooseList.map((item: any) => {
        arr.map((_item: any) => {
          if (item.key == _item) {
            let obj = {
              XM: item.label,
              YGBH: item.key,
              BMMC: item.BMMC,
              BJHSBSJ: data.ClassForm.startTime,
              BJHXBSJ: data.ClassForm.endTime,
            };
            data.tableData.push(obj);
          }
        });
      });
      data.classVisible = false;
    };
    // 删除人员
    const deleteRow = (row: any, index: number) => {
      data.tableData.splice(index, 1);
    };
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
    };
    onMounted(() => {
      getList();
      getUnitList();
      getPersonList();
      getStationList();
      data.tableData.splice(0, 1);
    });
    return {
      ...toRefs(data),
      classForm,
      colConfigs,
      addClassHandle,
      searchHandle,
      staffChange,
      exitHandle,
      getList,
      classAffirm,
      classChange,
      getUnitList,
      getPersonList,
      personChange,
      personAffirm,
      arr,
      deleteRow,
      getStationList,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.addGroup {
  width: 100%;
  height: 100%;
  padding: 20px;
  & /deep/ .el-date-editor.el-input {
    width: 200px !important;
    margin-right: 20px;
  }
  & /deep/ .el-select .el-input {
    width: 200px !important;
  }
  & /deep/ .el-select.unit .el-input {
    width: 500px !important;
  }
  .title {
    font-size: 20px;
    margin: 0 0 20px 0;
    color: #fff;
    text-align: left;
  }
  .add-staff {
    width: 100%;
    text-align: left;
    margin-top: 20px;
    padding-left: 120px;
    .el-table {
      margin-top: 20px;
      width: 1000px;
      max-height: 50vh;
      overflow: auto;
    }
  }
  & /deep/ .el-dialog {
    width: 620px !important;
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
      .el-textarea__inner {
        width: 500px;
      }
    }
    .el-radio__label {
      color: #fff;
    }
  }
  .button-group {
    width: 100%;
    box-sizing: border-box;
    text-align: left;
    margin-top: 20px;
    .el-button {
      position: relative;
      left: 120px;
      &.shadow {
        background: rgba(255, 255, 255, 0.05);
      }
    }
  }
}
</style>
