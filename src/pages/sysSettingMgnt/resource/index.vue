<template>

<div class="main_contain">
    <div class="headerd">
        <span class="el-icon-caret-right"></span>资源列表
    </div>
    <div class="myTable">
        <el-form :inline="true" :model="listQuery" class="demo-form-inline" style="text-align:left;">
            <el-form-item label="资源名称：">
              <el-input v-model="listQuery.nameKeyword" class="input-width" placeholder="资源名称" clearable></el-input>
            </el-form-item>
            <el-form-item label="资源路径：">
              <el-input v-model="listQuery.urlKeyword" class="input-width" placeholder="资源路径" clearable></el-input>
            </el-form-item>
            <el-form-item label="资源分类：">
              <el-select v-model="listQuery.categoryId" placeholder="全部" clearable class="input-width">
                <el-option v-for="item in categoryOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleSearchList()" class="searchBtn">查询搜索</el-button>
              <el-button type="primary" @click="handleResetSearch()" class="searchBtn">重置</el-button>
            </el-form-item>
              <el-button type="primary" @click="handleAdd()" class="searchBtn fr"> 添加</el-button>
              <el-button type="primary" @click="handleShowCategory()" class="searchBtn fr mr15">资源分类</el-button>
        </el-form>
        <el-table ref="resourceTable" header-row-class-name="light_grey_table"   :height="tableHeight"
                  :data="list"  style="width: 100%;" v-loading="listLoading" border>
          <el-table-column label="资源名称">
            <template slot-scope="scope">{{ scope.row.name }}</template>
          </el-table-column>
          <el-table-column label="资源路径">
            <template slot-scope="scope">{{ scope.row.url }}</template>
          </el-table-column>
          <el-table-column label="描述">
            <template slot-scope="scope">{{ scope.row.description }}</template>
          </el-table-column>
          <el-table-column label="添加时间" width="160">
            <template slot-scope="scope">{{ scope.row.createTime | formatDateTime }}</template>
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-button size="mini"
                         @click="handleUpdate(scope.$index, scope.row)">编辑
              </el-button>
              <el-button size="mini"
                         type="danger"
                         @click="handleDelete(scope.$index, scope.row)">删除
              </el-button>
            </template>
          </el-table-column>
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
    <el-dialog  custom-class="step-dialog-radius"
            :visible.sync="dialogVisible"
            width="500px">
            <div slot="title" class="dialog-title">
                  <span class="tringle-red-icon"></span>
                  <span class="model-title-font">{{isEdit?'编辑资源':'添加资源'}}</span>
                </div>
          <el-form
              v-loading="formLoading"
              :model="resource"
              ref="resourceForm"
              label-width="100px" size="small">
            <el-form-item label="资源名称：">
              <el-input v-model="resource.name" style="width: 250px"></el-input>
            </el-form-item>
            <el-form-item label="资源路径：">
              <el-input v-model="resource.url" style="width: 250px"></el-input>
            </el-form-item>
            <el-form-item label="资源分类：">
              <el-select v-model="resource.categoryId" placeholder="全部" clearable style="width: 250px"
                         :loading="categoryIdDataLoading"
              >
                <el-option v-for="item in categoryOptions"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="描述：">
              <el-input v-model="resource.description"
                        type="textarea"
                        :rows="5"
                        style="width: 250px"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false" size="small">取 消</el-button>
            <el-button type="primary" @click="handleDialogConfirm()" size="small" :loading="formLoading">确 定</el-button>
          </span>
        </el-dialog>
</div>
</template>
<script>
import {fetchList, createResource, updateResource, deleteResource} from '@/api/resource';
import {listAllCate} from '@/api/resourceCategory';
import {formatDate} from '@/utils/date';

const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  nameKeyword: null,
  urlKeyword: null,
  categoryId: null
};
const defaultResource = {
  id: null,
  name: null,
  url: null,
  categoryId: null,
  description: ''
};
export default {
  name: 'resourceList',
  data() {
    return {
      tableHeight : (document.documentElement.clientHeight-380)+'px',
      listQuery: Object.assign({}, defaultListQuery),
      list: null,
      total: null,
      listLoading: false,
      dialogVisible: false,
      formLoading: false,
      resource: Object.assign({}, defaultResource),
      isEdit: false,
      categoryOptions: [],
      categoryIdDataLoading: true,
      defaultCategoryId: null
    }
  },
  created() {
    this.getList();
    this.getCateList();
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
      this.resource = Object.assign({}, defaultResource);
      this.resource.categoryId = this.defaultCategoryId;
    },
    handleDelete(index, row) {
      this.$confirm('是否要删除该资源?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.listLoading = true;
        deleteResource(row.id).then(response => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getList();
        }).catch(error =>{
          this.listLoading = false;
        });
      }).catch(error =>{
        this.listLoading = false;
      });
    },
    handleUpdate(index, row) {
      this.dialogVisible = true;
      this.isEdit = true;
      this.resource = Object.assign({}, row);
    },
    handleDialogConfirm() {
      this.$confirm('是否要确认?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.formLoading = true;
        if (this.isEdit) {
          updateResource(this.resource.id, this.resource).then(response => {
            this.$message({
              message: '修改成功！',
              type: 'success'
            });
            this.formLoading = false;
            this.dialogVisible = false;
            this.getList();
          }).catch(error => {
            this.formLoading = false;
          });
        } else {
          createResource(this.resource).then(response => {
            this.$message({
              message: '添加成功！',
              type: 'success'
            });
            this.formLoading = false;
            this.dialogVisible = false;
            this.getList();
          }).catch(error => {
            this.formLoading = false;
          });
        }
      }).catch(error =>{
        this.formLoading = false;
        this.dialogVisible = false;
      });
    },
    handleShowCategory() {
      this.$router.push({path: '/sysadmin/resourceCategory'})
    },
    getList() {
      this.listLoading = true;
      fetchList(this.listQuery).then(response => {
        this.listLoading = false;
        this.list = response.data.list;
        this.total = response.data.total;
      }).catch(error => {
        this.listLoading = false;
      });
    },
    getCateList() {
      this.categoryIdDataLoading = true;
      listAllCate().then(response => {
        let cateList = response.data;
        for (let i = 0; i < cateList.length; i++) {
          let cate = cateList[i];
          this.categoryOptions.push({label: cate.name, value: cate.id});
        }
        this.defaultCategoryId = cateList[0].id;
        this.categoryIdDataLoading = false;
      }).catch(error =>{
        this.categoryIdDataLoading = false;
      })
    }
  }
}
</script>

<style scoped>
@import "../../../assets/css/sysSet/wordManagement.css";
</style>


