<template>
<div class="main_contain">
    <div class="headerd">
        <span class="el-icon-caret-right"></span>视频流列表
    </div>
    <div class="myTable">
         <el-form :inline="true" :model="listQuery" class="demo-form-inline" style="text-align:left;">
           <el-form-item label="视频源名称：">
            <el-input v-model="listQuery.name" class="input-width" placeholder="" clearable></el-input>
          </el-form-item>
          <!-- <el-form-item label="所属组织：">
            <el-input v-model="listQuery.depart" class="input-width" placeholder="" clearable></el-input>
          </el-form-item> -->
          <el-form-item>
            <el-button type="primary" @click="handleSearchList()"  class="searchBtn">查询</el-button>
            <el-button type="primary" @click="handleResetSearch()"  class="searchBtn">重置</el-button>
          </el-form-item>
           <el-form-item style="float:right;">
            <el-button type="primary" @click="handleAdd()"  class="searchBtn">新增</el-button>
          </el-form-item>
        </el-form>
        <el-table ref="roleTable" header-row-class-name="light_grey_table"   :height="tableHeight"
                  :data="list"
                  style="width: 100%; "
                  v-loading="listLoading" stripe border>
          <el-table-column label="视频流名称">
            <template slot-scope="scope">{{ scope.row.name }}</template>
          </el-table-column>
           <el-table-column label="视频流地址">
            <template slot-scope="scope">{{ scope.row.url }}</template>
          </el-table-column>
          <!-- <el-table-column label="所属组织">
            <template >北京分公司</template>
          </el-table-column> -->
          <el-table-column label="操作" width="200px">
            <template slot-scope="scope">
              <!-- <el-button size="mini"
                         @click="handleUpdate(scope.$index, scope.row)">编辑
              </el-button> -->
              <el-button size="mini"
                         type="danger"
                         @click="handleDelete(scope.$index, scope.row)">删除
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
        </el-pagination>
    </div>
    <el-dialog custom-class="step-dialog-radius" 
            :visible.sync="dialogVisible"
            width="500px">
            <div slot="title" class="dialog-title">
                  <span class="tringle-red-icon"></span>
                  <span class="model-title-font">{{isEdit?'编辑':'新增'}}</span>
            </div>
          <el-form :model="dataTable"
                   ref="tableForm"
                   label-width="140px" size="small">
            <el-form-item label="视频源名称：">
              <el-input v-model="dataTable.name" style="width: 250px"></el-input>
            </el-form-item>
              <el-form-item label="视频源地址：">
                  <el-input v-model="dataTable.url" style="width: 250px"></el-input>
              </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleDialogConfirm()" size="small">确 定</el-button>
      </span>
        </el-dialog>
</div>

</template>
<script>
import dataManageSchoolMajor from '@/api/dataManageSchoolMajor';
import Service from '@/api/mobileApi'
const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  name: null
};
const defaultTable = {
    id: 0,
    year: null,
    province: null,
    majorCode: null,
    majorName: null,
    schoolCode: null,
    schoolName: null,
    majorYear: null,
    comment: null,
};
export default {
  name: 'schoolMajorList',
  data() {
    return {
      tableHeight : (document.documentElement.clientHeight-380)+'px',
      listQuery: Object.assign({}, defaultListQuery),
      list: null,
      total: null,
      listLoading: false,
      dialogVisible: false,
      dataTable: Object.assign({}, defaultTable),
      isEdit: false,
    }
  },
  created() {
    this.getList();
  },
  methods: {
    handleResetSearch() {
      this.listQuery = Object.assign({}, defaultListQuery);
      this.getList();
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
      this.dataTable = Object.assign({}, defaultTable);
    },
    handleDelete(index, row) {
      this.$confirm('是否要删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
          Service.delVideo({id:row.id}).then(response => {
          if(response.code==0){
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getList();
          }
        });
      });
    },
    handleUpdate(index, row) {
      this.dialogVisible = true;
      this.isEdit = true;
      this.dataTable = Object.assign({}, row);
    },
    handleDialogConfirm() {
      if (this.isEdit) {
            Service.editVideo(this.dataTable.id, this.dataTable).then(response => {
            if(response.code==0){
            this.$message({
              message: '修改成功！',
              type: 'success'
            });
            }
            this.dialogVisible = false;
            this.getList();
          })
        } else {
            Service.addVideo(this.dataTable).then(response => {
            this.$message({
              message: '添加成功！',
              type: 'success'
            });
            this.dialogVisible = false;
            this.getList();
          })
        }
    },
    getList() {
      this.listLoading = true;
        Service.findVideolList(this.listQuery).then(response => {
        this.listLoading = false;
        if(response.code==0){
        this.list = response.data.list;
        this.total = response.data.total;
        }
      });
    }
  }
}
</script>

<style scoped>
@import "../../../assets/css/sysSet/wordManagement.css";
</style>