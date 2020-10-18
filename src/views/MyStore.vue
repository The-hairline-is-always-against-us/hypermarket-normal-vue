<template>
<div class="order">
  <!-- 我的店铺主要内容 -->
    <div class="order-content" v-if="stores!==undefined&&stores!==null&&stores.length>0">
      <div class="content" v-for="(item,index) in stores" :key="index">
        <ul>
             <!-- 我的订单表头 -->
          <li class="order-info">
            <div class="order-id">商铺编号: {{item.s_id}}</div>
            <div class="order-time">
              <router-link :to="{ path: '/ApplyStore' }">
                <el-button type="primary">添加店铺</el-button>
              </router-link>
            </div>
          </li>
          <!-- 我的店铺表头 -->
          <li class="header">
            <div class="pro-img"></div>
            <div class="pro-name">商铺名称</div>
            <div class="pro-applytime">申请时间</div>
            <div class="pro-passtime">批准时间</div>
          </li>
          <!-- 我的订单表头END -->

          <!-- 订单列表 -->
          <li class="product-list">
            <div class="pro-img">
              <router-link :to="{ path: '/goods/details', query: {productID:item.s_id} }">
                <img src="../assets/imgs/store.png" />
              </router-link>
            </div>
            <div class="pro-name">
              <router-link
                :to="{ path: '/goods/details', query: {productID:item.s_id} }"
              >{{item.s_name}}</router-link>
            </div>
            <div class="pro-applytime">{{item.request_time}}</div>
            
            <div class="pro-passtime" v-if="item.create_time !==null">{{item.create_time}}</div>
            <div class="pro-passtime" v-if="item.create_time ===null" style="color:red">未批准</div>
          </li>
        </ul>
        <div class="order-bar">
          <div class="order-bar-left">
            <span class="order-total">

            </span>
          </div>
          <div class="order-bar-right">
              <router-link :to="{ path: '/Storedetails',query: {categoryID:item.s_id} }">
                <span v-if="item.create_time !==null">
                    <el-button type="success" plain>查看详情</el-button>
                </span>
              </router-link>
                <span v-if="item.create_time ===null">
                    <el-button type="primary" plain @click="deleteApply(item.s_id)">取消申请</el-button>
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
        <h2>您还没有店铺</h2>
        <router-link :to="{ path: '/ApplyStore' }">
                <el-button type="primary">添加店铺</el-button>
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
            stores:null,
            msg:''
        }
      },
      created()  {
            this.init();
      },
      methods:{
        deleteApply(id){
          this.postRequest('/api/deleteStoreBySid',{
                s_id:id
            }).then(resp => {
                this.msg = resp.data.message;
                console.log(this.msg);
            })
            this.init()
        },
        init() {
          // 获取店铺数据
            this.postRequest('/api/getStoreByUid',{
            }).then(resp => {
                this.stores = resp.data.message;
                console.log(this.stores);
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
  width: 120px;
  padding-left: 80px;
}
.order .content ul .pro-img img {
  height: 80px;
  width: 80px;
}
.order .content ul .pro-name {
  float: left;
  width: 20%;
  text-align: center;
}
.order .content ul .pro-name a {
  color: #424242;
}
.order .content ul .pro-name a:hover {
  color: #4979e2;
}
.order .content ul .pro-applytime {
  float: left;
  width: 25%;
  padding-right: 18px;
  text-align: center;
}
.order .content ul .pro-passtime {
  float: left;
  width: 25%;
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