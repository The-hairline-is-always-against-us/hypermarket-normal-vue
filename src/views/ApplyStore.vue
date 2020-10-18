<!--  
    申请入驻，成为商家
-->

<template>
<div  style="width:50%;margin :0 auto">
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item label="店铺名称" prop="s_name">
      <el-input v-model="ruleForm.s_name"></el-input>
    </el-form-item>
    <el-form-item label="店铺地址">
      <el-select v-model="status" placeholder="请选择店铺地址">
        <el-option label="北京" value="1"></el-option>
        <el-option label="上海" value="2"></el-option>
        <el-option label="重庆" value="3"></el-option>
        <el-option label="深圳" value="4"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="入驻时间" required>
      <el-col :span="11">
        <el-form-item prop="request_time">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="ruleForm.request_time"
            style="width: 100%"
          ></el-date-picker>
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item label="店铺简介" prop="s_intro">
      <el-input type="textarea" v-model="ruleForm.s_intro"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')"
        >立即申请入驻</el-button
      >
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        s_name: "",
        request_time: "",
        s_intro: "",
        status: 0
      },
      location: '',
      rules: {
        s_name: [
          { required: true, message: "请输入店铺名称", trigger: "blur" }
        ],
        location: [
          { required: true, message: "请选择店铺地址", trigger: "change" },
        ],
        request_time: [
          {
            type: "date",
            required: true,
            message: "请选择入驻日期",
            trigger: "change",
          },
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择入驻时间",
            trigger: "change",
          },
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请选择店铺类型",
            trigger: "change",
          },
        ],
        rname: [
          { required: true, message: "请输入店主姓名", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur",
          },
        ],
        phone: [
          { required: true, message: "请输入店主联系电话", trigger: "blur" },
          {
            min: 11,
            max: 11,
            message: "请正确输入 11 位手机号码",
            trigger: "blur",
          },
        ],
        gender: [
          { required: true, message: "请选择店主性别", trigger: "change" },
        ],
        s_intro: [{ required: true, message: "请填写店铺简介", trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.postRequest('/api/applyStore',{
              store: JSON.stringify(this.ruleForm)
            }).then(resp => {
                this.$message.success(resp.data.message)
                console.log(this.stores);
            })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style>
</style>
