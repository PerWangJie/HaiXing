<template>
  <div class="openClass">
    <div class="button-group">
      <div class="classes-choose">
        <button
          v-for="(item, index) in classesList"
          :key="index"
          :class="{ active: item.isCheck }"
          @click="classesHandle(item)"
        >
          {{ item.label }}
        </button>
      </div>
      <div class="operation-button">
        <el-button type="primary" @click="addHandle">新增</el-button>
        <el-button class="shadow" @click="openClassHandle">开班</el-button>
      </div>
      <pagination :currentSize="currentSize" :totalSize="totalSize" ref="pagination" style="top: 95px; left: -10px;"></pagination>
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
      <el-table-column fixed="right" label="操作" width="100">
        <template #default="scope">
          <el-button type="text" size="small" @click="deleteClass(scope.$index)">删除</el-button>
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
          <el-button @click="personCancel" class="shadow"
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
  onMounted,
  reactive,
  provide,
  toRefs,
} from "vue";
import pagination from "@/components/pagination.vue";
import { useStore } from "vuex";
import { ClassService } from "@/api/class"
import { StationService } from "@/api/station"
import { ElMessage } from "element-plus";

export default defineComponent({
  name: "classCheck",
  setup() {
    const store = useStore();
    // 穿梭框数据
    let data = reactive({
      // 选中的开班人员
      personList: [],
      // 开班人员
      chooseList: [],
      // 班次按钮
      classesList: [
        { value: "白班", isCheck: true, SBSJ: "", XBSJ: "" },
        { value: "中班", isCheck: false, SBSJ: "", XBSJ: "" },
        { value: "晚班", isCheck: false, SBSJ: "", XBSJ: "" },
      ],
      personVisible: false,
      tableData: [
        {
          GW: "",
          GWBH: "",
          BCMC: "",
          YGBH: "",
          YGXM: "",
          JHSBSJ: "",
          JHXBSJ: ""
        }
      ],
      activeClass: "",
      // 上班时间
      SBSJ: "",
      // 下班时间
      XBSJ: ""
    });
    // 当前页码
    let currentSize: Ref<number> = ref(1);
    // 总页码
    let totalSize: Ref<number> = ref(2);
    provide("currentSize", currentSize);
    provide("totalSize", totalSize);
    const colConfigs: Array<any> = reactive([
      { prop: "GW", label: "工位" },
      { prop: "YGBH", label: "员工编码" },
      { prop: "YGXM", label: "员工" },
      { prop: "JHSBSJ", label: "上班时间" },
      { prop: "JHXBSJ", label: "下班时间" },
    ]);
    let arr: Array<any> = [];
    // 切换班次
    const classesHandle = (item: any) => {
      data.classesList.map((_item: any) => {
        _item.isCheck = false;
      });
      item.isCheck = true;
      data.activeClass = item.value
      data.SBSJ = item.SBSJ
      data.XBSJ = item.XBSJ
      getList(10, 1)
    };
    // 新增人员
    const addHandle = () => {
      data.personVisible = true;
      getPersonList()
    };
    // 获取排班类型列表
    const getClassList = async () => {
      const ClassTypeParams = {
        method: "GKJ_GetBCXL",
        GSH: localStorage.getItem("gsh"),
      };
      const res = await ClassService.getClassType(ClassTypeParams);
      data.classesList = res.data.list.map((item: any, index: number) => {
        let obj = {
          value: item.BCBM,
          label: item.BCMC,
          SBSJ: item.SBSJ,
          XBSJ: item.XBSJ,
          isCheck: false
        };
        return obj;
      })
      data.classesList[0].isCheck = true
      data.activeClass = data.classesList[0].value
      data.SBSJ = data.classesList[0].SBSJ
      data.XBSJ = data.classesList[0].XBSJ
      getList(10, 1)
    };
     // 获取班次列表
    const getList = async (pageSize: number, pageIndex: number) => {
      const ClassParams = {
        CXBM: localStorage.getItem("jgdyh"),
        GSH: localStorage.getItem("gsh"),
        BCBM: data.activeClass,
        pageSize: pageSize,
        pageIndex: pageIndex
      };
      const res = await StationService.getClass(ClassParams);
      data.tableData = res.data.list.slice((pageIndex -1) * pageSize, pageSize * pageIndex)
      totalSize.value = Math.ceil(res.data.count/pageSize) == 0 ? 1 : Math.ceil(res.data.count/pageSize)
      // getPersonList()
    };
    // 根据班次获取人员
    const getPersonList = async () => {
      const getPersonParams = {
        method: 'GKJ_getZGRYXX',
        GSH: localStorage.getItem("gsh"),
        CXBM: localStorage.getItem("jgdyh"),
        BCBM: data.activeClass,
        GWBH: ""
      }
      const res = await StationService.getPersonList(getPersonParams);
      // data.personList =  []
      // const PersonParams = {
      //   method: "Agv_PAD_HXGetYGXX",
      //   RYXX: "",
      //   gsh: localStorage.getItem("gsh"),
      // };
      // const res = await StationService.getPerson(PersonParams);
      data.chooseList = res.data.list.map((item: any) => {
        let obj = {
          key: item.YGBH,
          label: item.YGXM,
          GWBH: item.GWBH,
          GWBM: item.GWBM
        }
        return obj
      })
    };
    // 确定开班人员
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
              YGXM: item.label,
              YGBH: item.key,
              BCMC: data.activeClass,
              JHSBSJ: data.SBSJ,
              JHXBSJ: data.XBSJ,
              GW: item.GWBM,
              GWBH: item.GWBH
            };
            data.tableData.push(obj);
          }
        });
      });
      data.personVisible = false;
    }
    // 取消选择开班人员
    const personCancel = () => {
      data.personList =  []
      data.personVisible = false;
    }
    // 删除开班信息
    const deleteClass = (index: number) => {
      data.tableData.splice(index, 1)
      ElMessage.success("删除成功")
    }
    // 确认开班
    const openClassHandle = async () => {
      let personData = []
      personData = data.tableData.map((item => {
        let obj = {
          YGBH: item.YGBH,
          GW: item.GW,
          GWBH: item.GWBH
        }
        return obj
      }))
      const classData = {
        GSH: localStorage.getItem("gsh"),
        CXBM: localStorage.getItem("jgdyh"),
        BCBM: data.activeClass,
        JHSBSJ: data.SBSJ,
        JHXBSJ: data.XBSJ,
        CJYH: localStorage.getItem("userid"),
        data: personData
      }
      const res = await StationService.openClass(classData)
      if(res.code == 1000) {
        ElMessage.success("开班成功")
        store.commit("SET_BCBM", data.activeClass);
      }
    }
    onMounted(() => {
      getClassList()
      data.tableData.splice(0, 1)
    });
    return {
      totalSize,
      currentSize,
      colConfigs,
      classesHandle,
      addHandle,
      ...toRefs(data),
      getClassList,
      getPersonList,
      personAffirm,
      arr,
      deleteClass,
      personCancel,
      openClassHandle
    };
  },
  components: {
    pagination,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$gray: "~@/assets/img/button-4.png";
$blue: "~@/assets/img/button-2.png";
.openClass {
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
  .button-group {
    width: 100%;
    height: 80px;
    padding: 0 20px;
    display: flex;
    flex-direction: row;
    .classes-choose {
      z-index: 100;
      button {
        width: 110px;
        height: 40px;
        color: #fff;
        font-size: 17px;
        line-height: 40px;
        margin: 20px 20px 0 0;
        border: none;
        background: url($gray) no-repeat;
        background-size: 100% 100%;
        cursor: pointer;
        &.active {
          background: url($blue) no-repeat;
          background-size: 100% 100%;
        }
      }
    }
    .operation-button {
      flex: 1;
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
