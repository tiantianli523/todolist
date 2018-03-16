<template>
  <div class="home">
    <div class="leftBox">
      <img class="headpic" :src="head" alt="">
      <ul class="liBox">
        <li class="task" @click="totask"><i class="el-icon-circle-check"></i> &nbsp;任务</li>
        <li class="search" @click="tosearch"><i class="el-icon-search"></i> &nbsp;搜索</li>
        <li class="account" @click="toaccount"><i class="el-icon-setting"></i> &nbsp;账号</li>
        <li class="exit" @click="exitWarn"><i class="el-icon-error"></i> &nbsp;退出</li>
      </ul>
    </div>
    <router-view class="mainBox"></router-view>
  </div>
</template>
<style lang="scss" scoped>
  .home {
    display: flex;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border: solid 7px #353D40;
    box-sizing: border-box;
    .leftBox {
      height: 100%;
      /*flex: 1;*/
      width: 80px;
      flex: 1;
      background: #353D40;
      color: #A0AAAD;
      text-align: center;
      .headpic {
        width: 50%;
        border-radius: 50%;
        margin-top: 15px;
      }
      .liBox {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        padding: 0;
        cursor: pointer;
        li {
          width: 100%;
          height: 60px;
          line-height: 60px;
          font-size: 25px;
          i {
            font-size: 30px;
          }
        }
      }
      .liBox li:hover {
        background: #475054;
      }
      .selected {
        background: #2C3032;
        color: #00BFF3;
      }
    }
    .mainBox {
      /*background: #d5ffd2;*/
      flex: 9;
      width: 100%;
      height: 100%;
    }
  }
</style>

<script>
  import $ from 'jquery'
  import bus from '../assets/js/bus.js'
  export default{
    data () {
      return {
//        head: sessionStorage.getItem('headpic')
      }
    },
    computed: {
      head () {
        return this.$store.state.head
      }
    },
    methods: {
//      update (head) {
//        this.head = head
//        console.log(this.head)
//      },
      totask () {
        this.$router.push('/task')
        $('.task').siblings('li').removeClass('selected')
        $('.task').addClass('selected')
      },
      tosearch () {
        this.$router.push('/search')
        $('.search').siblings('li').removeClass('selected')
        $('.search').addClass('selected')
      },
      toaccount () {
        this.$router.push('/accountsetting')
        $('.account').siblings('li').removeClass('selected')
        $('.account').addClass('selected')
      },
      toexit () {
        this.$router.push('/Login')
      },
      exitWarn () {
        this.$confirm('你确定要退出当前账号吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.toexit()
          this.$message({
            type: 'success',
            message: '退出成功!'
          })
        }).catch(() => {
//          this.$message({
//            type: 'info'
//          })
        })
      }
    },
    mounted () {
      bus.$on('update', function (head) {
        this.head = head
      })
//      if (!localStorage.getItem('userId')) {
//        this.$router.push('/Login')
//      }
    },
    watch: {
      head () {
        console.log(this.head)
      }
    }
  }
</script>
