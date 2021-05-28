<template>
    <el-container style="height: 100%">
        <el-header style="padding: 0;height: 77px">
            <setHeaderTop></setHeaderTop>
        </el-header>
        <el-container style="height: calc(100% - 77px);">
            <el-aside width="270px"  style="background-color: #304156">
                <sidebar></sidebar>
            </el-aside>
            <el-main class="main_div"  >
                <router-view/>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
import setHeaderTop from "@/pages/sysSettingMgnt/setLayout/setHeaderTop";
// import setAsideLeft from "@/pages/sysSettingMgnt/setLayout/setAsideLeft";
import {Sidebar} from './setLayout'

export default {
  name: "index",
  components: {
    setHeaderTop,
    Sidebar
  },
  data() {
    return {};
  },
  mounted() {
    // this.findMenuTree()
  },
  methods: {
    // findMenuTree() {

    // 	let data = {
    // 		name:'123123',
    // 		menuId: '1',
    // 		icon: 'ccaa'
    // 	}

    // 	this.$store.commit('setMenuTree', data);
    // }
  },
  computed: {
    sidebar() {
      // return this.$store.state.app.sidebar
    }
  }
}
</script>

<style scoped>
.main_div{
  padding: 30px;
  background:#e9effc75;
  overflow: hidden;

}
.el-header{
  padding: 0;
}
</style>
