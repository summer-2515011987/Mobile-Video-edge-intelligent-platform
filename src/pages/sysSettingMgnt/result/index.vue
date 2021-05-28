<template>
<div class="main_contain">
    <div class="headerd">
        <span class="el-icon-caret-right"></span>结果列表
    </div>
    <div class="myTable">
      <el-form :inline="true" :model="listQuery" class="demo-form-inline" style="text-align:left;">
          <el-form-item label="视频流：">
            <el-input v-model="listQuery.streamName" class="input-width" placeholder="" clearable></el-input>
             <!-- <el-select v-model="value" filterable placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select> -->
          </el-form-item>
          <el-form-item label="边缘节点：">
            <el-input v-model="listQuery.edgeName" class="input-width" placeholder="" clearable></el-input>
             <!-- <el-select v-model="value" filterable placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select> -->
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearchList()" class="searchBtn">查询搜索</el-button>
            <el-button type="primary" @click="handleResetSearch()" class="searchBtn">重置</el-button>
          </el-form-item>
      </el-form>
      <el-table ref="adminTable" :height="tableHeight" header-row-class-name="light_grey_table" 
                      :data="list"
                      style="width: 100%;"
                      v-loading="listLoading" stripe border>
              <el-table-column label="任务ID">
                <template slot-scope="scope">{{ scope.row.id }}</template>
              </el-table-column>
              <el-table-column label="视频流名称">
                <template slot-scope="scope">{{ scope.row.streamName }}</template>
              </el-table-column>
              <el-table-column label="边缘节点名称" >
                <template slot-scope="scope">{{ scope.row.edgeName }}</template>
              </el-table-column>
              <el-table-column label="应用能力">
                <template slot-scope="scope">{{ scope.row.appName }}</template>
              </el-table-column>
              <el-table-column label="抽帧频率" width="160">
                <template slot-scope="scope">{{ scope.row.frequency }}</template>
              </el-table-column>
              <el-table-column label="告警数量" prop="count">
              </el-table-column>
              <el-table-column label="操作"  >
                <template slot-scope="scope">
                  <el-button size="mini"
                             @click="handleSelectRole(scope.$index, scope.row)">详细
                  </el-button>

                   <!-- <el-button size="mini"
                             @click="handleAdd(scope.$index, scope.row)">新建
                  </el-button> -->
                    <!-- <el-button size="mini" type="danger"
                             @click="handleDelete(scope.$index, scope.row)">删除
                  </el-button>
                   <el-button size="mini"
                             @click="handleStop(scope.$index, scope.row)">开始
                  </el-button>
                   <el-button size="mini"
                             @click="handleStart(scope.$index, scope.row)">停止
                  </el-button> -->
                   <!-- <el-button size="mini"
                             @click="handleStart(scope.$index, scope.row)">展示结果
                  </el-button> -->
                  
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
                :page-sizes="[10,15,20]"
                :total="total">
            </el-pagination>
            <el-dialog  custom-class="step-dialog-radius"
                :title="isEdit?'编辑用户':'添加用户'"
                :visible.sync="dialogVisible"
                width="500px">
                <div slot="title" class="dialog-title">
                  <span class="tringle-red-icon"></span>
                  <span class="model-title-font">{{isEdit?'编辑用户':'添加用户'}}</span>
                </div>
              <el-form :model="admin"
                       ref="adminForm"
                       label-width="100px" size="small">
                <el-form-item label="帐号：">
                  <el-input v-model="admin.username" style="width: 300px"></el-input>
                </el-form-item>
                <el-form-item label="姓名：">
                  <el-input v-model="admin.nickName" style="width: 300px"></el-input>
                </el-form-item>
                <el-form-item label="邮箱：">
                  <el-input v-model="admin.email" style="width: 300px"></el-input>
                </el-form-item>
                <el-form-item label="密码：">
                  <el-input v-model="admin.password" type="password" style="width: 300px"></el-input>
                </el-form-item>
                <el-form-item label="备注：">
                  <el-input v-model="admin.note"
                            type="textarea"
                            :rows="5"
                            style="width: 300px"></el-input>
                </el-form-item>
                <el-form-item label="是否启用：">
                  <el-radio-group v-model="admin.status" style="width: 250px; display: inline-flex;">
                    <el-radio :label="1" style="padding-right: 10px;">是</el-radio>
                    <el-radio :label="0">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false" size="small">取 消</el-button>
                <el-button type="primary" @click="handleDialogConfirm()" size="small" class="searchBtn">确 定</el-button>
              </span>
            </el-dialog>
            <el-dialog  custom-class="step-dialog-radius" 
                :visible.sync="allocDialogVisible" width="30%">
                 <div slot="title" class="dialog-title">
                  <span class="tringle-red-icon"></span>
                  <span class="model-title-font">节点详细信息</span>
                </div>
              <el-form :label-position="labelPosition" label-width="150px" :model="formLabelAlign">
                <el-form-item label="cpu使用率">
                  <el-input v-model="formLabelAlign.name"></el-input>
                </el-form-item>
                <el-form-item label="内存使用率">
                  <el-input v-model="formLabelAlign.region"></el-input>
                </el-form-item>
                <el-form-item label="存储使用率">
                  <el-input v-model="formLabelAlign.type"></el-input>
                </el-form-item>
                <el-form-item label="已安装的应用数量">
                  <el-input v-model="formLabelAlign.type"></el-input>
                </el-form-item>
                <el-form-item label="已安装的应用">
                  <el-input v-model="formLabelAlign.type"></el-input>
                </el-form-item>
                <el-form-item label="已产生的消息数量">
                  <el-input v-model="formLabelAlign.type"></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="allocDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleAllocDialogConfirm()" class="searchBtn">确 定</el-button>
              </span>
            </el-dialog>
    </div>
</div>
</template>

<script>

import {fetchList, createAdmin, updateAdmin, updateStatus, deleteAdmin, getRoleByAdmin, allocRole} from '@/api/login';
import {fetchAllRoleList} from '@/api/role';
import {formatDate} from '@/utils/date';
import Service from '@/api/mobileApi'

const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  keyword: null
};
const defaultAdmin = {
  id: null,
  username: null,
  password: null,
  nickName: null,
  email: null,
  note: null,
  status: 1
};


export default {
  name: 'adminList',
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      list: null,
      total: null,
      listLoading: false,
      dialogVisible: false,
      admin: Object.assign({}, defaultAdmin),
      isEdit: false,
      allocDialogVisible: false,
      allocRoleIds: [],
      allRoleList: [],
      allocAdminId: null,
      tableHeight : (document.documentElement.clientHeight-380)+'px',
      labelPosition: 'right',
      formLabelAlign: {
        name: '20',
        region: '30',
        type: '40'
      },
      options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: ''
    }
  },
  created() {
    this.getList();
    this.getAllRoleList();
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
    handleSizeChange(val) {
      this.listQuery.pageNum = 1;
      this.listQuery.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val;
      this.getList();
    },
    handleAdd() {
      this.dialogVisible = true;
      this.isEdit = false;
      this.admin = Object.assign({}, defaultAdmin);
    },
    handleStatusChange(index, row) {
      this.$confirm('是否要修改该状态?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        updateStatus(row.id, {status: row.status}).then(response => {
          this.$message({
            type: 'success',
            message: '修改成功!'
          });
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消修改'
        });
        this.getList();
      });
    },
    handleDelete(index, row) {
      this.$confirm('是否要删除该用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.listLoading = true;
        Service.delTask(row.id).then(response => {
          if(response.code==0){
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getList();
          }
          this.listLoading = false;
        });
      }).catch(() => {
        this.listLoading = false;
      });
    },
    handleStop(){
       this.$confirm('是否开始任务?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.listLoading = true;
        Service.startTask(row.id).then(response => {
          if(response.code==0){
            this.$message({
              type: 'success',
              message: '开始成功!'
            });
            this.getList();
          }
          this.listLoading = false;
        });
      }).catch(() => {
        this.listLoading = false;
      });
    },
     handleStart(){
       this.$confirm('是否暂停任务?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.listLoading = true;
        Service.stopTask(row.id).then(response => {
          if(response.code==0){
            this.$message({
              type: 'success',
              message: '开始成功!'
            });
            this.getList();
          }
          this.listLoading = false;
        });
      }).catch(() => {
        this.listLoading = false;
      });
    },
    handleUpdate(index, row) {
      this.dialogVisible = true;
      this.isEdit = true;
      this.admin = Object.assign({}, row);
    },
    handleDialogConfirm() {
      this.$confirm('是否要确认?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.listLoading = true;
        if (this.isEdit) {
          Service.addTask(this.admin.id, this.admin).then(response => {
            this.dialogVisible = false;
            this.listLoading = false;
            if(response.code==0){
              this.$message({
                message: '修改成功！',
                type: 'success'
              });
              this.getList();
            }
          })
        } else {
          Service.addTask(this.admin).then(response => {
            if(response.code==0){
              this.$message({
                message: '添加成功！',
                type: 'success'
              });
            }
            this.dialogVisible = false;
            this.listLoading = false;
            this.getList();
          })
        }
      }).catch(() => {
        this.listLoading = false;
      })
    },
    handleAllocDialogConfirm() {
      this.$confirm('是否要确认?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.listLoading = true;
        let params = new URLSearchParams();
        params.append("adminId", this.allocAdminId);
        params.append("roleIds", this.allocRoleIds);
        allocRole(params).then(response => {
          this.$message({
            message: '分配成功！',
            type: 'success'
          });
          this.listLoading = false;
          this.allocDialogVisible = false;
        })
      }).catch(error => {
        this.listLoading = false;
      })
    },
    handleSelectRole(index, row) {
      // this.allocAdminId = row.id;
      // this.allocDialogVisible = true;
      // this.getRoleListByAdmin(row.id);
      sessionStorage.setItem("resultId", row.id);
      this.$router.push('/sysadmin/resultDetail');
    },
    getList() {
      this.listLoading = true;
      Service.findResultList(this.listQuery).then(response => {
        this.listLoading = false;
        if(response.code==0){
          this.list = response.data.list;
          this.total = response.data.total;
        }
      });
    },
    getAllRoleList() {
      // fetchAllRoleList().then(response => {
      //   this.allRoleList = response.data;
      // });
    },
    getRoleListByAdmin(adminId) {
      getRoleByAdmin(adminId).then(response => {
        let allocRoleList = response.data;
        this.allocRoleIds = [];
        if (allocRoleList != null && allocRoleList.length > 0) {
          for (let i = 0; i < allocRoleList.length; i++) {
            this.allocRoleIds.push(allocRoleList[i].id);
          }
        }
      });
    }
  }
}
</script>

<style scoped>
@import "../../../assets/css/sysSet/wordManagement.css";
</style>