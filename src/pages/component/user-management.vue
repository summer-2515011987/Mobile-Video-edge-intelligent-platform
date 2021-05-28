<template>
    <div class="table-page">
        <div v-if="localData.id === '1'">
            <div class="option-btn">
                <i class="el-icon-refresh-right" @click="refreshTable">刷新</i>
                <i class="el-icon-circle-plus-outline" @click="addBtnClick">添加</i>
                <i class="el-icon-delete" @click="deleteTableData">删除</i>
            </div>
            <el-table ref="multipleTable" :data="tableData" stripe tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" v-loading="loading">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="id" label="序号" type="index" :index="indexMethod"></el-table-column>
                <el-table-column prop="username" label="用户名" show-overflow-tooltip></el-table-column>
                <el-table-column prop="userEmail" label="邮箱" show-overflow-tooltip></el-table-column>
                <el-table-column prop="createTime" label="创建时间" show-overflow-tooltip></el-table-column>
                <el-table-column label="操作" width="55">
                    <template slot-scope="scope">
                        <i class="el-icon-edit-outline" @click="editBtnClick((scope.$index, scope.row))"></i>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                :page-size="$store.state.pageSize"
                :pager-count="$store.state.pagerCount"
                background
                layout="prev, pager, next, total"
                :total="$store.state.totalPage"
                @current-change="handleCurrentChange">
            </el-pagination>
            <el-dialog title="" :visible.sync="dialogFormVisible" custom-class="dialog-box" :before-close="closeDialog">
                <span slot="title" class="dialog-title">
                    {{ $store.state.dialogTitle }}
                </span>
                <el-form :model="accountForm" ref="form">
                    <el-form-item label="用户名:" :label-width="formLabelWidth" prop="username"
                    :rules="[
                        { required: true, message: '请输入姓名', trigger: 'blur' }
                    ]">
                        <el-input v-model.trim="accountForm.username" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码:" :label-width="formLabelWidth" prop="password"
                    :rules="[
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                    ]">
                        <el-input v-model.trim="accountForm.password" autocomplete="off" type="password"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱:" :label-width="formLabelWidth" prop="userEmail" 
                    :rules="[
                        { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                    ]">
                        <el-input v-model.trim="accountForm.userEmail" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer" ref="form">
                    <el-button @click="closeDialog">取 消</el-button>
                    <el-button type="primary" @click="dialogConfirmBtn('form')">确 定</el-button>
                </div>
            </el-dialog>
        </div>
        <div v-else class="user-info">
            <el-form :model="accountForm" ref="userInfoForm">
                <el-form-item label="用户名:" :label-width="formLabelWidth" prop="username"
                :rules="[
                    { required: true, message: '请输入姓名', trigger: 'blur' }
                ]">
                    <el-input v-model.trim="accountForm.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码:" :label-width="formLabelWidth" prop="password"
                :rules="[
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { message: '请输入密码', trigger: ['blur', 'change'] }
                ]">
                    <el-input v-model.trim="accountForm.password" autocomplete="off" type="password"></el-input>
                </el-form-item>
                <el-form-item label="邮箱:" :label-width="formLabelWidth" prop="userEmail" 
                :rules="[
                    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                ]">
                    <el-input v-model.trim="accountForm.userEmail" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" ref="form">
                <el-button type="primary" @click="changeUserInfo('userInfoForm')">确 定</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import userApi from '@/api/userApi';
import loginApi from "@/api/loginAPI";

export default {
    name: "userManagement",
    data () {
        return {
            tableData: [],
            dialogFormVisible: false,
            accountForm: {
                username: '',
                userEmail: '',
                password: ''
            },
            formLabelWidth: '120px',
            loading: true,
            isRefreshTable: false,
            oldEmail: ''
        }
    },
    props: {
        localData: Object
    },
    mounted() {
    },
    // 解决刷新时，munted获取不到localData
    watch: {
        localData: function(val){
            if (val && (val.id !== '1')) {
                this.accountForm.username = this.localData.username;
                this.accountForm.userEmail = this.localData.userEmail;
                this.accountForm.password = '********';
            }
            else {
                this.getTableData();
            }
        }
    },
    methods: {
        // 获取数据
        getTableData(obj) {
            userApi.userGetList(this,{
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
                        this.loading = false;
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

        // 编辑
        editBtnClick (row) {
            this.$store.state.dialogTitle = "编辑";
            this.accountForm = Object.assign({}, row); // 将数据传入dialog页面
            this.oldEmail = row.userEmail;
            this.dialogFormVisible = true;
        },

        // table 选中
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },

        // table 删除 暂不不支持批量删除
        deleteTableData (){
            if (!this.multipleSelection || this.multipleSelection.legend < 1) {
                this.$message({
                    message: '请选择一条要删除的数据！',
                    type: 'warning'
                });
            }
            else {
                this.$alert('确定要删除这些数据吗？', '提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                        userApi.userDeleteData(this, {
                            url: "userManager/" + this.multipleSelection[0].userId,
                            back: resp=> {
                                if(resp.code == 0) {
                                    this.getTableData();
                                    this.$message({
                                        message: '删除成功！',
                                        type: 'success'
                                    });
                                }
                                else {
                                    this.$message.error(resp.msg);
                                }
                            }
                        })
                    }
                });
            }
        },

        // 添加
        addBtnClick () {
            this.$store.state.dialogTitle = "新建";
            this.accountForm.userEmail = '';
            this.accountForm.username = '';
            this.accountForm.password = '';
            this.dialogFormVisible  = true;
        },
        
        // table 刷新 重新获取接口
        refreshTable () {
            this.isRefreshTable = true;
            this.getTableData();
        },

        // 弹框确认按钮
        dialogConfirmBtn (formName) {
            var en = new JSEncrypt();
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    loginApi.getPublicKey(this,{
                        back: (resp) => {
                            if(resp.code === 0){
                                en.setPublicKey(resp.data.modulus);
                                let password = en.encrypt(this.accountForm.password);
                                this.accountForm.password = password;
                                if (this.$store.state.dialogTitle === "新建") {
                                    userApi.userAddData(this, {
                                        data: this.accountForm,
                                        back: resp=> {
                                            if (resp.code == 0) {
                                                this.getTableData();
                                                this.closeDialog();
                                            }
                                            else {
                                                this.$message.error(resp.msg);
                                            }
                                        }
                                    })
                                }
                                else {
                                    if (this.localData.id === '1') { // 管理员
                                        this.accountForm.id = this.accountForm.userId;
                                    }
                                    else { // 普通用户
                                        this.accountForm.id = this.localData.id;
                                        this.accountForm
                                    }
                                    if (this.oldEmail !== this.accountForm.userEmail) {
                                        this.accountForm.newEmail = this.accountForm.userEmail;
                                        if(this.oldEmail) {
                                            this.accountForm.userEmail = this.oldEmail;
                                        }
                                        else {
                                            this.accountForm.userEmail = this.accountForm.newEmail;
                                            console.log(this.accountForm.userEmail);
                                            console.log(this.accountForm.newEmail)
                                        }
                                    }
                                    else {
                                        this.accountForm.newEmail = this.accountForm.userEmail;
                                    }
                                    userApi.userEditData(this, {
                                        data: this.accountForm,
                                        back: resp=> {
                                            if (resp.code == 0) {
                                                // 超级管理员 编辑
                                                if (this.localData.id === '1') {
                                                    this.getTableData();
                                                    this.closeDialog();
                                                }
                                                else { // 普通用户 修改
                                                    this.$message({
                                                        type: "success",
                                                        message: "账户信息修改成功！"
                                                    });
                                                    localStorage.setItem("data", JSON.stringify(this.accountForm));
                                                }
                                            }
                                            else {
                                                this.$message.error(resp.msg);
                                            }
                                        }
                                    })
                                }
                            }
                        }
                    })
                } else {
                    return false;
                }
            })
        },

        // 翻页
        handleCurrentChange (val) {
            const data = {
                "pageIndex": val,
                "pageSize": 10
            }
            this.getTableData(data); 
        },

        // 关闭dialog重置输入框
        closeDialog () {
            this.$refs['form'].resetFields();
            this.dialogFormVisible = false;
        },

        // 普通用户修改个人信息，确认按钮
        changeUserInfo (formName) {
            this.$store.state.dialogTitle = '编辑';
            this.dialogConfirmBtn(formName);
        }
    }
}
</script>
<style>
@import "../../assets/css/common-table.css";
.user-info {
    padding-top: 10px;
}

.user-info .el-form {
    width: 60%;
    margin: 0 auto;
}

.table-page {
    margin-bottom: 10px;
}
</style>
