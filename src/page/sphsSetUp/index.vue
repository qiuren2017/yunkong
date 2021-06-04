<template>
  <div class='index'>
    <TopBar />
    <SidBar />
    <div class='area'>
      <div class='title'>刷屏话术设置</div>
      <div class='row'>
        分组名称:
        <el-select clearable style="width:150px;margin-right:30px" v-model="grouping" placeholder="请选择分组名称" @change="selectChanged">
          <el-option v-for="item in fZList" :key="item.name" :label="item.name" :value="item.name">
          </el-option>
        </el-select>
      </div>
      <div class='row'>
        <el-input class="input320" v-model="lg"></el-input>设置刷屏话术 &nbsp;&nbsp;&nbsp;
        刷屏话术间隔 <el-input class="input130" v-model="time"></el-input>
        <el-button type="primary" @click='setslg'>设置</el-button>
      </div>
    </div>
  </div>

</template>

<script>
import SidBar from '../../components/SidBar'
import TopBar from '../../components/TopBar'
export default {
  data() {
    return {
      fZList: [], //分组列表
      lg: '',
      time: '',
      grouping:''
    }
  },
  components: {
    SidBar,
    TopBar,
  },
  mounted() {
    this.getlist()
  },
  methods: {
    //刷屏话术
    async setslg() {
       if (!this.grouping) {
        this.$message({
          message: '请选择分组信息',
          type: 'error',
        })
        return
      }
      let param = {
        token: localStorage.getItem('token'),
        grouping: this.grouping,
        lg: this.lg,
        time: this.time,
      }
      let res = await this.api.setslg(param)
      if (res.sdata == 1) {
         this.$message({
          message: '设置刷屏话术成功',
          type: 'success',
        })
      }
    },

    //获取分组下拉列表
    async getlist() {
      let res = await this.api.getlist({ token: localStorage.getItem('token') })
      if (res.stada == 1) {
        this.fZList = res.msg
      } else if (res.stada == 0) {
        this.$message({
          message: res.msg,
          type: 'error',
        })
      }
    },
    async selectChanged(value){
      if(value){
        let param = {
          token: localStorage.getItem('token'),
          grouping: this.grouping
        }
        let res = await this.api.getgrouping(param);
        if(res.gogogo==1){
          this.lg=res.sp;
          this.time=res.gotime;
        }
      }
    },
  },
}
</script>
<style lang="less" scoped src='./index.less'></style>