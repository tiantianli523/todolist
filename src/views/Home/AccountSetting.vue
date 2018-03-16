<template>
  <div class="mycontainer">
    <div class="head">
      <span>头像</span>
      <div class="now_head" v-if="flag01" @click="flag01 = !flag01">
        <img class="headimg" :src="head" alt="">
        <div class="changehead">修改头像</div>
      </div>
      <div v-if="!flag01" class="collect">
        <img src="src/assets/img/01.jpg" @click="toChangeHead('src/assets/img/01.jpg')" alt="">
        <img src="src/assets/img/02.jpg" @click="toChangeHead('src/assets/img/02.jpg')" alt="">
        <img src="src/assets/img/03.jpg" @click="toChangeHead('src/assets/img/03.jpg')" alt="">
        <img src="src/assets/img/04.jpg" @click="toChangeHead('src/assets/img/04.jpg')" alt="">
        <img src="src/assets/img/05.jpg" @click="toChangeHead('src/assets/img/05.jpg')" alt="">
        <img src="src/assets/img/06.jpg" @click="toChangeHead('src/assets/img/06.jpg')" alt="">
      </div>
    </div>
    <div class="name">
      <span>用户名</span>
      <div>
        <p class="nickname" @click="flag = !flag" v-if="flag">{{username}}</p>
        <el-form v-if="!flag">
          <el-input
            class="nickname2"
            v-model="username"
            :minlength=3
            @keyup.enter.native=" toModify(username)">
          </el-input>
          <span class="hint">*{{msg}}</span>
        </el-form>
      </div>
    </div>
    <div class="head2">
        <form id="addTextForm"
              :action="submitUrl"
              method="post"
              enctype="multipart/form-data">
          <div class="now_head2" >
            <img class="headimg2" id="headimg2" :src="head" alt="">
            <button type="button" @click="choose_img()" class="changehead2">修改头像
              <input type="file" name="file" id="choose_img" @change="setImg($event)" style="display: none">
            </button>
          </div>
          <!--<button type="submit" class="head-submit" @click="submit2()">保存</button>-->
          <input class="submit" type="submit" value="提交">
        </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  * {
    padding: 0;
    margin: 0;
  }

  .mycontainer {
    width: 100%;
    height: 100%;
    .head {
      width: 100%;
      height: 15%;
      margin-left: 20px;
      span {
        font-size: 18px;
        font-weight: 700;
        float: left;
        line-height: 100px;
      }
      .now_head {
        position: relative;
        margin-top: 50px;
        .headimg {
          width: 80px;
          height: 80px;
          border-radius: 40px;
          margin-left: 20px;
        }

        .changehead {
          position: absolute;
          top: 0px;
          left: 35px;
          width: 80px;
          height: 80px;
          margin-left: 20px;
          color: #a9a9a9;
          line-height: 80px;
          text-align: center;
          border-radius: 40px;
          background: rgba(0, 0, 0, 0.38);
          cursor: pointer;
        }
      }
    }
    .name {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
      height: 15%;
      margin-left: 20px;
      span{
        font-size: 18px;
        font-weight: 700;
      }
    }
  }









  .now_head2 {
    position: relative;
  }

  .headimg2 {
    width: 80px;
    height: 80px;
    border-radius: 40px;
    margin-left: 20px;
  }

  .changehead2 {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 80px;
    height: 80px;
    margin-left: 20px;
    color: #a9a9a9;
    line-height: 80px;
    text-align: center;
    border-radius: 40px;
    background: rgba(0, 0, 0, 0.38);
    cursor: pointer;
  }

  .nickname {
    /*display: inline-block;*/
    width: 200px;
    /*height: 40px;*/
    line-height: 100px;
    margin-left: 70px;
    cursor: pointer;
  }

  .nickname2 {
    width: 200px;
    line-height: 100px;
    margin-left: 10px;
    float: left;
    /*margin-top: 15px;*/
  }

  .collect {
    margin-top: 50px;
  }

  .collect img {
    width: 80px;
    height: 80px;
    margin-left: 20px;
    border-radius: 40px;
    cursor: pointer;
  }

  .hint {
    color: #ff5c0f;
    font-size: 15px;
    margin-left: 30px;
  }

  .head-submit{

  }
  #addTextForm{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .now_head{

    }
    .submit{
      width: 50px;
      height: 30px;
      background-color: #00BFF3;
      border: none;
      margin-left: 20px;
    }
  }

</style>

<script>
  //  import bus from '../../assets/js/bus.js'
  import $ from 'jquery'
  export default{
    data () {
      return {
        flag: true,
        flag01: true,
        head: sessionStorage.getItem('headpic'),
        username: JSON.parse(sessionStorage.getItem('userName')),
        userId: sessionStorage.getItem('userId'),
        msg: '确定请按enter键',
        imgNum: 4,
        submitUrl: 'http://127.0.0.1:8082/api/user/update/userHead',
        userHead: '',
        token: '',
        url: ''  // 填写ajax请求获取七牛云上传凭证token的地址
      }
    },
    computed: {
      headData () {
        return {
          userHead: this.userHead,
          userId: this.userId
        }
      }
    },
    methods: {
      toModify (username) {
        let that = this
        if (username) {
          if (username === JSON.parse(sessionStorage.getItem('userName'))) { // 没有真的修改
            that.flag = true
          } else {
            that.axios.get('/api/user/find/' + username)
              .then(res => {
                if (res.data.code === 1) { // 该用户名不存在，可以更改
                  that.axios.post('/api/user/update/userName', {userId: this.userId, userName: this.username})
                    .then(res => {
                      console.log(res)
                      if (res.data.code === 0) {
                        that.open2()
                        sessionStorage.setItem('userName', JSON.stringify(this.username))
                        that.flag = true
                        that.msg = '确定请按enter键'
                      }
                    })
                } else if (res.data.code === 0) {
                  that.open3()
                }
              })
          }
        } else {
          this.msg = '用户名不能为空'
        }
      },
      getToken () {
        $.ajax({
          type: 'GET',
          url: this.url,
          async: false,
          success: function (data) {
            this.token = data
          },
          error: function () {},
          beforeSend: function () {}
        })
        return this.token
      },
      initQiniu () {
        /* eslint-disable */
        Qiniu.uploader({
          runtimes: 'html5,flash,html4',
          browse_button: 'choose_img',
          flash_swf_url: 'https://cdn.bootcss.com/plupload/2.1.1/Moxie.swf',
          chunk_size: '4mb',
//          AccessKey: 'bX62Ho4-c07Lu_a1OCYZhknzFA9Z-fNVNSQsGT1E',
//          SecretKey: 'QS3vxdDVu8tG3eU-ptBaTR553ps7ZKJvqiu7H760',
          uptoken: this.token,
//           uptoken_url: 'http://jssdk.demo.qiniu.io/uptoken',
//           uptoken_url: 'http://pchou.qiniudn.com/qiniutool/uptoken.html',
          domain: 'http://owigmgx25.bkt.clouddn.com/',
          get_new_uptoken: false,
          auto_start: true,
          max_retries: 3,
          filters: {
            max_file_size: '10000mb',
            prevent_duplicates: false
            // Specify what files to browse for
            // mime_types: [
            //     {title : 'apk files', extensions : 'apk'} // 限定apk后缀上传格式上传
            // ]
          },
          init: {
            'FilesAdded': (up, files) => {
              console.log('文件就绪', files);
            },
            BeforeUpload: (up, file) => {
              console.log('上传之前', file);
            },
            UploadProgress: (up, file) => {
              console.log('上传中 file', file);
//              this.progress = file.percent + '%';
            },
            FileUploaded: (up, file, info) => {
              //每个文件上传成功后，处理相关的事情

              var domain = up.getOption('domain')
              var res = $.parseJSON(info)
              console.log(file)
              console.log(domain)
              var sourceLink = domain  + file.name
//              var sourceLink = Qiniu.imageMogr2({
//                "auto-orient": true,      // 布尔值，是否根据原图EXIF信息自动旋正，便于后续处理，建议放在首位。
//                strip: true,              // 布尔值，是否去除图片中的元信息
//                thumbnail: '1000x1000',    // 缩放操作参数
//                crop: '!300x400a10a10',   // 裁剪操作参数
//                gravity: 'NorthWest',     // 裁剪锚点参数
////                quality: 40,              // 图片质量，取值范围1-100
////                rotate: 20,               // 旋转角度，取值范围1-360，缺省为不旋转。
//                format: 'png',            // 新图的输出格式，取值范围：jpg，gif，png，webp等
////                blur: '3x5'               // 高斯模糊参数
//              }, res.key, domain)
              console.log('文件上传完毕')
              console.log(sourceLink)
            },
            Error: (up, err, errTip) => {
              console.log('上传失败', err);
            },
            Key: (up, file) => {
//              var key = ''
//              return key
            }
          }
        });
      },
      toChangeHead (pic) {
        let that = this
        let H = {userHead: pic, userId: this.userId}
        console.log(H)
        that.axios.post('/api/user/update/userHead', {userHead: pic, userId: this.userId})
          .then(res => {
            console.log(res)
            if (res.data.code === 0) {
              sessionStorage.setItem('headpic', pic)
              this.$store.commit('newHead', pic)
              that.head = sessionStorage.getItem('headpic')
//              console.log(that.head)
//              bus.$emit('headpic', that.head)
            }
          })
        that.flag01 = true
      },

      // 从 file 域获取 本地图片 url
      getFileUrl (obj) {
        let url
        url = window.URL.createObjectURL(obj.files.item(0))
        return url
      },

      choose_img () {
        $('#choose_img').click()
      },
      //  根据点击上传按钮触发input
//      change_input () {
//        let inputArr = $('#addTextForm input')
//        let add_inputId = ''     //  需要被触发的input
//        for (let i = 0; i < inputArr.length; i++) {
//          // 根据input的value值判断是否已经选择文件
//          if (!inputArr[i].value) {          // 如果没有选择,获得这个input的ID
//            add_inputId = inputArr[i].id
//            break
//          }
//        }
//        if (add_inputId) {                   // 如果需要被触发的input ID存在,将对应的input触发
//          return $('#' + add_inputId).click()
//        } else {
//          alert('最多选择' + this.imgNum + '张图片')
//        }
//      },
      // 当input选择了图片的时候触发,将获得的src赋值到相对应的img
      setImg (e) {
//        let target = e.target
        console.log(this.getFileUrl(e.srcElement))
        this.userHead = this.getFileUrl(e.srcElement)
        $('#headimg2').attr('src', this.getFileUrl(e.srcElement))
      },
//      // 点击图片删除该图片并清除相对的input
//      deleteImg (e) {
//        let target = e.target
//        let inputID = ''       // 需要清除value的input
//        if (target.nodeName === 'IMG') {
//          target.src = ''
//          inputID = target.id.replace('img_', '')    // 获得需要清除value的input
//          $('input#' + inputID).val('')
//        }
//      },
      submit2 () {
        this.$refs.head.submit()
        console.log(this.headData)
      },
//      // 提交信息到后台
//      submit () {
//        $('#addTextForm').ajaxSubmit({
//          url: this.$root.api + '/Index/staff_accident/add',
//          type: 'post',
//          data: {
//            'total_price': this.price,
//            'descript': this.descript
//          },
//          success: (data) => {
//            if (data.code === 0) {
//              console.log('提交成功')
//              $('#addTextForm input').val('')
//              $('div#img-wrapper img').attr('src', '')
//            } else {
//              alert('提交失败')
//            }
//          }
//        })
//      },

      open2 () {
        this.$message({
          message: '修改成功！',
          type: 'success'
        })
      },
      open3 () {
        this.$message({
          message: '该用户名已存在',
          type: 'warning'
        })
      }
    },
    mounted () {
      this.getToken()
      this.initQiniu()
      this.flag01 = true
//      console.log(this.head)

      for (let i = 0; i < this.imgNum; i++) {
        //  生成input框，默认为1
//        let my_input = $('<input style="display: none" class="hide-input" type="file" name="image" />')   // 创建一个input
//        my_input.attr('id', i)                           // 为创建的input添加id
//        $('#addTextForm').append(my_input)                    // 将生成的input追加到指定的form
//        // 生成img，默认为1
//        let my_img = $('<img src="../../assets/img/pic.png">')
//        my_img.attr('id', 'img_' + i)
//        my_img.css({'width': '80px', 'height': '80px'})   // 添加样式，由于vue的执行机制，页面加载的时候img标签还没有生成，直接写在style样式会不生效
//        $('#img-wrapper').append(my_img)
      }
    }
  }
</script>
