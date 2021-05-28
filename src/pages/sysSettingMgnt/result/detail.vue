<template>
<div class="main_contain">
    <div class="headerd">
        <span class="el-icon-caret-right"></span>结果详情
        <el-button type="primary" class="searchBtn" style="float:right;margin-top:10px;margin-right:10px;" @click="$router.go(-1)">返回</el-button>
        <el-button type="primary" class="refreshBtn" style="float:right;margin-top:10px;margin-right:10px;" @click="handlerefreshData()">刷新</el-button>
    </div>
    <div class="myTable">
        <!-- <el-form :inline="true" :model="listQuery" class="demo-form-inline" style="text-align:left;">
          <el-form-item label="规则名称：">
            <el-input v-model="listQuery.name" class="input-width" placeholder="规则名称" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearchList()" class="searchBtn">搜索</el-button>
            <el-button type="primary" @click="handleResetSearch()" class="searchBtn">重置</el-button>
          </el-form-item>
        </el-form> -->
        <el-table ref="roleTable" header-row-class-name="light_grey_table"   :height="tableHeight"
                  :data="list"
                  style="width: 100%;" @selection-change="changeFun"
                  v-loading="listLoading" stripe border @row-dblclick="tableDbEdit">
            <!-- <el-table-column
                    type="selection"
                    width="55" >
            </el-table-column> -->
          <el-table-column label="视频流名称">
            <template slot-scope="scope">{{ scope.row.streamName }}</template>
          </el-table-column>
          <el-table-column label="边缘节点名称">
            <template slot-scope="scope">{{ scope.row.edgeName}}</template>
          </el-table-column>
            <el-table-column label="应用名称">
                <template slot-scope="scope">{{ scope.row.appName}}</template>
            </el-table-column>
            <el-table-column label="帧时间戳">
                <template slot-scope="scope">{{ scope.row.datetime}}</template>
            </el-table-column>
            <el-table-column label="帧图片">
                <template slot-scope="scope">
                    <!-- {{ scope.row.image }} -->
                    <img :src="scope.row.image" width="80px" height="80px"/>
                </template>
            </el-table-column>
            <el-table-column label="告警标签" show-overflow-tooltip="true">
                <template slot-scope="scope">{{ scope.row.label }}</template>
            </el-table-column>
            <el-table-column label="置信度" show-overflow-tooltip="true">
                <template slot-scope="scope">{{ scope.row.score }}</template>
            </el-table-column>
              <!-- <el-table-column label="创建时间">
                <template slot-scope="scope">{{ scope.row.createDatetime }}</template>
            </el-table-column> -->
            <!-- <el-table-column label="操作" width="400px"> -->
                <!-- <template slot-scope="scope"> -->
                    <!-- <el-button size="mini"
                               @click="handleUpdate(scope.$index, scope.row)">编辑
                    </el-button>
                    <el-button size="mini"
                               type="danger"
                               @click="handleDelete(scope.$index, scope.row)">删除
                    </el-button> -->
                     <!-- <el-button size="mini"
                               @click="handleDeploy(scope.$index, scope.row)">部署
                    </el-button> -->
<!-- 
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
     <el-dialog
            :title="isEdit?'编辑规则':'新增规则'"
            :visible.sync="dialogVisible"
            width="400px">
          <el-form :model="dataTable"
                   ref="tableForm"
                   label-width="150px" size="small">
            <el-form-item label="规则名称：">
                <el-input v-model="dataTable.verifyname" style="width: 130px"></el-input>
            </el-form-item>
              <el-form-item label="规则类型：">
                  <el-select v-model="verifytypeCn" @change="setTable"  placeholder="请选择" clearable :style="{width: '130px'}">
                      <el-option v-for="(item, index) in verifytypeLists" :key="index" :label="item.label" :value="item.value"
                                 :disabled="infoDisable"></el-option>
                  </el-select>
                  <el-input v-show="false" v-model="dataTable.verifytype" style="width: 0px;height: 0px"></el-input>
              </el-form-item>
            <el-form-item label="规则：" v-if="verifyIsShow">
                <el-select v-model="dataTable.verify" placeholder="请选择" @change="verifyChange" clearable :style="{width: '130px'}">
                    <el-option v-for="(item, index) in typeLists" :key="index" :label="item.label" :value="item.label"
                               :disabled="infoDisable"></el-option>
                </el-select>
            </el-form-item>
              <el-form-item label="关联字典：" v-if="dictIsShow">
                  <el-select v-model="dictName" @change="dictChange" placeholder="请选择" clearable :style="{width: '130px'}">
                      <el-option v-for="(item, index) in dictLists" :key="index" :label="item.label" :value="item.label"
                                 :disabled="item.disabled"></el-option>
                  </el-select>
                  <el-input v-show="false" v-model="dataTable.dictId" style="width: 0px;height: 0px"></el-input>
              </el-form-item>
            <el-form-item label="正则表达式：" v-if="regularIsShow">
                <el-input v-model="dataTable.verifycode" :disabled="infoDisable" style="width: 130px"></el-input>
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
import {formatDate} from '@/utils/date';
import dataManageVerify from "@/api/dataManageVerify";
import {fetchList,fetchListById,fetchDataListByDictName} from '@/api/dict'
import Service from '@/api/mobileApi'
const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  name: null
};
const defaultTable = {
    id: 0,
    verifyname: null,
    verify: null,
    verifytype:null,
    verifycode:null,
    creator:null,
    dictId:0,
    creationTime: 0,
    updatePerson: 0,
    updateTime: null,
};
export default {
  name: 'tableList',
  data() {
    return {
      tableHeight : (document.documentElement.clientHeight-380)+'px',
      listQuery: Object.assign({}, defaultListQuery),
      list: null,
      total: null,
      verifyIsShow:false,
      regularIsShow:false,
      dictIsShow:false,
      listLoading: false,
      dialogVisible: false,
      dataTable: Object.assign({}, defaultTable),
      isEdit: false,
      typeLists:[],
      verifytypeLists:[],
      dbLists:[],
      multipleSelection:[],
      dictLists:[],
      verifytypeCn:null,
      dictName:null,
      infoDisable:false,
      resultId: sessionStorage.getItem("resultId")
    }
  },
  created() {
    this.getList();
    this.getDictList();
  },

  filters: {
    formatDateTime(time) {
      if (time == null || time === '') {
        return 'N/A';
      }
      let date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    },formatVerifyType(verifyType){
        if(verifyType==0){
            return '默认类型';
        }else if(verifyType==1){
            return '字典类型';
        }else{
            return '正则类型';
        }
      }
  },
    mounted(){
        this.getTypeList();
        this.getVerifytypeList();
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
      handleDeploy(){
    this.$confirm('是否要部署?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.listLoading = true;
                Service.deployApp({edgeId:row.edge_id,appId:row.app_id}).then(response => {
                    this.listLoading = false;
                    if(response.code==0){
                        this.$message({
                            type: 'success',
                            message: '部署成功!'
                        });
                        this.getList();
                    }
                    
                });
            });
      },
      handleAdd() {
          this.dialogVisible = true;
          this.isEdit = false;
          this.dataTable = Object.assign({}, defaultTable);
          this.setDisable(0,0);
      },
      handleDelete(index, row) {
          this.$confirm('是否要删除?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
          }).then(() => {
              dataManageVerify.deleteVerify(row.id).then(response => {
                  this.$message({
                      type: 'success',
                      message: '删除成功!'
                  });
                  this.getList();
              });
          });
      }, setTable(val) {
          if (val == 0) {
              this.dictIsShow = false;
              this.regularIsShow = true;
              this.verifyIsShow = true;
              this.dataTable.verifytype = 0;
          } else if (val == 1) {
              this.regularIsShow = false;
              this.verifyIsShow = false;
              this.dictIsShow = true;
              this.dataTable.verifytype = 1;
          } else {
              this.verifyIsShow = false;
              this.dictIsShow = false;
              this.regularIsShow = true;
              this.dataTable.verifytype = 2;
          }
      },
      verifyChange(val) {
          if (val == '字符串') {
              this.dataTable.verifycode = '([\\s\\S]*)';
          } else if (val == '整型') {
              this.dataTable.verifycode = '^[1-9]\\d*|0$';
          } else if (val == '浮点') {
              this.dataTable.verifycode = '^\\d+(\\.\\d+)?$';
          } else if (val == '日期') {
              this.dataTable.verifycode = '^\\d{4}-\\d{1,2}-\\d{1,2}';
          }
      }, dictChange(dictName) {
        //   fetchDataListByDictName(dictName).then(response => {
        //       const result = response.data;
        //       this.dataTable.dictId = result[0].dictId;
        //   });
      }
      , changeFun(val) {
          this.multipleSelection = val;
      }, handleBatchDelete(index, row) {
          const rows = this.multipleSelection;
          if(rows.length==0){
              this.$message({
                  type: 'warning',
                  message: '请选择记录!'
              });
              return;
          }
          this.$confirm('是否要删除?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
          }).then(() => {
              const ids = new Array();
              for (let i = 0; i < rows.length; i++) {
                  ids.push(rows[i].id);
              }
              dataManageVerify.batchDeleteVerify(ids).then(response => {
                  this.$message({
                      type: 'success',
                      message: '删除成功!'
                  });
                  this.getList();
              });
          });
      },
      handleUpdate(index, row) {
          this.dialogVisible = true;
          this.isEdit = true;
          this.dataTable = Object.assign({}, row);
          const verifyType = row.verifytype;
          const dictid = row.dictId;
          const id = row.id;
          if (verifyType == 0) {
              this.verifytypeCn = '默认类型';
          } else if (verifyType == 1) {
              this.verifytypeCn = '字典类型';
          } else {
              this.verifytypeCn = '正则类型';
          }
          if (dictid != null) {
              //根据字典id获取字典名称
              this.getDictNameById(dictid);
          }
          //设置禁用项
          this.setDisable(verifyType,id);
          //设置表单显示项
          this.setTable(verifyType);
      },
      handleDialogConfirm() {
          if (this.isEdit) {
              dataManageVerify.updateData(this.dataTable.id, this.dataTable).then(response => {
                  this.$message({
                      message: '修改成功！',
                      type: 'success'
                  });
                  this.dialogVisible = false;
                  this.getList();
              })
          } else {
              dataManageVerify.createData(this.dataTable).then(response => {
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
          this.listQuery.taskId = this.resultId;
          Service.findResultDetail(this.listQuery).then(response => {
              this.listLoading = false;
              if(response.code==0){
                for(var da of response.data.list){
                    da.image = "data:image/jpg;base64,"+ da.image;
                }
                this.list = response.data.list;
                this.total = response.data.total;
              }
          });
      }, getDictList() {
        //   fetchList().then(response => {
        //       const result = response.data;
        //       console.log(result);
        //       const datas = new Array();
        //       for (let i = 0; i < result.length; i++) {
        //           datas.push({
        //               "label": result[i].name,
        //               "value": result[i].id
        //           })
        //       }
        //       this.dictLists = datas;
        //   });
      }, getVerifytypeList() {
          const verifytypes = [{
              "label": "默认类型",
              "value": "0"
          }, {
              "label": "字典类型",
              "value": "1"
          }, {
              "label": "正则类型",
              "value": "2"
          }]
          this.verifytypeLists = verifytypes;
      },
      getTypeList() {
          const datas = [{
              "label": "字符串",
              "value": "01"
          }, {
              "label": "整型",
              "value": "02"
          }, {
              "label": "浮点",
              "value": "03"
          }, {
              "label": "日期",
              "value": "04"
          }]
          this.typeLists = datas;
      }, getDictNameById(id) {
        //   fetchListById(id).then(response => {
        //       const result = response.data;
        //       this.dictName = result[0].name;
        //   });
      }, setDisable(verifytype,id) {
          if (verifytype == 0&&id!=0) {
              this.infoDisable = true;
          }else{
              this.infoDisable = false;
          }
      }, tableDbEdit(row, column, cell, event) {
        //   this.handleUpdate(0, row);
      },handlerefreshData(){
        this.getList();
      },
    //   timer() {
    //     return setTimeout(() => {
    //         this.getList();
    //     }, 5000);
    //   },
  },
  watch: {
    // list() {
    //   this.timer();
    // },
  },
  destroyed() {
    // clearTimeout(this.timer);
  },
}
</script>

<style scoped>
@import "../../../assets/css/sysSet/wordManagement.css";
.el-table td, .el-table th {
    padding: 12px 0;
    min-width: 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    text-overflow: ellipsis;
    vertical-align: middle;
    position: relative;
}

.el-input {
    position: relative;
    font-size: 14px;
    /* display: inline-block; */
    width: 100%;
}
.el-select {
    /* display: inline-block; */
    position: relative;
}
</style>