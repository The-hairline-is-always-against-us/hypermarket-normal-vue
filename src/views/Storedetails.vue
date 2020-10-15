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
                        <span style="font-size:24px">{{storename}}</span>
                    </div>
                    <div class="sintro">
                        <span>商铺简介：</span>
                        <div class="intro">
                            <p>{{storeintro}}</p>
                        </div>
                    </div>
                    <div class="stime">
                        <span>开店时间：{{storetime}}</span>
                    </div>
                    <div class="stime">
                        <span>关店时间：{{storetime}}</span>
                    </div>
                    <div class="snumber">
                        <span>营销额：{{storetime}}</span>
                    </div>
                    <div>
                        <router-link to="/Store"><el-button type="success" round v-if="true" style="width:100%;">查看所有商品</el-button></router-link>
                        
                        <el-button type="info" round v-if="false" style="width:100%;">该商铺已关闭</el-button>
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
        storename:"商铺名称",
        storeintro:"本店专门营销什么什么商品，假一罚十信誉保证。本店的服务宗旨是用心服务，以诚待人! 类似这样的简洁风格的介绍，其实，准确点说算是网店宣言。简洁、明了，从诚信经营出发，看过之后，留不下什么印象。 适用网店：新店、没有写作功底的店长。",
        storetime:"2020-10-15 19：20：55"

        };
    },
    created() {
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
  .el-row .snumber{
      height: 10%;
      font-size: 18px;
  }
  .bg-purple{
      margin-left: 120px;
  }
</style>