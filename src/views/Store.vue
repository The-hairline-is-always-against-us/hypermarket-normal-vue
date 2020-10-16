<template>
  <div class="store">
    <!-- 面包屑 -->
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
        <el-breadcrumb-item>全部商品</el-breadcrumb-item>
        <el-breadcrumb-item v-if="search">搜索</el-breadcrumb-item>
        <el-breadcrumb-item v-else>商铺</el-breadcrumb-item>
        <el-breadcrumb-item v-if="search">{{search}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 面包屑END -->

    <!-- 分类标签 -->
    <div class="nav">
      <div class="product-nav">
        <div class="title">商铺</div>
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane
            v-for="item in categoryList"
            :key="item.category_id"
            :label="item.category_name"
            :name="''+item.category_id"
          />
        </el-tabs>
      </div>
    </div>
    <!-- 分类标签END -->
      
  <div>

    <el-container>
      <el-header>
        <div style="margin-bottom: 10px;color:black;">
            <p style="color:coral;">
               热 / 销 / 榜 / 单
            </p>
        </div>
      </el-header>
      <div class="main-box">
      <div class="main">
        <!-- 手机商品展示区域 -->
        <div class="phone">
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
        <!-- 手机商品展示区域END -->
      </div>
      </div>
    </el-container>


    <el-container>
      <el-header>
        <div style="margin-bottom: 10px;color:black;">
            <p style="text-decoration:underline; ">
              新 / 品 / 榜 / 单
            </p>
        </div>
      </el-header>
      <div class="main-box">
      <div class="main">
        <!-- 手机商品展示区域 -->
        <div class="phone">
          <div class="box-bd">
            <div class="promo-list">
              <ul>
                <li>
                  <img :src="$target +'public/imgs/appliance/appliance-promo1.png'" />
                </li>
                <li>
                  <img :src="$target +'public/imgs/appliance/appliance-promo2.png'" />
                </li>
              </ul>
            </div>
            <div class="list">
              <MyList :list="phoneList" :isMore="true"></MyList>
            </div>
          </div>
        </div>
        <!-- 手机商品展示区域END -->
      </div>
      </div>
    </el-container>


    <el-container>
      <el-header>
        <div style="margin-bottom: 10px;color:black;">
            <p style="text-decoration:underline; ">
              上 / 月 / 热 / 销 / 榜 / 单
            </p>
        </div>
      </el-header>
      <div class="main-box">
      <div class="main">
        <!-- 手机商品展示区域 -->
        <div class="phone">
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
        <!-- 手机商品展示区域END -->
      </div>
      </div>
    </el-container>
  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentDate: new Date(),
      phoneList: "",// 手机商品列表
      search: "", // 搜索条件
      categoryList: "", //分类列表
      categoryID: [], // 分类id
    };
  },
  created() {
    // 获取各类商品数据
    this.getPromo("手机", "phoneList");
  },
  methods: {
    // 获取家电模块子组件传过来的数据
    getChildMsg(val) {
      this.applianceActive = val;
    },
    // 获取配件模块子组件传过来的数据
    getChildMsg2(val) {
      this.accessoryActive = val;
    },
    // 获取各类商品数据方法封装
    getPromo(categoryName, val, api) {
      api = api != undefined ? api : "/api/product/getPromoProduct";
      this.$axios
        .post(api, {
          categoryName
        })
        .then(res => {
          this[val] = res.data.Product;
        })
        .catch(err => {
          return Promise.reject(err);
        });
    },
    // 向后端请求分类列表数据
    getCategory() {
      this.$axios
        .post("/api/product/getCategory", {})
        .then(res => {
          const val = {
            category_id: 0,
            category_name: "全部"
          };
          const cate = res.data.category;
          cate.unshift(val);
          this.categoryList = cate;
        })
        .catch(err => {
          return Promise.reject(err);
        });
    },
    // 向后端请求全部商品或分类商品数据
    getData() {
      // 如果分类列表为空则请求全部商品数据，否则请求分类商品数据
      const api =
        this.categoryID.length == 0
          ? "/api/product/getAllProduct"
          : "/api/product/getProductByCategory";
      this.$axios
        .post(api, {
          categoryID: this.categoryID,
          currentPage: this.currentPage,
          pageSize: this.pageSize
        })
        .then(res => {
          this.product = res.data.Product;
          this.total = res.data.total;
        })
        .catch(err => {
          return Promise.reject(err);
        });
    }
  }
}
</script>

<style>
  
/* 面包屑CSS */
.el-tabs--card .el-tabs__header {
  border-bottom: none;
}
.store .breadcrumb {
  height: 50px;
  background-color: white;
}
.store .breadcrumb .el-breadcrumb {
  width: 1225px;
  line-height: 30px;
  font-size: 16px;
  margin: 0 auto;
}
/* 面包屑CSS END */

/* 分类标签CSS */
.store .nav {
  background-color: white;
}
.store .nav .product-nav {
  width: 1225px;
  height: 40px;
  line-height: 40px;
  margin: 0 auto;
}
.nav .product-nav .title {
  width: 50px;
  font-size: 16px;
  font-weight: 700;
  float: left;
}
/* 分类标签CSS END */

 .el-header {
    background-color: #fff;
    color: #333;
    line-height: 60px;
  }
  .el-header p{
    text-decoration:underline;
    font-size:24px;
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    /* line-height: 160px; */
  }
.store {
  background-color: #f5f5f5;
  padding-bottom: 20px;
  width: 1225px;
  margin: 0 auto;
  text-align: center;
}
.box-bd {
  height: 615px;
}

.box-bd .promo-list {
  float: left;
  height: 615px;
  width: 234px;
}

.box-bd .promo-list li {
  z-index: 1;
  width: 234px;
  height: 300px;
  margin-bottom: 14.5px;
  -webkit-transition: all 0.2s linear;
  transition: all 0.2s linear;
}

.box-bd .promo-list li:hover {
  z-index: 2;
  -webkit-box-shadow: 0 15px 30px rgba(0, 0, 0, .1);
  box-shadow: 0 15px 30px rgba(0, 0, 0, .1);
  -webkit-transform: translate3d(0, -2px, 0);
  transform: translate3d(0, -2px, 0);
}

.box-bd .promo-list li img {
  width: 234px;
  height: 300px;
}

.box-bd .promo-list img {
  width: 234px;
}

.box-bd .list {
  float: left;
  height: 615px;
  width: 991px;
}
</style>