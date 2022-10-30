<template>
  <div class="login-container">
    <el-button type="danger" style="height: 80vh">asd</el-button>
<!--    <el-card class="card">-->
<!--&lt;!&ndash;      <div class="logo"> &lt;!&ndash;图标&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;        <img src="../../assets/firstRecordList.png" alt="logo" width="25px">&ndash;&gt;-->
<!--&lt;!&ndash;      </div>&ndash;&gt;-->
<!--      <h3 class="title">Login</h3>-->

<!--      <el-card class="input-card">-->
<!--        <el-form :model="loginForm" label-width="12vw">-->
<!--          <el-form-item label="账号">-->
<!--            <el-input v-model="loginForm.name" />-->
<!--          </el-form-item>-->
<!--          <el-form-item label="密码">-->
<!--            <el-input v-model="loginForm.password" type="password" />-->
<!--          </el-form-item>-->
<!--        </el-form>-->
<!--      </el-card>-->
<!--    </el-card>-->
  </div>
</template>

<script>

import {isvalidUsername} from "@/utils/validate";

export default {
  name: "LoginPage",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('密码不能小于5位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      loading: false,
      pwdType: 'password',
      redirect: undefined,
      errorMsg: false
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true // 正在等待服务器反馈
          this.$store.dispatch('Login', this.loginForm).then(() => { // 调用store里面的登录方法
            this.errorMsg = false
            this.loading = false
            this.$router.push({ path: this.redirect || '/' })
          }).catch(() => {
            // 账号或密码错误
            this.loading = false
            this.errorMsg = true
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  padding-top: 5vh;
}

.title {
  font-size: 16px;
  color: black;
  margin: 0px auto 40px auto;
  text-align: center;
  font-weight: bold;
}

.card {
  height: 70vh;
  width: 80vw;
  margin: auto;
  background: white;
  border-radius: 4%;
  border: 10px black solid;
  border-inline-width: 4px;
  border-top-width: 4px;
  border-bottom-width: 4px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 10);
  transition: all .3s ease-in;
}


.input-card {
  background: #a0e6e3;
  border-radius: 5px;    /*输入框圆角值*/
  border: black 5px;
  width: 80vw;
  height: 40vh;
}
//
//.input-box {
//  width: 60vw;
//  height: 5vh;
//  margin: auto;
//  margin-top: 3vh;
//  border-radius: 5px;    /*输入框圆角值*/
//  border: black 5px;
//  background: black;
//}

.el-input {
  //background: #42b983;
  width: 90%;
  margin: auto;
  border: black 10px;
}

::v-deep .el-input__inner{   /*或者 .s2>>>.el-input__inner  */
  //background:rgba(0,0,0,0.2);    /*调整inner的背景色，透明*/
  height: 5vh;
  width: 60vw;/*调整inner的高度*/
  font-size: 20px;
  border-radius: 10px;    /*输入框圆角值*/
  border: black 10px;
}


.logo {
  margin: 30px auto;
  width: 250px;
}
</style>
