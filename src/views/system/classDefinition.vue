<template>
  <div class="classDefinition">
    <div class="classDefinition-information">
      <el-form
        :model="ruleForm"
        ref="ruleFormsss"
        label-width="100px"
        label-position="left"
      >
        <el-row>
          <el-col :span="5">
            <el-form-item label="加工单元：" prop="JGDYBH">
              <el-select v-model="ruleForm.JGDYBH" filterable placeholder="请选择">
                <el-option
                  v-for="item in unitList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="班次时间：" prop="Time">
              <el-date-picker
                v-model="ruleForm.Time"
                value-format="yyyy-MM-dd"
                type="daterange"
                style="position: relative; top: 2px"
                range-separator="~"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="searchData">查询</el-button>
            <el-button class="shadow" @click="resetForm('ruleForm')">重置</el-button
            >
          </el-col>
        </el-row>
      </el-form>
      <div class="classDefinition-new">
        <el-button type="primary" @click="addEquipmentHandle">添加班次</el-button>
        <pagination
          :currentSize="currentSize"
          :totalSize="totalSize"
          ref="pagination"
        ></pagination>
      </div>
      <div class="classDefinition-table">
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
              <el-button type="text" size="small" @click="checkClass(scope.row)">查看</el-button>
              <el-button type="text" size="small">复制</el-button>
              <el-button type="text" size="small" @click="deleteClass(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
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
  unref,
  toRefs,
} from "vue";
import { useRouter } from 'vue-router'
import pagination from "@/components/pagination.vue";
import { UnitService } from "@/api/unit";
import { ClassService } from "@/api/class"
import { ElMessage } from "element-plus";

export default defineComponent({
  name: "classDefinition",
  setup(props, context) {
    const router = useRouter()
    const ruleFormsss = ref(null);
    // 当前页码
    let currentSize: Ref<number> = ref(1);
    // 总页码
    let totalSize: Ref<number> = ref(3);
    provide("currentSize", currentSize);
    provide("totalSize", totalSize);
    // 搜索列表
    // 搜索数据
    let data = reactive({
      // 搜索列表
      tableData: [],
      ruleForm: {
        JGDYBH: "",
        Time: ""
      },
      unitList: [],
      row: {}
    });
    // 表格数据
    const colConfigs: Array<any> = reactive([
      { prop: "CXMC", label: "加工单元" },
      { prop: "SCRQ", label: "班次日期" },
      { prop: "BCBM", label: "班次编码" },
      { prop: "BCMC", label: "班次名称" },
      // { prop: "GW", label: "工位" },
      { prop: "JHSBSJ", label: "班次时间" },
      { prop: "CJYH", label: "创建人" },
      { prop: "CJSJ", label: "创建时间" }
    ]);
    // 新增叫料单
    const addEquipmentHandle = () => {
      router.push(
        {
          path: '/classDefinition/addClass'
        }
      )
    }
    // 获取加工单元
    const getUnitList = async () => {
      const UnitParams = {
        method: "GKJ_HXGetJGDY",
        RYXX: localStorage.getItem('userid')
      };
      const res = await UnitService.getUnit(UnitParams)
      data.unitList = res.data.list.map((item: any) => {
        let obj = {
          value: item.SCXBH,
          label: item.SCXMC,
        };
        return obj;
      })
    }
    // 获取排班列表
    const getList = async (pageSize: number, pageIndex: number) => {
      let day1 = '1990-04-01'
      let day2 = '9999-04-30'
      let d1 = new Date(data.ruleForm.Time[0])
      let d2 = new Date(data.ruleForm.Time[1])
      const ClassParams = {
        method: 'GKJ_GETBCDYLB',
        GSH: localStorage.getItem('gsh'),
        CXBM: data.ruleForm.JGDYBH ? data.ruleForm.JGDYBH : localStorage.getItem('jgdyh'),
        KSRQ: data.ruleForm.Time.length == 0 ? day1 : d1.getFullYear() + '-' + (d1.getMonth() + 1) + '-' + d1.getDate(),
        JSRQ: data.ruleForm.Time.length == 0 ? day2 : d2.getFullYear() + '-' + (d2.getMonth() + 1) + '-' + d2.getDate(),
        pagesize: pageSize,
        pagesindex: pageIndex
      }
      const res = await ClassService.getClass(ClassParams)
      res.data.list.map((item: any, index: number) => {
        item.JHSBSJ = `${item.JHSBSJ} - ${item.JHXBSJ}`
      })
      data.tableData = res.data.list.slice((pageIndex -1) * pageSize, pageSize * pageIndex)
      totalSize.value = Math.ceil(res.data.count/pageSize)
    }
    // 重置表单
    const resetForm = () => {
      const form: any = unref(ruleFormsss);
      form.resetFields();
    }
    // 搜索数据
    const searchData = () => {
      getList(10, 1)
    }
    // 查看
    const checkClass = async (row: any) => {
      data.row = row
      router.push(
        {
          path: '/classDefinition/checkClass',
          query: {
            CXBM: row.CXBM,
            BCBM: row.BCBM,
            SCRQ: row.SCRQ
          }
        }
      )
    }
    // 删除
    const deleteClass = async (row: any) => {
      const DeleteClassParams = {
        method: "GKJ_DELETEBCDY",
        GSH: localStorage.getItem("gsh"),
        CXBM: row.CXBM,
        BCBM: row.BCBM,
        SCRQ: row.SCRQ,
      };
      const res = await ClassService.DeleteClass(DeleteClassParams)
      if(res.code == 1000) {
        ElMessage.success('删除成功')
        getList(10, 1)
      }
    }
    onMounted(() => {
      getUnitList()
      getList(10, 1)
    });
    return {
      ...toRefs(data),
      totalSize,
      currentSize,
      colConfigs,
      addEquipmentHandle,
      getUnitList,
      getList,
      ruleFormsss,
      resetForm,
      searchData,
      checkClass
    };
  },
  components: {
    pagination,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.classDefinition {
  padding: 0 20px;
  height: 100%;
  display: flex;
  flex-direction: row;
  .classDefinition-information {
    width: 100%;
    height: 100%;
    padding: 20px 0;
    position: relative;
    display: flex;
    flex-direction: column;
    & /deep/ .el-col {
      .el-button {
        position: relative;
        top: 3px;
        left: 5px;
        &.shadow {
          background: rgba(255, 255, 255, 0.05);
        }
      }
    }
    & /deep/ .el-form-item__label {
      padding-left: 10px;
      color: #FFF;
    }
    .classDefinition-new {
      position: relative;
      width: 100%;
      display: flex;
      margin-bottom: 20px;
      .el-button {
        z-index: 100;
      }
    }
  }
  .classDefinition-table {
    height: 100%;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
  }
}
</style>
