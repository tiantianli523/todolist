<template>
  <div class="Task">
    <!--<p>这是todolist页</p>-->
    <el-container>
      <el-header>
        <div class="block">
          <el-date-picker
            v-model="date"
            type="date">
          </el-date-picker>
        </div>
      </el-header>
      <el-main>
        <!--v-clickoutside="handleClose"-->
        <div id="first" class=" box first">
          <div class="all-header" v-clickoutside="handleClose_1">
            <div class=" header first_header">
              <div class="header_1" @click="showinput_1 = !showinput_1"><span>很重要-很紧急</span><i class="el-icon-plus"></i>
              </div>
            </div>
            <div class="header_2">
              <el-collapse-transition>
                <div v-show="showinput_1">
                  <el-input
                    v-model="todo_1"
                    placeholder="输入任务，按enter键结束"
                    :maxlength="22"
                    @keyup.enter.native="addnewtask_1(todo_1)"
                    suffix-icon="el-icon-check"></el-input>
                </div>
              </el-collapse-transition>
            </div>
          </div>
          <div class="todolist todolist_1">
            <ul class="todoitems">
              <li class="single" v-for="(item,index) in todoItems_1">
                <div class="circle_1" @click="finish_1(index)">
                  <div class="circle_2">
                    <div v-if="todoItems_1[index].taskStatus" class="finish_1"><i class="el-icon-check"></i></div>
                  </div>
                </div>
                <span class="single_content">{{item.taskContent}}</span>
                <span class="creat_time">{{item.createTime}}</span>
                <span class="remove" @click="remove_1(index)">删除</span>
              </li>
            </ul>
          </div>
        </div>
        <div id="second" class="box second">
          <div class="all-header" v-clickoutside="handleClose_2">
            <div class=" header second_header">
              <div class="header_1" @click="showinput_2 = !showinput_2"><span>重要&nbsp;-&nbsp;不紧急</span><i class="el-icon-plus"></i>
              </div>
            </div>
            <div class="header_2">
              <el-collapse-transition>
                <div v-show="showinput_2">
                  <el-input
                    v-model="todo_2"
                    placeholder="输入任务，按enter键结束"
                    :maxlength="22"
                    @keyup.enter.native="addnewtask_2(todo_2)"
                    suffix-icon="el-icon-check"></el-input>
                </div>
              </el-collapse-transition>
            </div>
          </div>
          <div class="todolist todolist_2">
            <ul class="todoitems">
              <li class="single" v-for="(item,index) in todoItems_2">
                <div class="circle_1" @click="finish_2(index)">
                  <div class="circle_2">
                    <div v-if="todoItems_2[index].taskStatus" class="finish_2"><i class="el-icon-check"></i></div>
                  </div>
                </div>
                <span class="single_content">{{item.taskContent}}</span>
                <span class="creat_time">{{item.createTime}}</span>
                <span class="remove" @click="remove_2(index)">删除</span>
              </li>
            </ul>
          </div>
        </div>
        <div id="third" class="box third">
          <div class="all-header" v-clickoutside="handleClose_3">
            <div class=" header third_header">
              <div class="header_1" @click="showinput_3 = !showinput_3"><span>不重要&nbsp;-&nbsp;紧急</span><i class="el-icon-plus"></i>
              </div>
            </div>
            <div class="header_2">
              <el-collapse-transition>
                <div v-show="showinput_3">
                  <el-input
                    v-model="todo_3"
                    placeholder="输入任务，按enter键结束"
                    :maxlength="22"
                    @keyup.enter.native="addnewtask_3(todo_3)"
                    suffix-icon="el-icon-check"></el-input>
                </div>
              </el-collapse-transition>
            </div>
          </div>
          <div class="todolist todolist_3">
            <ul class="todoitems">
              <li class="single" v-for="(item,index) in todoItems_3">
                <div class="circle_1" @click="finish_3(index)">
                  <div class="circle_2">
                    <div v-if="todoItems_3[index].taskStatus" class="finish_3"><i class="el-icon-check"></i></div>
                  </div>
                </div>
                <span class="single_content">{{item.taskContent}}</span>
                <span class="creat_time">{{item.createTime}}</span>
                <span class="remove" @click="remove_3(index)">删除</span>
              </li>
            </ul>
          </div>
        </div>
        <div id="four" class="box four">
          <div class="all-header" v-clickoutside="handleClose_4">
            <div class=" header four_header">
              <div class="header_1" @click="showinput_4 = !showinput_4"><span>不重要-不紧急</span><i class="el-icon-plus"></i>
              </div>
            </div>
            <div class="header_2">
              <el-collapse-transition>
                <div v-show="showinput_4">
                  <el-input
                    v-model="todo_4"
                    placeholder="输入任务，按enter键结束"
                    :maxlength="22"
                    @keyup.enter.native="addnewtask_4(todo_4)"
                    suffix-icon="el-icon-check"></el-input>
                </div>
              </el-collapse-transition>
            </div>
          </div>
          <div class="todolist todolist_4">
            <ul class="todoitems">
              <li class="single" v-for="(item,index) in todoItems_4">
                <div class="circle_1" @click="finish_4(index)">
                  <div class="circle_2">
                    <div v-if="todoItems_4[index].taskStatus" class="finish_4"><i class="el-icon-check"></i></div>
                  </div>
                </div>
                <span class="single_content">{{item.taskContent}}</span>
                <span class="creat_time">{{item.createTime}}</span>
                <span class="remove" @click="remove_4(index)">删除</span>
              </li>
            </ul>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<style lang="scss">
  .Task {
    height: 100%;
    width: 100%;
    .el-container {
      height: 100%;
    .el-header {
      .block {
        margin-top: 10px;
        cursor: pointer;
      }
    }
    .el-main {
      display: flex;
      width: 100%;
      height: 100%;
      justify-content: center;
      flex-wrap: wrap;
      padding: 0;
      margin: 0;
      .box {
        width: 50%;
        height: 50%;
        box-sizing: border-box;
        border: solid 1px #d0d0d0;
        margin-right: -1px;
        margin-bottom: -1px;
        .all-header {
          height: 13%;
          .header {
            cursor: pointer;
            height: 100%;
            width: 100%;
            .header_1 {
              display: flex;
              width: 100%;
              height: 100%;
              /*margin: 0 auto;*/
              justify-content: space-between;
              align-items: center;
              span {
                margin-left: 10px;
              }
              i {
                margin-right: 10px;
              }
            }
          }
          .header_2 {
            position: absolute;
            top: 0;
            width: 100%;
            .el-input {
              display: block;
              box-sizing: border-box;
              margin: 0 auto;
            }
            .el-input__inner {
              border-radius: 0;
              height: 55.58px;
            }
          }
        }
        .todolist {
          height: 80%;
          overflow-y: auto;
          .todoitems {
            .single {
              list-style: none;
              width: 100%;
              height: 40px;
              margin-left: -20px;
              border-bottom: dashed 1px #cdcdcd;
              .circle_1 {
                width: 28px;
                height: 28px;
                border-radius: 14px;
                float: left;
                position: relative;
                margin-top: 5px;
                cursor: pointer;
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
                }
              }
              .single_content {
                width: 70%;
                margin-left: 5px;
                line-height: 40px;
                float: left;
                color: #4b4b4b;
              }
              .creat_time {
                width: 15%;
                line-height: 40px;
                color: #a9a9a9;
                float: left;
              }
              .remove {
                line-height: 40px;
              }
            }
          }
        }
      }
      .first {
        position: relative;
        .first_header {
          .header_1 {
            background: #FFEDE7;
            span {
              color: #f76333;
            }
          }
          .header_2 {
            .el-input {
              background-color: #FFEDE7;
            }
            .el-input__inner {
              border: solid 1px #f76333;
              background: #FFEDE7;
            }
          }
        }
        .todolist_1 {
          .todoitems {
            .single {
              .circle_1 {
                background: #f76333;
                .finish_1 {
                  color: #f76333;
                  font-size: 20px;
                  margin-left: 2px;
                  margin-top: -1px;
                }
              }
              .remove {
                color: #bf2300;
                cursor: pointer;
              }
            }
          }
        }
      }
      .second {
        position: relative;
        .second_header {
          .header_1 {
            background: #FFEFCB;
            span {
              color: #F6B55A;
            }
          }
          .header_2 .el-input {
            background-color: #FFEFCB;
          }
          .header_2 .el-input__inner {
            border: solid 1px #F6B55A;
            background: #FFEFCB;
          }
        }
        .todolist_2 .circle_1 {
          background: #F6B55A;
          .finish_2 {
            color: #F6B55A;
            font-size: 20px;
            margin-left: 2px;
            margin-top: -1px;
          }
        }
        .todolist_2 .remove {
          color: #bf2300;
        }
      }
      .third {
        position: relative;
        .third_header {
          .header_1 {
            background: #D6F4FE;
            span {
              color: #1DAFED;
            }
          }
          .header_2 .el-input {
            background-color: #D6F4FE;
          }
          .header_2 .el-input__inner {
            border: solid 1px #1DAFED;
            background: #D6F4FE;
          }
        }
        .todolist_3 .circle_1 {
          background: #1DAFED;
          .finish_3 {
            color: #1DAFED;
            font-size: 20px;
            margin-left: 2px;
            margin-top: -1px;
          }
        }
        .todolist_3 .remove {
          color: #bf2300;
        }
      }
      .four {
        position: relative;
        .four_header {
          .header_1 {
            background: #defab1;
            span {
              color: #9FCF5D;
            }
          }
          .header_2 .el-input {
            background-color: #EEFFDD;
          }
          .header_2 .el-input__inner {
            border: solid 1px #9FCF5D;
            background: #EEFFDD;
          }
        }
        .todolist_4 .circle_1 {
          background: #9FCF5D;
          .finish_4 {
            color: #9FCF5D;
            font-size: 20px;
            margin-left: 2px;
            margin-top: -1px;
          }
        }
        .todolist_4 .remove {
          color: #bf2300;
        }
      }
    }
  }
  }
</style>

<script>
//  import $ from 'jquery'
  import Vue from 'vue'
  export default{
    data () {
      return {
        todo_1: '',
        todo_2: '',
        todo_3: '',
        todo_4: '',
        finish_flag01: false,
        showinput_1: false,
        showinput_2: false,
        showinput_3: false,
        showinput_4: false,
        userId: sessionStorage.getItem('userId'),
        todoItems_1: [],
        todoItems_2: [],
        todoItems_3: [],
        todoItems_4: [],
        pickerOptions1: {
          disabledDate (time) {
            return time.getTime() > Date.now()
          }
        },
        date: ''
      }
    },
    mounted () {
      if (!sessionStorage.getItem('userId')) {
        this.$router.push('/Login')
      }
      let nowTime = new Date().toLocaleString().substr(0, 9)
      let that = this
      this.axios.post('/api/task/selectByDate', {createTime: nowTime, userId: this.userId})
        .then(res => {
          if (res.data.data.length) {
            res.data.data.forEach(function (v, i) {
              res.data.data[i].createTime = new Date(res.data.data[i].createTime).toLocaleString().substr(9, 7)
              if (res.data.data[i].taskType === 1) {
                that.todoItems_1.push(res.data.data[i])
              } else if (res.data.data[i].taskType === 2) {
                that.todoItems_2.push(res.data.data[i])
              } else if (res.data.data[i].taskType === 3) {
                that.todoItems_3.push(res.data.data[i])
              } else {
                that.todoItems_4.push(res.data.data[i])
              }
            })
          }
        })
    },
    methods: {
      handleClose_1 () {
        this.showinput_1 = false
      },
      handleClose_2 () {
        this.showinput_2 = false
      },
      handleClose_3 () {
        this.showinput_3 = false
      },
      handleClose_4 () {
        this.showinput_4 = false
      },
      addnewtask_1 (content) {
        let that = this
        if (content) {
          var item = {
            taskContent: content,
            createTime: new Date().toLocaleString().substr(9, 6)
          }
          that.todoItems_1.push(item)
          that.axios.post('/api/task/addTask', {taskContent: content, taskType: 1, userId: this.userId})
            .then(res => {
              if (res.data.code === 5) {
                that.open0()
              } else {
                console.log(res.data.code)
              }
            })
            .catch(res => {
              console.log(res)
            })
          that.todo_1 = ''
        } else {
          that.showinput_1 = false
          that.open5()
        }
      },
      addnewtask_2 (content) {
        let that = this
        if (content) {
          var item = {
            taskContent: content,
            createTime: new Date().toLocaleString().substr(9, 6)
          }
          that.todoItems_2.push(item)
          that.axios.post('/api/task/addTask', {taskContent: content, taskType: 2, userId: this.userId})
            .then(res => {
              if (res.data.code === 5) {
                that.open0()
              } else {
                console.log(res.data.code)
              }
            })
            .catch(res => {
              console.log(res)
            })
          that.todo_2 = ''
        } else {
          that.showinput_2 = false
          that.open5()
        }
      },
      addnewtask_3 (content) {
        let that = this
        if (content) {
          var item = {
            taskContent: content,
            createTime: new Date().toLocaleString().substr(9, 6)
          }
          that.todoItems_3.push(item)
          that.axios.post('/api/task/addTask', {taskContent: content, taskType: 3, userId: this.userId})
            .then(res => {
              if (res.data.code === 5) {
                that.open0()
              } else {
                console.log(res.data.code)
              }
            })
            .catch(res => {
              console.log(res)
            })
          that.todo_3 = ''
        } else {
          that.showinput_3 = false
          that.open5()
        }
      },
      addnewtask_4 (content) {
        let that = this
        if (content) {
          var item = {
            taskContent: content,
            createTime: new Date().toLocaleString().substr(9, 6)
          }
          that.todoItems_4.push(item)
          that.axios.post('/api/task/addTask', {taskContent: content, taskType: 4, userId: this.userId})
            .then(res => {
              if (res.data.code === 5) {
                that.open0()
              } else {
                console.log(res.data.code)
              }
            })
            .catch(res => {
              console.log(res)
            })
          that.todo_4 = ''
        } else {
          that.showinput_4 = false
          that.open5()
        }
      },
      remove_1 (index) {
        let taskId = this.todoItems_1[index].taskId
        this.axios.get('/api/task/delete/' + taskId)
          .then(res => {
            if (res.data.code === 0) {
              this.open2()
            }
          })
        this.todoItems_1.splice(index, 1)
      },
      remove_2 (index) {
        let taskId = this.todoItems_2[index].taskId
//        console.log(taskId)
        this.axios.get('/api/task/delete/' + taskId)
          .then(res => {
            if (res.data.code === 0) {
              this.open2()
            }
          })
        this.todoItems_2.splice(index, 1)
      },
      remove_3 (index) {
        let taskId = this.todoItems_3[index].taskId
        this.axios.get('/api/task/delete/' + taskId)
          .then(res => {
            if (res.data.code === 0) {
              this.open2()
            }
          })
        this.todoItems_3.splice(index, 1)
      },
      remove_4 (index) {
        let taskId = this.todoItems_4[index].taskId
        this.axios.get('/api/task/delete/' + taskId)
          .then(res => {
            if (res.data.code === 0) {
              this.open2()
            }
          })
        this.todoItems_4.splice(index, 1)
      },
      finish_1 (index) {
//        $('#first').find('.single_content').eq(index).css('color', '#adadad')
//        $('#first').find('.finish').eq(index).css('color', '#adadad')
//        $('#first').find('.circle_1').eq(index).css('background', '#adadad')
//        $('#first').find('.remove').eq(index).css('color', '#adadad')
        if (this.todoItems_1[index].taskStatus === 1) {
          this.open4()
        } else {
          this.todoItems_1[index].taskStatus = 1
          let taskId = this.todoItems_1[index].taskId
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
      finish_2 (index) {
//        $('#second').find('.single_content').eq(index).css('color', '#adadad')
//        $('#second').find('.finish').eq(index).css('color', '#adadad')
//        $('#second').find('.circle_1').eq(index).css('background', '#adadad')
//        $('#second').find('.remove').eq(index).css('color', '#adadad')
        if (this.todoItems_2[index].taskStatus === 1) {
          this.open4()
        } else {
          this.todoItems_2[index].taskStatus = 1
          let taskId = this.todoItems_2[index].taskId
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
      finish_3 (index) {
//        $('#third').find('.single_content').eq(index).css('color', '#adadad')
//        $('#third').find('.finish').eq(index).css('color', '#adadad')
//        $('#third').find('.circle_1').eq(index).css('background', '#adadad')
//        $('#third').find('.remove').eq(index).css('color', '#adadad')
        if (this.todoItems_3[index].taskStatus === 1) {
          this.open4()
        } else {
          this.todoItems_3[index].taskStatus = 1
          let taskId = this.todoItems_3[index].taskId
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
      finish_4 (index) {
//        $('#four').find('.single_content').eq(index).css('color', '#adadad')
//        $('#four').find('.finish').eq(index).css('color', '#adadad')
//        $('#four').find('.circle_1').eq(index).css('background', '#adadad')
//        $('#four').find('.remove').eq(index).css('color', '#adadad')
        if (this.todoItems_4[index].taskStatus === 1) {
          this.open4()
        } else {
          this.todoItems_4[index].taskStatus = 1
          let taskId = this.todoItems_4[index].taskId
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
      open2 () {
        this.$message({
          message: '删除成功！',
          type: 'success'
        })
      },
      open0 () {
        this.$message({
          message: '添加任务成功！',
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
          message: '任务不能为空',
          type: 'warning'
        })
      }
    },
    watch: {
      date () {
//        console.log(this.date)
        this.date01 = this.date.toLocaleString().substr(0, 9)
        let that = this
        that.todoItems_1 = []
        that.todoItems_2 = []
        that.todoItems_3 = []
        that.todoItems_4 = []
        this.axios.post('/api/task/selectByDate', {createTime: this.date01, userId: this.userId})
          .then(res => {
            if (res.data.data.length) {
              res.data.data.forEach(function (v, i) {
                res.data.data[i].createTime = new Date(res.data.data[i].createTime).toLocaleString().substr(9, 6)
                if (res.data.data[i].taskType === 1) {
                  that.todoItems_1.push(res.data.data[i])
                } else if (res.data.data[i].taskType === 2) {
                  that.todoItems_2.push(res.data.data[i])
                } else if (res.data.data[i].taskType === 3) {
                  that.todoItems_3.push(res.data.data[i])
                } else {
                  that.todoItems_4.push(res.data.data[i])
                }
              })
            }
          })
      }
    }
  }

  //  点击外部隐藏输入框的指令
  Vue.directive('clickoutside', {
    bind: function (el, binding, vode) {
      function documentHandler (e) {
        if (el.contains(e.target)) {
          return false
        }
        if (binding.expression) {
          binding.value(e)
        }
      }

      el.__vueClickOutSide__ = documentHandler
      document.addEventListener('click', documentHandler)
    },
    unbind: function (el, binding) {
      document.removeEventListener('click', el.__vueClickOutSide__)
      delete el.__vueClickOutSide__
    }
  })
</script>
