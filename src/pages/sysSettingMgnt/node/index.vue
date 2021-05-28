<template>
<div class="main_contain">
    <div class="headerd">
        <span class="el-icon-caret-right"></span>
            边缘节点列表
         <el-button
            type="primary"
            class="freshBtn"
            style="float: right; margin-top: 10px; margin-right: 10px"
            @click="handlerefreshData()"
            >刷新</el-button
          >
    </div>
    <div class="myTable">
      <el-form :inline="true" :model="listQuery" class="demo-form-inline" style="text-align:left;">
          <el-form-item label="节点名称：">
            <el-input v-model="listQuery.name" class="input-width" placeholder="" clearable></el-input>
          </el-form-item>
          <!-- <el-form-item label="所属组织：">
            <el-input v-model="listQuery.depart" class="input-width" placeholder="" clearable></el-input>
          </el-form-item> -->
          <el-form-item>
            <el-button type="primary" @click="handleSearchList()" class="searchBtn">查询搜索</el-button>
            <el-button type="primary" @click="handleResetSearch()" class="searchBtn">重置</el-button>
          </el-form-item>
          <el-button type="primary"  style="float:right;margin-bottom:10px;" class="searchBtn" @click="allocDialogVisible=true;">新增</el-button>
      </el-form>
      <el-table ref="adminTable" :height="tableHeight" header-row-class-name="light_grey_table" 
                      :data="list"
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
                <template slot-scope="scope">{{ scope.row.deviceid }}</template>
                <!-- <template slot-scope="scope">{{ scope.row.createTime | formatDateTime }}</template> -->
              </el-table-column>
              <!-- <el-table-column label="所属组织">
                <template >北京分公司</template>
              </el-table-column> -->
              <el-table-column label="在线状态"  >
                <template slot-scope="scope">
                  <!-- <el-switch
                      @change="handleStatusChange(scope.$index, scope.row)"
                      :active-value="1"
                      :inactive-value="0"
                      v-model="scope.row.status">
                  </el-switch> -->
                  <span v-if="scope.row.status==1">在线</span>
                  <span v-else>离线</span>
                </template>
              </el-table-column>
              <el-table-column label="操作"  >
                <template slot-scope="scope">
                  <el-button size="mini"  @click="handleSelectRole(scope.$index, scope.row)">详细
                  </el-button>
                  <el-button size="mini" type="danger" @click="delNode(scope.$index, scope.row)">删除
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
                <el-form-item label="节点名称">
                  <el-input v-model="formLabelAlign.name"></el-input>
                </el-form-item>
                <el-form-item label="节点型号">
                  <el-input v-model="formLabelAlign.type"></el-input>
                </el-form-item>
                <el-form-item label="cpu架构">
                  <el-input v-model="formLabelAlign.cpu"></el-input>
                </el-form-item>
                <el-form-item label="deviceid">
                  <el-input v-model="formLabelAlign.deviceid"></el-input>
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
import {formatDate} from '@/utils/date';
import service from '@/api/mobileApi';

const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  name: null
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
      total: 0,
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
          name: '',
          type: '',
          cpu: '',
          deviceid: ''
        }
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
        deleteAdmin(row.id).then(response => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getList();
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
      this.listLoading = true;
      if (this.isEdit) {
        updateAdmin(this.admin.id, this.admin).then(response => {
          this.$message({
            message: '修改成功！',
            type: 'success'
          });
          this.dialogVisible = false;
          this.listLoading = false;
          this.getList();
        })
      } else {
        createAdmin(this.admin).then(response => {
          this.$message({
            message: '添加成功！',
            type: 'success'
          });
          this.dialogVisible = false;
          this.listLoading = false;
          this.getList();
        })
      }
    },
    handleAllocDialogConfirm() {
      this.listLoading = true;
      service.addNode(this.formLabelAlign).then(response => {
        if(response.code==0){
          this.$message({
            message: '成功！',
            type: 'success'
          });
          this.getList();
        }
        this.listLoading = false;
        this.allocDialogVisible = false;
      })
    },
    handleSelectRole(index, row) {
      // this.allocAdminId = row.id;
      // this.allocDialogVisible = true;
      // this.getRoleListByAdmin(row.id);
      sessionStorage.setItem('nodeId', row.id);
      this.$router.push('/sysadmin/nodedetail');
    },
    getList() {
      this.listLoading = true;
      service.findNodeList(this.listQuery).then(response => {
        this.listLoading = false;
        if(response.code==0){
          this.list = response.data.list;
          this.total = response.data.total;
        }
      });
    },handlerefreshData(){
      this.getList();
    },
    delNode(index, row){
       this.$confirm('是否要删除该节点?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.listLoading = true;
         var param = {id: row.id};
         service.delNode(param).then(response => {
          if(response.code==0){
            this.$message({
              message:response.message,
              type: 'success'
            });
            this.listLoading = false;
            this.getList();
          }
          this.listLoading = false;
      }).catch(error => {
        this.listLoading = false;
      })

     
        // this.total = response.data.total;
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