<template>
  <div class="dia-cont">
    <el-form :model="ruleForm"  ref="ruleFormsss" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名称" prop="xm">
        <el-input v-model="ruleForm.xm"></el-input>
      </el-form-item>
      <el-form-item label="登录账号" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" :disabled="!passStatus" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="单位" prop="dw" class="add-dw">
        <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="isdelete">
        <el-switch v-model="ruleForm.isdelete" active-color="#179BFF" :active-text="showName" active-value="1" inactive-value="0" :width="54"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
        <el-button @click="resetForm('ruleForm')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script  lang="ts" >
import { defineComponent, unref, defineAsyncComponent, ref, reactive, onMounted, toRefs, markRaw, shallowRef, getCurrentInstance } from 'vue';
export default defineComponent({
  components: {
    props: {
      dialogTitle: {
        type: String
      }
    }
  },
  setup(props, context) {
    const ruleFormsss = ref(null);
    // 定义变量
    let data = reactive({
      ruleForm: {
        xm: '',
        name: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [{ required: true, message: '请选择活动区域', trigger: 'change' }],
        date1: [{ type: 'date', required: true, message: '请选择日期', trigger: 'change' }],
        date2: [{ type: 'date', required: true, message: '请选择时间', trigger: 'change' }],
        type: [{ type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }],
        resource: [{ required: true, message: '请选择活动资源', trigger: 'change' }],
        desc: [{ required: true, message: '请填写活动形式', trigger: 'blur' }]
      }
    });
    const submitForm = async () => {
      const form: any = unref(ruleFormsss);
      if (!form) return;
      try {
        await form.validate();
        const { xm, name } = data.ruleForm;
        console.log('76', xm, name);
      } catch (error) {}
    };
    const resetForm = () => {
      const form: any = unref(ruleFormsss);
      form.resetFields();
    };
    return {
      ...toRefs(data),
      submitForm,
      resetForm,
      ruleFormsss
    };
  }
});
</script>
<style lang="scss" scoped>
/deep/ .el-switch {
  position: relative;
  height: 24px;
  line-height: 24px;
  &.is-checked {
    .el-switch__core {
      background: #179bff;
      &:after {
        margin-left: -22px;
      }
    }
  }
  .el-switch__label,
  .el-switch__core {
    height: 24px;
  }
  .el-switch__core {
    border-radius: 12px;
    border: none;
    background: #f1f1f1;
    &:after {
      box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.3);
      width: 22px;
      height: 22px;
    }
  }
  .el-switch__label.is-active {
    color: #333;
  }
  .el-switch__label--right {
    margin-left: 0px;
    &.is-active {
      color: #fff;
      right: 24px;
    }
    position: absolute;
    right: 5px;
    top: -1px;
    color: #999;
    > span {
      font-size: 12px;
    }
  }
}
</style>
<style lang="scss">
.dia-cont .el-form-item__content {
  display: flex;
}
</style>