<template>

  <el-card class="box-card h100p">
    <div slot="header" class="clearfix">
      <el-page-header @back="$router.back();" content="资源分类列表"></el-page-header>
    </div>

    <el-container>
      <el-header style="padding-left: 0; padding-right: 0" height="50px">
        <el-form :inline="true" class="demo-form-inline" style="text-align:left;">
          <el-form-item>
            <el-button type="primary" @click="handleAdd()"> 添加</el-button>
          </el-form-item>
        </el-form>
      </el-header>

      <el-main style="padding-left: 0; padding-right: 0 ;padding-top: 0">
        <el-table ref="resourceCategoryTable"
                  :data="list"
                  style="width: 100%;"
                  v-loading="listLoading" border>
          <!--      <el-table-column label="编号" width="100">-->
          <!--        <template slot-scope="scope">{{ scope.row.id }}</template>-->
          <!--      </el-table-column>-->
          <el-table-column label="名称">
            <template slot-scope="scope">{{ scope.row.name }}</template>
          </el-table-column>
          <el-table-column label="创建时间">
            <template slot-scope="scope">{{ scope.row.createTime | formatDateTime }}</template>
          </el-table-column>
          <el-table-column label="排序">
            <template slot-scope="scope">{{ scope.row.sort }}</template>
          </el-table-column>
          <el-table-column label="操作" width="180">
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
        <el-dialog custom-class="step-dialog-radius"  top="15%"
            v-loading="dialogLoading"  :visible.sync="dialogVisible"  width="500px">
            <div slot="title" class="dialog-title">
              <span class="tringle-red-icon"></span>
              <span class="model-title-font">添加分类</span>
            </div>
          <el-form :model="resourceCategory"
                   ref="resourceCategoryForm"
                   label-width="100px" size="small">
            <el-form-item label="名称：">
              <el-input v-model="resourceCategory.name" style="width: 250px"></el-input>
            </el-form-item>
            <el-form-item label="排序：">
              <el-input v-model="resourceCategory.sort" style="width: 250px"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleDialogConfirm()" :loading="dialogLoading" size="small">确 定</el-button>
      </span>
        </el-dialog>
      </el-main>

    </el-container>

  </el-card>

</template>
<script>
import {
  listAllCate,
  createResourceCategory,
  updateResourceCategory,
  deleteResourceCategory
} from '@/api/resourceCategory';
import {formatDate} from '@/utils/date';

const defaultResourceCategory = {
  name: null,
  sort: 0
};
export default {
  name: 'resourceCategoryList',
  data() {
    return {
      list: null,
      listLoading: false,
      dialogLoading: false,
      dialogVisible: false,
      isEdit: false,
      resourceCategory: Object.assign({}, defaultResourceCategory)
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
    handleAdd() {
      this.dialogVisible = true;
      this.isEdit = false;
      this.resourceCategory = Object.assign({}, defaultResourceCategory);
    },
    handleUpdate(index, row) {
      this.dialogVisible = true;
      this.isEdit = true;
      this.resourceCategory = Object.assign({}, row);
    },
    handleDelete(index, row) {
      this.$confirm('是否要删除该分类?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.listLoading = true;
        deleteResourceCategory(row.id).then(response => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getList();
        }).catch(error =>{
          this.listLoading = false;
        });
      });
    },
    handleDialogConfirm() {
      this.$confirm('是否要确认?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.dialogLoading = true;
        if (this.isEdit) {
          updateResourceCategory(this.resourceCategory.id, this.resourceCategory).then(response => {
            this.$message({
              message: '修改成功！',
              type: 'success'
            });
            this.dialogVisible = false;
            this.dialogLoading = false;
            this.getList();
          }).catch(error =>{
            this.dialogLoading =false;
          })
        } else {
          createResourceCategory(this.resourceCategory).then(response => {
            this.$message({
              message: '添加成功！',
              type: 'success'
            });
            this.dialogVisible = false;
            this.dialogLoading = false;
            this.getList();
          }).catch(error =>{
            this.dialogLoading = false;
          })
        }
      })
    },
    getList() {
      this.listLoading = true;
      listAllCate({}).then(response => {
        this.listLoading = false;
        this.list = response.data;
      }).catch(error =>{
        this.listLoading = false;
      });
    }
  }
}
</script>
<style scoped>

</style>