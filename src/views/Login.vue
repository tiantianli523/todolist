<template>
  <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px"
           class="demo-ruleForm login-container">
    <h3 class="title">用户登录</h3>
    <el-form-item prop="account">
      <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <!--<el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>-->
    <span class="toregister" @click='toRegister'>去注册</span>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="toLogin" >登录
      </el-button>
      <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
    </el-form-item>
  </el-form>

</template>

<script>
  //  import { requestLogin } from '../api/api';
  //  import NProgress from 'nprogress'
  export default {
    data () {
      return {
//        logining: false,
        ruleForm2: {
          account: '',
          checkPass: ''
        },
        rules2: {
          account: [
            {required: true, message: '请输入账号', trigger: 'blur'}
          ],
          checkPass: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ]
        },
        checked: true
      }
    },
    methods: {
      toLogin () {
        let username = this.ruleForm2.account
        this.axios.get('/api/user/find/' + username)
          .then(res => {
            console.log(res)
            if (res.data.data.password === this.ruleForm2.checkPass) {
//              this.logining = true
              sessionStorage.setItem('userName', JSON.stringify(username))
              sessionStorage.setItem('userId', res.data.data.userId)
              sessionStorage.setItem('headpic', res.data.data.userHead)
              this.$router.push({ path: '/task' })
            } else if (res.data.code === 1) {
              this.open3()
            } else {
              this.open4()
            }
          })
          .catch(res => {
            console.log(res)
          })
      },
      open3 () {
        this.$message({
          message: '用户名不存在',
          type: 'warning'
        })
      },
      open4 () {
        this.$message.error('密码错误')
      },
      toRegister () {
        this.$router.push('/SignIn')
      }
//      handleReset2 () {
//        this.$refs.ruleForm2.resetFields();
//      }
//      handleSubmit2(ev) {
//        var _this = this;
//        this.$refs.ruleForm2.validate((valid) => {
//          if (valid) {
//            //_this.$router.replace('/table');
//            this.logining = true;
//            //NProgress.start();
//            var loginParams = { username: this.ruleForm2.account, password: this.ruleForm2.checkPass };
//            requestLogin(loginParams).then(data => {
//              this.logining = false;
//              //NProgress.done();
//              let { msg, code, user } = data;
//              if (code !== 200) {
//                this.$message({
//                  message: msg,
//                  type: 'error'
//                });
//              } else {
//                sessionStorage.setItem('user', JSON.stringify(user));
//                this.$router.push({ path: '/table' });
//              }
//            });
//          } else {
//            console.log('error submit!!');
//            return false
//          }
//        })
    }
  }
</script>

<style lang="scss" scoped>
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .toregister{
      margin-left: 300px;
      color: #66B1FF;
      font-size: 15px;
      cursor: pointer;
      line-height: 40px;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
</style>
