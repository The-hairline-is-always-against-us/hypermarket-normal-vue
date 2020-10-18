<template>
<div class="order">
  <!-- 我的店铺主要商品 -->
    <div class="order-content" v-if="goods!==undefined&&goods!==null&&goods.length>0">
      <div class="content" v-for="(item,index) in goods" :key="index.s_id">
        <ul>
             <!-- 我的商品表头 -->
          <li class="order-info" v-if="index==0">
            <div class="order-id">商铺名称: {{item.s_name}}</div>
            <div class="order-time">
              <router-link :to="{ path: '/AddGoods',query: {categoryID:item.s_id} }">
                <el-button type="primary">添加商品</el-button>
              </router-link>
            </div>
          </li>
          <!-- 我的商品表头 -->
          <li class="header">
            <div class="pro-img"></div>
            <div class="pro-name">商品名称</div>
            <div class="pro-price">商品单价</div>
            <div class="pro-number">商品数量</div>
            <div class="pro-passtime">上架时间</div>
            <div class="pro-type">所属类别</div>
            <div class="pro-operate">操作</div>
          </li>
          <!-- 我的订单表头END -->

          <!-- 订单列表 -->
          <li class="product-list">
            <div class="pro-img">
              <router-link :to="{ path: '/goods/details', query: {productID:item.s_id} }">
                <img :src="item.g_picture" />
              </router-link>
            </div>
            <div class="pro-name">
              <router-link
                :to="{ path: '/goods/details', query: {productID:item.g_id} }"
              >{{item.g_name}}</router-link>
            </div>
            <div class="pro-price">{{item.g_price}}</div>
            <div class="pro-number">{{item.g_total}}</div>
            <div class="pro-passtime" v-if="item.uptime !==null">{{item.uptime}}</div>
            <div class="pro-passtime" v-if="item.uptime ===null" style="color:red">未批准</div>
            <div class="pro-type">{{item.t_name}}</div>
            <div class="pro-operate"><i class="el-icon-delete" @click="deleteGoods(item.g_id)" style="color:red"></i></div>
          </li>
        </ul>
        <div class="order-bar">
          <div class="order-bar-right">
            <span class="order-total">
                <router-link :to="{ path: '/UpdateGoods',query: {categoryID:item.g_id} }">
                <span v-if="item.create_time !==null">
                    <el-button type="success" plain>更新商品</el-button>
                </span>
              </router-link>
            </span>
          </div>
          <!-- 店铺列表END -->
        </div>
      </div>
      <div style="margin-top:-40px;"></div>
    </div>
    <!-- 我的店铺主要内容END -->

    <!-- 店铺为空的时候显示的内容 -->
    <div v-else class="order-empty">
      <div class="empty">
        <h2>您的店铺还没有商品</h2>
        <router-link :to="{ path: '/AddGoods' }">
                <el-button type="primary">添加商品</el-button>
        </router-link>
        
      </div>
    </div>
    <!-- 店铺为空的时候显示的内容END -->
</div>
</template>

<script>
export default {
     data() {
        return {
            goods:null,
            msg:'',
            categoryID: 6
        }
      },
      created()  {
            this.init();
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
      methods:{
        deleteGoods(id){
          this.postRequest('/api/deleteGoodsByGid',{
                g_id:id
            }).then(resp => {
                this.msg = resp.data.message;
                console.log(this.msg);
            })
            this.init()
        },
        init() {
          // 获取店铺数据
            this.postRequest('/api/getGoodsBySID',{
                s_id:this.categoryID
            }).then(resp => {
                this.goods = resp.data.message;
                console.log(this.goods);
            })
        }
      }
}
</script>

<style>

.order {
  background-color: #f5f5f5;
  padding-bottom: 20px;
}
/* 我的订单头部CSS */
.order .content ul .order-info {
  height: 60px;
  line-height: 60px;
  padding: 0 26px;
  color: #424242;
  border-bottom: 1px solid #4979e2;
}
.order .content ul .order-info .order-id {
  float: left;
  color: #070707;
  font-size: 18px;
}
.order .content ul .order-info .order-time {
  float: right;
}

.order .order-header {
  height: 64px;
  border-bottom: 2px solid #4979e2;
  background-color: #fff;
  margin-bottom: 20px;
}
.order .order-header .order-header-content {
  width: 80%;
  margin: 0 auto;
}
.order .order-header p {
  font-size: 28px;
  line-height: 58px;
  float: left;
  font-weight: normal;
  color: #424242;
}
/* 我的订单头部CSS END */
.order .content {
  width: 1225px;
  margin: 0 auto;
  background-color: #fff;
  margin-bottom: 50px;
}

.order .content ul {
  background-color: #fff;
  color: #424242;
  line-height: 85px;
}

.order .content ul .header {
  height: 85px;
  padding-right: 26px;
  color: #424242;
}
/* 我的订单表头CSS END */

/* 订单列表CSS */
.order .content ul .product-list {
  height: 85px;
  padding: 15px 26px 15px 0;
  border-top: 1px solid #e0e0e0;
}
.order .content ul .pro-img {
  float: left;
  height: 85px;
  width: 80px;
  padding-left: 20px;
}
.order .content ul .pro-img img {
  height: 80px;
  width: 80px;
}
.order .content ul .pro-name {
  float: left;
  width: 30%;
  height: 20px;
  text-align: center;
}
.order .content ul .pro-name a {
  color: #424242;
}
.order .content ul .pro-name a:hover {
  color: #4979e2;
}
.order .content ul .pro-price {
  float: left;
  width: 10%;
  text-align: center;
}
.order .content ul .pro-number {
  float: left;
  width: 8%;
  text-align: center;
}
.order .content ul .pro-passtime {
  float: left;
  width: 25%;
  text-align: center;
}
.order .content ul .pro-type {
  float: left;
  width: 10%;
  text-align: center;
}
.order .content ul .pro-operate {
  float: left;
  width: 5%;
  text-align: center;
}

.order .order-bar {
  width: 1185px;
  padding: 0 20px;
  border-top: 1px solid #4979e2;
  height: 50px;
  line-height: 50px;
  background-color: #fff;
}
.order .order-bar .order-bar-left {
  float: left;
}
.order .order-bar .order-bar-left .order-total {
  color: #757575;
}
.order .order-bar .order-bar-left .order-total-num {
  color: #4979e2;
}
.order .order-bar .order-bar-right {
  float: right;
}
.order .order-bar .order-bar-right .total-price-title {
  color: #4979e2;
  font-size: 14px;
}
.order .order-bar .order-bar-right .total-price {
  color: #4979e2;
  font-size: 30px;
}
/* 订单列表CSS END */

/* 订单为空的时候显示的内容CSS */
.order .order-empty {
  width: 1225px;
  margin: 0 auto;
}
.order .order-empty .empty {
  height: 300px;
  padding: 0 0 130px 558px;
  margin: 65px 0 0;
  background: url(../assets/imgs/cart-empty.png) no-repeat 124px 0;
  color: #b0b0b0;
  overflow: hidden;
}
.order .order-empty .empty h2 {
  margin: 70px 0 15px;
  font-size: 36px;
}
.order .order-empty .empty p {
  margin: 0 0 20px;
  font-size: 20px;
}
/* 订单为空的时候显示的内容CSS END */
</style>