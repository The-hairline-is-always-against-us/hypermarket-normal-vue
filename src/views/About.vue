<!--
 * @Description: 关于我们页面组件，未完成
 * @Author: hai-27
 * @Date: 2020-02-07 16:23:00
 * @LastEditors: hai-27
 * @LastEditTime: 2020-03-12 19:36:46
 -->
<template>
  <div class="about" id="about" name="about">
    <div class="about-header">
      <div class="about-title">
        <i class="el-icon-tickets" style="color: #ff6700;"></i>
        关于我们
      </div>
    </div>
    <div class="about-content">
      <img style="width: 100%"  src="http://182.92.208.18:9000/project/20201009/u%3D2474965466%2C416813503%26fm%3D26%26gp%3D0.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=admin%2F20201018%2F%2Fs3%2Faws4_request&X-Amz-Date=20201018T150513Z&X-Amz-Expires=432000&X-Amz-SignedHeaders=host&X-Amz-Signature=1520585a23c141b2fd5fb72c439fb266d4f15e9eee63c1d1e662f0ce1298df92">
    </div>
  </div>
</template>
<script>
export default {
};
</script>
<style scoped>
.about {
  background-color: #f5f5f5;
}
.about .about-header {
  height: 64px;
  background-color: #fff;
  border-bottom: 2px solid #ff6700;
}
.about .about-header .about-title {
  width: 1225px;
  margin: 0 auto;
  height: 64px;
  line-height: 64px;
  font-size: 28px;
}
.about .content {
  padding: 20px 0;
  width: 1225px;
  margin: 0 auto;
}
.about .content .goods-list {
  margin-left: -13.7px;
  overflow: hidden;
}
.about .about-content {
  width: 1225px;
  margin: 0 auto;
  background-color: #fff;
}
</style>
