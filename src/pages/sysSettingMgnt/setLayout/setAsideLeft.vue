<template>
   <el-aside width="270px" class="layout-aside"> 
     <el-col :span="24" class='asideheight'>
        <el-menu ref="asideMenu" router
          :default-active="activeIndex"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-submenu index="2"  key="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>可视化展示设置</span>
            </template>
            <el-menu-item index="/setIndex/zysjgl" >111</el-menu-item>
            <!-- <el-menu-item  >222</el-menu-item> -->
            <!-- <el-menu-item  >333</el-menu-item> -->
          </el-submenu>  
          <el-menu-item index="/setIndex/page1" key="1">
            <i class="el-icon-setting"></i>
            <span slot="title">职业数据管理</span>
          </el-menu-item>
        </el-menu>
      </el-col>
   </el-aside>
</template>
<script>
import loginApi from "@/api/loginAPI";
export default {
    name: "navMenu",
    data() {
        return {
          activeIndex: '/denIndex/home',
        };
    },
    mounted() {
        // this.$router.push("/denIndex/home");
    }, 
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
        logoutBtn() {
            this.$alert('确定要退出系统吗？', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  sessionStorage.clear();
                    localStorage.clear();
                    loginApi.logOutMethod(this, {
                        back: (resp) => {
                            if(resp.code === 0){
                                this.$router.push("/");
                                localStorage.clear();
                            }
                        }
                    })
                }
            })
        }
    }
}
</script>

<style scoped>
  .layout-aside{
    width: 270px;
    background: linear-gradient(90deg, #474E66 0%, #1F263E 100%);
    box-shadow: 5px 0px 8px 0px rgba(0, 0, 0, 0.1);
  }
  .el-menu-item.is-active {
    width: 270px;
    height: 45px;
    background: #454D69;
  }
  .el-submenu{
    width: 100%;
  }
  .el-submenu__title{
    width: 100%;
  }
  li {
      float: left;
      list-style: none;
      width: 100%;
  }

</style>
