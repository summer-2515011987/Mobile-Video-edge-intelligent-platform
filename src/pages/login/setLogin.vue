<template xmlns="">
  <div class="login-wrap">
    <el-form
        label-position="left"
        :model="loginData"
        :rules="loginRules"
        ref="loginForm"
        label-width="0px"
        class="demo-ruleForm login-container" 
        style="width: 30%;margin-top: 45vh;">
      <el-form-item prop="username">
        <el-input type="text" v-model.trim="loginData.username" auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <hr class="hr15"/>
      <el-form-item prop="password">
        <el-input
            type="password"
            v-model.trim="loginData.password"
            auto-complete="off"
            placeholder="密码"
            v-on:keyup.13.native="submitForm('loginForm')"
        ></el-input>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button
            type="primary"
            class="button"
            style="width:100%;"
            @click="submitForm('loginForm')"
            :loading="loading"
        >登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {validUsername} from "@/utils/validate";
import service from '@/api/mobileApi';
export default {
  name: "Login",

  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.length === 0) {
        callback(new Error("用户名不能为空"));
      } else if (!validUsername(value)) {
        callback(new Error("请输入正确的用户名"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length === 0) {
        callback(new Error("密码不能为空"));
      } else if (value.length < 6) {
        callback(new Error("密码不能少于6位数字"));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      // 记住密码
      loginData: {
        username: "",
        password: "",
        rememberpwd: false
      },
      loginRules: {
        username: [
          {required: true, trigger: "blur", validator: validateUsername},
        ],
        password: [
          {required: true, trigger: "blur", validator: validatePassword},
        ],
        cookieName: ""
        // ,code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      },
    };
  },
  mounted() {
    sessionStorage.clear();
    localStorage.clear();
  },
  methods: {
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var data = {
              loginName: this.loginData.username,
              password: this.loginData.password
            };
            service.login( data ).then(response => {
              if(response.code==0){
                sessionStorage.setItem('loginName', 'admin');
                this.$router.push({path: '/sysadmin'})
              }
            });
          }
        });
    }
  }
};
</script>

<style scoped>
@import "./../../assets/css/logins.css";
</style>
