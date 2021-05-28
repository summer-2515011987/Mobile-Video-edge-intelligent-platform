<template>
<div class="main_contain">
    <div class="headerd">
        <span class="el-icon-caret-right"></span>日志列表
    </div>
    <div class="myTable">
        <el-form :inline="true" :model="listQuery" class="demo-form-inline" style="text-align:left;">
            <el-form-item label="功能">
                <el-input v-model="listQuery.function" class="input-width" placeholder="" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleSearchList()" class="searchBtn">查询</el-button>
                <el-button type="primary" @click="handleResetSearch()" class="searchBtn">重置</el-button>
            </el-form-item>
        </el-form>
        <el-table ref="roleTable" header-row-class-name="light_grey_table"   :height="tableHeight"
                  :data="list"
                  style="width: 100%;"
                  v-loading="listLoading" stripe border>
          <el-table-column label="功能">
            <template slot-scope="scope">{{ scope.row.function }}</template>
          </el-table-column>
          <el-table-column label="日志内容">
            <template slot-scope="scope">{{ scope.row.content }}</template>
          </el-table-column>
            <el-table-column label="操作ip">
                <template slot-scope="scope">{{ scope.row.ip }}</template>
            </el-table-column>
            <el-table-column label="操作时间">
                <template slot-scope="scope">{{ scope.row.datetime }}</template>
            </el-table-column>
             <!-- <el-table-column label="公司地址">
                <template slot-scope="scope">{{ scope.row.companyAddr }}</template>
            </el-table-column>
            <el-table-column label="行业">
                <template slot-scope="scope">{{ scope.row.industry }}</template>
            </el-table-column>
            <el-table-column label="数据来源平台">
                <template slot-scope="scope">{{ scope.row.dataSourcesPlatform }}</template>
            </el-table-column>
            <el-table-column label="工作地址">
                <template slot-scope="scope">{{ scope.row.workAddr }}</template>
            </el-table-column>
          <el-table-column label="创建时间">
            <template slot-scope="scope">{{ scope.row.createTime | formatDateTime }}</template>
          </el-table-column>
            <el-table-column
                    label="操作"
                    width="120">
                <template slot-scope="scope">
                    <a :href="scope.row.positionUrl" target="_blank" class="buttonText">点击查看详情</a>
                    <a @click="handleUpdate(scope.$index, scope.row)" class="buttonText">编辑</a>
                    <a @click="handleDelete(scope.$index, scope.row)" class="buttonText">删除</a>
                </template>
            </el-table-column> -->
        </el-table>
        <el-pagination  class="footer-pagination"
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
</div>


</template>
<script>
import dataManagePositionInfo from '@/api/dataManagePositionInfo';
import Service from '@/api/mobileApi'
import {formatDate} from '@/utils/date';

const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    keywords:null,
    sort:1,
    function: null,
};
const defaultTable = {
    id: 0,
    positionId: null,
    positionLabel: null,
    positionTitle: null,
    positionDetail: null,
    positionUrl: null,
    salary: null,
    salaryNum: null,
    positionCompanyUrl: null,
    companyName: null,
    companyAddr: null,
    companyWelfare: null,
    companyDetail: null,
    companyType: null,
    workAddr: null,
    industryCode: null,
    industry: null,
    dataSourcesPlatform: null,
    createTime: null,
};
export default {
  name: 'positionInfo',
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
      rules:{
          createTime: [{
              required: true,
              message: '请选择日期选择',
              trigger: 'change'
          }],
      }
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
    mounted(){
        
    },
  methods: {
    handleResetSearch() {
    this.listQuery=Object.assign({}, defaultListQuery);
      this.getList();
    },
    handleSearchList() {
      this.listQuery.pageNum = 1;
      this.listQuery.pageNumMore = 1;
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
    handleDelete(index, row) {
     },
    handleUpdate(index, row) {
      this.dialogVisible = true;
      this.isEdit = true;
      this.dataTable = Object.assign({}, row);
    },
    handleDialogConfirm() {
      this.$confirm('是否要确认?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.isEdit) {
            dataManagePositionInfo.updateData(this.dataTable).then(response => {
            this.$message({
              message: '修改成功！',
              type: 'success'
            });
            this.dialogVisible = false;
            this.getList();
          })
        } else {
            dataManagePositionInfo.createData(this.dataTable).then(response => {
            this.$message({
              message: '添加成功！',
              type: 'success'
            });
            this.dialogVisible = false;
            this.getList();
          })
        }
      })
    },
    getList() {
      this.listLoading = true;
        Service.findLogList(this.listQuery).then(response => {
        this.listLoading = false;
        if(response.code ==0){
          this.list = response.data.list;
          this.total = response.data.total;
        }
       
      });
    },
  }
}
</script>

<style scoped>
@import "../../../assets/css/sysSet/wordManagement.css";
</style>