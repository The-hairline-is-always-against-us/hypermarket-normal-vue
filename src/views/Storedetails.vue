<template>

    <div style="margin:0 auto;width:80%;">
        <el-row>
            <el-col :span="8">
                <div class="grid-content bg-purple-light">
                    <el-carousel :interval="5000" arrow="always" height="410px">
                        <el-carousel-item v-for="item in carousel" :key="item.carousel_id">
                            <img style="height:410px" :src="$target + item.imgPath" :alt="item.describes" />
                        </el-carousel-item>
                    </el-carousel>
                </div></el-col>
            <el-col :span="16">
                <div class="grid-content bg-purple" style="height:460px;">
                    <div class="sname">
                        <span>商铺名称：</span>
                        <span style="font-size:24px">{{store.s_name}}</span>
                    </div>
                    <div class="sintro">
                        <span>商铺简介：</span>
                        <div class="intro">
                            <p>{{store.s_intro}}</p>
                        </div>
                    </div>
                    <div class="stime">
                        <span>申请时间：{{store.request_time}}</span>
                    </div>
                    <div class="ctime">
                        <span v-if="store.create_time !==null">营业时间：{{store.create_time}}</span>
                        <span v-if="store.create_time ===null">营业时间：还未批准开始营业</span>
                    </div>
                    <div class="snumber">
                        <span v-if="store.sale_count !==null">营销额：{{store.sale_count}}</span>
                        <span v-if="store.sale_count ===null">营销额：0</span>
                    </div>
                    <div>
                        <router-link to="/Store"><el-button type="success" round v-if="store.create_time !==null" style="width:100%;">查看所有商品</el-button></router-link>
                        
                        <el-button type="info" round v-if="store.create_time ===null" style="width:100%;">该商铺无法正常营业</el-button>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
        carousel: "", // 轮播图数据
        store:null,
        categoryID: 6

        };
    },
    activated() {
        if (this.$route.query.categoryID != undefined) {
            this.categoryID = this.$route.query.categoryID;
            console.log(this.$route.query.categoryID)
        }
    },
    watch: {
    // 监听商品id的变化，请求后端获取商品数据
    categoryID: function(val) {
      this.init(val);
      this.getDetailsPicture(val);
    }
  },
    methods: {
        init() {
            // 获取店铺详情数据
            this.postRequest('/api/getStoreBySid',{
                s_id:this.categoryID
            }).then(resp => {
                this.store = resp.data.message;
                console.log(this.store);
            })
        },
        getDetailsPicture() {
            // 获取轮播图数据
            this.$axios
            .post("/api/resources/carousel", {})
            .then(res => {
                this.carousel = res.data.carousel;
            })
            .catch(err => {
                return Promise.reject(err);
            });
        }
    }

}
</script>

<style>
 .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .el-row .sname{
      height: 10%;
      border-bottom:darkgray 1px;
      font-size: 18px;
  }
  .el-row .sintro{
      height:40%;
      font-size: 18px;
  }
  .el-row .sintro .intro{
      margin-left: 20px;
  }
  .el-row .sintro .intro p{
      margin-left: 14px;
  }
  
  .el-row .stime{
      height: 10%;
      font-size: 18px;
  }
  .el-row .ctime{
      height: 10%;
      font-size: 18px;
  }
  .el-row .snumber{
      height: 10%;
      font-size: 18px;
  }
  .bg-purple{
      margin-left: 120px;
  }
</style>