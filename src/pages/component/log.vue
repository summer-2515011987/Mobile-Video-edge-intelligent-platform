<template>
    <div class="table-page">
        <div class="option-btn">
            <div>
                <i class="el-icon-refresh-right" @click="refreshTable">刷新</i>
            </div>
        </div>
        <el-table ref="multipleTable" :data="tableData" stripe tooltip-effect="dark" style="width: 100%">
            <el-table-column label="序号" type="index" :index="indexMethod" width="55"></el-table-column>
            <el-table-column prop="operation" label="用户操作" show-overflow-tooltip></el-table-column>
            <el-table-column prop="requestUri" label="请求URI" show-overflow-tooltip></el-table-column>
            <el-table-column prop="requestMethod" label="请求方式" width="80"></el-table-column>
            <el-table-column prop="requestParams" label="请求参数" show-overflow-tooltip></el-table-column>
            <el-table-column prop="ip" label="操作IP" show-overflow-tooltip></el-table-column>
            <el-table-column prop="status" label="状态" :formatter="stateFormat" width="60"></el-table-column>
            <el-table-column prop="msg" label="错误信息" show-overflow-tooltip></el-table-column>
            <el-table-column prop="createTime" label="记录时间" show-overflow-tooltip></el-table-column>
        </el-table>
        <el-pagination
            :page-size="$store.state.pageSize"
            :pager-count="$store.state.pagerCount"
            background
            layout="prev, pager, next, total"
            :total="$store.state.totalPage"
            @current-change="handleCurrentChange">
        </el-pagination>
    </div>
</template>
<script>
import logApi from "@/api/logApi"

export default {
    name: "log",
    data () {
        return {
            tableData: [],
            dialogFormVisible: false,
            formLabelWidth: '120px',
            isRefreshTable: false
        }
    },
    mounted() {
        this.getTableData();
    },
    methods: {
        // 获取table数据
        getTableData (obj) {
            logApi.logGetList(this,{
                data: obj,
                back: resp=> {
                    if (resp.code == 0) {
                        this.tableData = resp.data.content;
                        this.$store.state.totalPage = resp.data.totalElements;
                        if (this.isRefreshTable) {
                            this.$message({
                                message: '刷新成功！',
                                type: 'success'
                            });
                        }
                        this.isRefreshTable = false;
                    }
                    else {
                        this.$message.error(resp.msg);
                    }
                }
            })
        },

        // 序号自增
        indexMethod (index) {
            return index + 1;
        },

        // table 刷新 重新获取接口
        refreshTable () {
            this.isRefreshTable = true;
            this.getTableData();
        },

        // 状态栏
        stateFormat (row, column) {
            if (row.status == 1) {
                return '成功'
            } else  {
                return '失败'
            } 
        },

        // 翻页
        handleCurrentChange (val) {
            const data = {
                "pageIndex": val,
                "pageSize": 10
            }
            this.getTableData(data);
        }
    }
}
</script>
<style>
@import "../../assets/css/common-table.css";
</style>
