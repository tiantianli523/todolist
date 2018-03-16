<template>
  <div class="container">
    <el-input
      placeholder="请输入任务关键字,按enter键进行搜索"
      prefix-icon="el-icon-search"
      v-model="searchKey"
      @keyup.enter.native="toSearch(searchKey)">
    </el-input>
    <div class="searchResult">
      <p class="hint" v-if="flag">你还没有添加相关的任务哦~</p>
      <ul>
        <li class="single" v-for="(item,index) in searchResult">
          <div id="circle" class="circle" @click="toFinish(item.taskId, index)">
            <div class="circle_2">
              <div v-if="searchResult[index].taskStatus" class="finish"><i class="el-icon-check"></i></div>
            </div>
          </div>
          <span class="single_content">{{item.taskContent}}</span>
          <span class="creat_time">{{item.createTime}}</span>
          <span class="remove" @click="toRemove(item.taskId, index)">删除</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
  .container {
    /*margin-left: 50px;*/
    /*margin-top: 20px;*/
    width: 800px;
    .el-input{
      margin-top: 30px;
      margin-left: 75px;
      width: 85%;
    }
    .searchResult {
      width: 95%;
      min-height: 200px;
      margin-left: 70px;
      /*background: #ccf9f1;*/
      .hint{
        color: #0095be;
      }
      .single {
        list-style: none;
        width: 90%;
        height: 40px;
        margin-left: -20px;
        border-bottom: dashed 1px #cdcdcd;
        .circle {
          width: 28px;
          height: 28px;
          border-radius: 14px;
          float: left;
          position: relative;
          margin-top: 5px;
          .circle_2 {
            width: 24px;
            height: 24px;
            border-radius: 12px;
            background: #ffff;
            margin: auto;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            .finish {
              font-size: 20px;
              margin-left: 2px;
              margin-top: -1px;
            }
          }
        }
        .single_content {
          width: 60%;
          margin-left: 5px;
          line-height: 40px;
          float: left;
          color: #4b4b4b;
        }
        .creat_time {
          width: 22%;
          /*margin-right: 50px;*/
          line-height: 40px;
          color: #a9a9a9;
          float: left;
        }
        .remove {
          line-height: 40px;
          /*color: #bf2300;*/
        }
      }
    }
  }
  .circle01 {
    background: #f76333;
    .finish {
      color: #f76333;
    }
  }
  .circle02 {
    background: #F6B55A;
    .finish {
      color: #F6B55A;
    }
  }.circle03 {
     background: #1DAFED;
     .finish {
       color: #1DAFED;
     }
   }
  .circle04 {
    background: #9FCF5D;
    .finish {
      color: #9FCF5D;
    }
  }
</style>

<script>
  import $ from 'jquery'
  export default{
    data () {
      return {
        searchKey: '',
        searchResult: [],
        flag: false,
        userId: sessionStorage.getItem('userId')
      }
    },
    methods: {
      toSearch (searchKey) {
        this.flag = false
        if (searchKey) {
          this.axios.post('/api/task/selectTask', {taskContent: this.searchKey, userId: this.userId})
            .then(res => {
//            console.log(res)
              if (res.data.data.length) {
                console.log(res.data.data)
                this.searchResult = res.data.data
//              let that = this
                res.data.data.forEach(function (v, i) {
                  res.data.data[i].createTime = new Date(res.data.data[i].createTime).toLocaleString().substr(0, 15)
                  if (res.data.data[i].taskType === 1) {
                    $('.circle').eq(i).addClass('circle01')
                  } else if (res.data.data[i].taskType === 2) {
                    $('.circle').eq(i).addClass('circle02')
                  } else if (res.data.data[i].taskType === 3) {
                    $('.circle').eq(i).addClass('circle03')
                  } else {
                    $('.circle').eq(i).addClass('circle04')
                  }
                })
              } else {
                this.searchResult = []
                console.log('没有相关的任务')
                this.flag = true
              }
            })
        } else {
          this.open5()
        }
      },
      toFinish (taskId, index) {
        if (this.searchResult[index].taskStatus === 1) {
          this.open4()
        } else {
          this.searchResult[index].taskStatus = 1
//          let taskId = this.todoItems_1[index].taskId
          this.axios.post('/api/task/updateTask', {taskId: taskId, taskStatus: 1})
            .then(res => {
//              console.log(res)
              if (res.data.code === 0) {
                this.open3()
              }
            })
            .catch(res => {
            })
        }
      },
      toRemove (taskId, index) {
        this.axios.get('/api/task/delete/' + taskId)
          .then(res => {
            if (res.data.code === 0) {
              this.open2()
            }
          })
        this.searchResult.splice(index, 1)
      },
      open2 () {
        this.$message({
          message: '删除成功！',
          type: 'success'
        })
      },
      open3 () {
        this.$message({
          message: '你太棒了！又完成了一个任务',
          type: 'success'
        })
      },
      open4 () {
        this.$message({
          message: '这是一个你之前就完成的任务',
          type: 'warning'
        })
      },
      open5 () {
        this.$message({
          message: '请输入至少一个关键字',
          type: 'warning'
        })
      }
    },
    mounted () {
      if (!sessionStorage.getItem('userId')) {
        this.$router.push('/Login')
      }
//      console.log(localStorage.getItem('userId'))
    }
  }
</script>
