<template>
  <div class='home'>
    <div class='area'>
      <div class='title'>旭影后台管理系统</div>
      <el-input class='input' placeholder="请输入账号" v-model="params.user"></el-input>
      <el-input class='input' placeholder="请输入密码" v-model="params.password" show-password></el-input>
      <el-button type="primary" @click='getLogin'>登入</el-button>
    </div>
  </div>

</template>

<script>
import crypto from 'crypto'

export default {
  data() {
    return {
      params: {
        user: '',
        password: '', //fc184b504c69e3b2de621ec6f8807524
      },
    }
  },
  mounted() {
    window.addEventListener('keydown', this.keyDown)
  },
  methods: {
    keyDown(e) {
      //如果是回车则执行登录方法
      // console.log(this.$route.name)
      if (this.$route.name=='home'&&e.keyCode == 13) {
        this.getLogin()
      }
    },
    async getLogin() {
      var md5 = crypto.createHash('md5')
      md5.update(this.params.password) //需要加密的密码
      let req = {
        user: this.params.user,
        password: md5.digest('hex'),
      }
      let res = await this.api.getLogin(req)
      if (res.state == 1) {
        localStorage.setItem('token', res.msg)
        this.$router.push('/fzSetUp')
      } else {
        this.$message.error(res.msg)
      }
    },
  },
}
</script>
<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;
  position: relative;

  .area {
    position: absolute;
    top: 200px;
    left: 50%;
    display: inline-block;
    width: 300px;
    height: 500px;
    transform: translate(-50%, 0);
    .title {
      margin: 20px 0;
      font-size: 18px;
      font-weight: bold;
    }
    .input {
      margin-bottom: 20px;
    }
  }
}
</style>