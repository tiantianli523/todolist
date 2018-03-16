<template>
  <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px"
           class="demo-ruleForm login-container">
    <h3 class="title">注册</h3>
    <el-form-item prop="account">
      <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <!--<el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>-->
    <span class="tologin" @click='toLogin'>有账号，去登陆</span>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="toRegister" :loading="logining">注册
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    data () {
      return {
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
      toRegister () {
        let username = this.ruleForm2.account
        let password = this.ruleForm2.checkPass
        let userHead = '../../assets/img/pic.png'
        let that = this
        this.axios.get('/api/user/find/' + username)
          .then(res => {
//            console.log(res.data.code)
            if (res.data.code === 1) { // 该用户名不存在，可以注册
              that.axios.post('/api/user/add', {password: password, userHead: userHead, userName: username})
                .then(res => {
                  console.log(res)
                  if (res.data.code === 0) {
                    this.$router.push({path: '/Login'})
                  }
                })
                .catch(res => {
                  console.log(res)
                })
            } else if (res.data.code === 0) {
              that.open3()
            }
          })
      },
      open3 () {
        this.$message({
          message: '该用户名已存在',
          type: 'warning'
        })
      },
      open4 () {
        this.$message.error('未知错误')
      },
      toLogin () {
        this.$router.push('/Login')
      }
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
    .tologin {
      margin-left: 240px;
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
