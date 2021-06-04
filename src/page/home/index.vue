<template>
  <div class='home'>
    <div class='area'>
      <el-input class='input' placeholder="请输入账号" v-model="params.user"></el-input>
      <el-input class='input' placeholder="请输入密码" v-model="params.password" show-password></el-input>
      <el-button type="primary" @click='getLogin'>登陆</el-button>
    </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      params: {
        user: 'xm123',
        password: 'fc184b504c69e3b2de621ec6f8807524',
      },
    }
  },
  mounted() {},
  methods: {
    async getLogin() {
      let res = await this.api.getLogin(this.params)
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

    .input {
      margin-bottom: 20px;
    }
  }
}
</style>