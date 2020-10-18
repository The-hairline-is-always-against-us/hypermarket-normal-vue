<!--
 * @Description: 首页组件
 * @Author: hai-27
 * @Date: 2020-02-07 16:23:00
 * @LastEditors: hai-27
 * @LastEditTime: 2020-02-27 13:36:12
 -->
<template>
  <div class="home" id="home" name="home">
    <!-- 轮播图 -->
    <div class="block">
      <el-carousel height="460px">
        <el-carousel-item v-for="item in carousel" :key="item.carousel_id">
          <img style="height:460px;" :src="item.imgPath" :alt="item.describes" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 轮播图END -->
    <div class="main-box">
      <div class="main">

        <!-- 最新发布展示区域 -->
        <div class="phone">
          <div class="box-hd">
            <div class="title">销量榜单</div>
          </div>
          <div class="box-bd">
            <div class="promo-list">
              <router-link to>
                <img :src="$target +'public/imgs/phone/phone.png'" />
              </router-link>
            </div>
            <div class="list">
              <MyList :list="miTvList" :isMore="true"></MyList>
            </div>
          </div>
        </div>
        <!-- 最新发布展示区域END -->

        <!-- 最热门展示区域 -->
        <div class="phone">
          <div class="box-hd">
            <div class="title">最新发布</div>
          </div>
          <div class="box-bd">
            <div class="promo-list">
              <router-link to>
                <img :src="$target +'public/imgs/phone/phone.png'" />
              </router-link>
            </div>
            <div class="list">
              <MyList :list="phoneList" :isMore="true"></MyList>
            </div>
          </div>
        </div>
        <!-- 最热门展示区域END -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      carousel: [
          {'carousel_id':'1','imgPath':'http://47.115.85.237:3000/public/imgs/cms_1.jpg'},
          {'carousel_id':'2','imgPath':'http://47.115.85.237:3000/public/imgs/cms_2.jpg'},
          {'carousel_id':'3','imgPath':'http://47.115.85.237:3000/public/imgs/cms_3.jpg'}
          ], // 轮播图数据
      phoneList: "", // 手机商品列表
      miTvList: "", // 小米电视商品列表
      applianceList: "", // 家电商品列表
      applianceHotList: "", //热门家电商品列表
      accessoryList: "", //配件商品列表
      accessoryHotList: "", //热门配件商品列表
      protectingShellList: "", // 保护套商品列表
      chargerList: "", //充电器商品列表
      applianceActive: 1, // 家电当前选中的商品分类
      accessoryActive: 1 // 配件当前选中的商品分类
    };
  },
  created() {
    this.getHotGoods();
    this.getTopGoods();
  },
  methods: {
    getHotGoods() {
      this.getRequest('/api/hotGoodsQuery').then(resp => {
          this.miTvList = resp.data.message
      })
      console.log(this.miTvList)
    },
    getTopGoods() {
      this.getRequest('/api/topList').then(resp => {
        this.phoneList = resp.data.message
      })
      console.log(this.phoneList)
    }
  }
};
</script>
<style scoped>
@import "../assets/css/index.css";
</style>