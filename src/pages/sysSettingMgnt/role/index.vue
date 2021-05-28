<template>
<div class="main_contain">
    <div class="headerd">
        <span class="el-icon-caret-right"></span>
            应用列表
    </div>
    <div class="myTable">
       <el-form :inline="true" :model="listQuery" class="demo-form-inline" style="text-align:left;">
          <el-form-item label="应用名称：">
            <el-input v-model="listQuery.name" class="input-width" placeholder="" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearchList()" class="searchBtn">查询搜索</el-button>
            <el-button type="primary" @click="handleResetSearch()" class="searchBtn">重置</el-button>
          </el-form-item>
        </el-form>
        <!-- <el-table ref="roleTable" header-row-class-name="light_grey_table"   :height="tableHeight"
                  :data="list"
                  style="width: 100%;flex:1; min-height: 500px"
                  v-loading="listLoading" stripe border>
          <el-table-column label="应用图标">
            <template slot-scope="scope"><span class="el-icon-minus"></span>{{ scope.row.name }}</template>
          </el-table-column>
          <el-table-column label="应用描述">
            <template slot-scope="scope">{{ scope.row.description }}</template>
          </el-table-column>
          <el-table-column label="应用支持的cpu或芯片架构">
            <template slot-scope="scope">{{ scope.row.createTime | formatDateTime }}</template>
          </el-table-column>
          <el-table-column label="部署方式"  >
            <template slot-scope="scope">
              <el-switch
                  @change="handleStatusChange(scope.$index, scope.row)"
                  :active-value="1"
                  :inactive-value="0"
                  v-model="scope.row.status">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100px">
            <template slot-scope="scope">
              <el-button size="mini"
                         type="danger"
                         @click="handleDelete(scope.$index, scope.row)">部署
              </el-button>  
            </template>
          </el-table-column>
        </el-table>
             <el-pagination class="footer-pagination"
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            layout="total, sizes,prev, pager, next,jumper"
            :current-page.sync="listQuery.pageNum"
            :page-size="listQuery.pageSize"
            :page-sizes="[10,20,30]"
            :total="total">
        </el-pagination> -->

        <el-row style="height: 100%;overflow: auto;">
            <el-col :span="8" v-for="o in list" :key="o.id" >
              <el-card :body-style="{ 'padding': '10px', 'text-align':'left','height':'255px'}">
                <div style="line-height:60px;height:60px;">
                    <img :src="o.image" width="60px" height="60px"  >
                    <span style="font-size:16px;display:inline-block;margin-left:10px;line-height:30px;">
                      <div style="font-weight:600">{{o.name}}</div>
                      cpu架构：<span style="font-weight:600">{{o.cpu}}</span>
                      </span>
                </div>
                <div style="padding: 14px;">
                  <div style="height: 65px;">
                    <span>{{o.desc}}</span>
                  </div>
                  <div class="bottom clearfix" style="font-size:16px;">
                    部署方式：<span style="font-weight:600;line-height: 24px;font-size:14px;">{{o.deploy_way}}</span>
                     <el-button type="primary" style="float:right;" v-if="o.deploy_status==1" @click="showDeployDialog(o)">部署</el-button>
                  </div>
                </div>
              </el-card>
            </el-col>
        </el-row>
        
        <el-dialog  custom-class="step-dialog-radius"
            :visible.sync="dialogVisible"
            width="800px">
            <div slot="title" class="dialog-title">
              <span class="tringle-red-icon"></span>
              <span class="model-title-font">选择节点</span>
            </div>
            <el-table ref="adminTable" :height="tableHeight" header-row-class-name="light_grey_table" 
                      :data="nodeList"  highlight-current-row @current-change="handleCurrentChange"
                      style="width: 100%;"  
                      v-loading="listLoading" stripe border>
              <el-table-column label="节点名称">
                <template slot-scope="scope">{{ scope.row.name }}</template>
              </el-table-column>
              <el-table-column label="节点型号"  >
                <template slot-scope="scope">{{ scope.row.type }}</template>
              </el-table-column>
              <el-table-column label="cpu架构">
                <template slot-scope="scope">{{ scope.row.cpu }}</template>
              </el-table-column>
              <el-table-column label="deviceid"  prop="deviceid">
              </el-table-column>
              <el-table-column label="在线状态"  >
                <template slot-scope="scope">
                  <span v-if="scope.row.status==1">在线</span>
                  <span v-else>离线</span>
                </template>
              </el-table-column>
              <!-- <el-table-column label="操作"  >
                <template slot-scope="scope">
                  <el-button size="mini"  @click="handleSelectRole(scope.$index, scope.row)">详细
                  </el-button>
                  <el-button size="mini" type="danger" @click="delNode(scope.$index, scope.row)">删除
                  </el-button>
                </template>
              </el-table-column> -->
            </el-table>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false" size="small">取 消</el-button>
            <el-button type="primary" @click="handleDialogConfirm()" size="small">确定部署</el-button>
          </span>
        </el-dialog>
    </div>
</div>
</template>
<script>
import {fetchList, createRole, updateRole, updateStatus, deleteRole} from '@/api/role';
import {formatDate} from '@/utils/date';
import service from '@/api/mobileApi';

const defaultListQuery = {
  pageNum: 1,
  pageSize: 12,
  name: null
};
const defaultRole = {
  id: null,
  name: null,
  description: null,
  adminCount: 0,
  status: 1
};
export default {
  name: 'roleList',
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      list: null,
      total: null,
      listLoading: false,
      dialogVisible: false,
      role: Object.assign({}, defaultRole),
      isEdit: false,
      tableHeight : (document.documentElement.clientHeight-380)+'px',
      currentRow: null,
      chooseAppData: null,
      nodeList: null
    }
  },
  created() {
    this.getList();
  },
  filters: {
    formatDateTime(time) {
      if (time == null || time === '') {
        return 'N/A';
      }
      let date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    }
  },
  methods: {
    handleResetSearch() {
      this.listQuery = Object.assign({}, defaultListQuery);
    },
    handleSearchList() {
      this.listQuery.pageNum = 1;
      this.getList();
    },
    handleDialogConfirm() {
          var params = {
            appId: this.chooseAppData.id,
            edgeId: this.currentRow.id,
          }
          service.deployApp(params).then(response => {
            if(response.code==0){
            this.$message({
              message: '部署成功！',
              type: 'success'
            });
            }
            this.dialogVisible = false;
            this.getList();
          })
    },
    showDeployDialog(appData){
      this.chooseAppData = appData;
      this.dialogVisible = true;
      this.findNodeList();
    },
    getList() {
      this.listLoading = true;
      service.findAppList(this.listQuery).then(response => {
        this.listLoading = false;
        if(response.code==0){
          this.list = response.data.list;
          this.total = response.data.total;
        }
      });
    },
    findNodeList(){
      this.listLoading = true;
      service.findNodeList(this.listQuery).then(response => {
        this.listLoading = false;
        if(response.code==0){
        this.nodeList = response.data.list;
        // this.total = response.data.total;
        }
      });
    },
      handleCurrentChange(val) {
        this.currentRow = val;
      }
  }
}
</script>

<style scoped>
@import "../../../assets/css/sysSet/wordManagement.css";
  .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
  >>>.el-card.is-always-shadow, .el-card.is-hover-shadow:focus, .el-card.is-hover-shadow:hover {
    width: 95%;
  }
  >>>.el-card {
    margin-bottom: 10px;
  }
  >>>.el-table--striped .el-table__body tr.el-table__row--striped.current-row td {
    background-color: #fdcda9;
  }
  >>>.el-table__body tr.current-row>td {
      background-color: #fdcda9;
  }
</style>