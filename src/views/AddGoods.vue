<template>
  <div class="addGoods">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="商品名称" prop="g_name">
                <el-input v-model="ruleForm.g_name"></el-input>
            </el-form-item>
            <el-form-item label="商品类型" prop="t_id">
                <el-select v-model="ruleForm.t_id" placeholder="请选择类型">
                    <el-option
                        v-for="item in opstions"
                        :key="item.t_id"
                        :label="item.t_name"
                        :value="item.t_id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="限时上架" prop="delivery">
                <el-switch v-model="delivery"></el-switch>
            </el-form-item>
            <el-form-item label="上架时间" required v-if="delivery">
                <el-col :span="11">
                <el-form-item prop="uptime">
                    <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.uptime" style="width: 100%;"></el-date-picker>
                </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label="商品单价">
              <el-input v-model="ruleForm.g_price"></el-input>
            </el-form-item>
            <el-form-item label="商品数量">
              <el-input v-model="ruleForm.g_total"></el-input>
            </el-form-item>
            <el-form-item label="商品简介" prop="g_intro">
                <el-input type="textarea" v-model="ruleForm.g_intro"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即添加</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
  </div>
</template>Z

<script>
export default {
    
    data() {
      return {
        ruleForm: {
          g_name: '',
          t_id: '',
          uptime: '',
          g_intro: '',
          s_id:this.$route.query.categoryID,
          g_price:'',
          g_total:''
        },
        delivery: false,
        rules: {
          g_name: [
            { required: true, message: '请输入商品名称', trigger: 'blur' },
            { min: 2, max: 64, message: '长度在 3 到 64 个字符', trigger: 'blur' }
          ],
          t_id: [
            { required: true, message: '请选择商品类型', trigger: 'change' }
          ],
          uptime: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          g_intro: [
            { required: true, message: '请填写商品简介', trigger: 'blur' }
          ]
        },
        opstions:[]
      };
    },
    created() {
        this.postRequest('/api/getType').then(resp => {
            this.opstions = resp.data.message
        })
    },
    activated() {
            if (this.$route.query.categoryID != undefined) {
                this.s_id = this.$route.query.categoryID;
                console.log(this.$route.query.categoryID)
            }
        },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.postRequest('/api/insertGoods',{
              goods: JSON.stringify(this.ruleForm)
            }).then(resp => {
                this.$message.success(resp.data.message)
                this.$router.push({
                  path: "/GoodsManage",
                  categoryID:this.s_id
                });
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
}
</script>

<style>
.addGoods{
    width: 50%;
    margin: 0 auto;
}
</style>