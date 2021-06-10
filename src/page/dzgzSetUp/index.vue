<template>
  <div class='dzgzSetUp'>
    <TopBar />
    <SidBar />
    <div class='area'>
      <div class='title'>视频点赞关注</div>
      <div class='row'>
        分组名称:
        <el-select clearable style="width:200px;margin-right:30px" v-model="grouping" placeholder="请选择分组名称" @change="selectChanged">
          <el-option v-for="item in fZList" :key="item.name" :label="item.name" :value="item.name">
          </el-option>
        </el-select>
      </div>
      <div class='row_item' style="margin-top:20px;margin-left:10px">
        视频连接：<el-input class="input520" v-model="link"></el-input>
        <span> 点赞次数</span>
        <el-input class="input82" v-model="dzcs"></el-input>
        <span> 评论次数</span>
        <el-input class="input82" v-model="plcs"></el-input>
        <span> 关注次数</span>
        <el-input class="input82" v-model="gzcs"></el-input>
      </div>
      <div class='row_item1' style="margin-left:10px">
        <div style="margin-bottom:10px"> 评论话术：</div>
        <el-input rows="8" type="textarea" style="width:66%" v-model="plhs"></el-input>
        <el-button type="primary" @click='setspgz'>设置</el-button>
      </div>
      <div class='set_btn'>

      </div>
    </div>
  </div>

</template>

<script>
import SidBar from '../../components/SidBar'
import TopBar from '../../components/TopBar'
export default {
  components: {
    SidBar,
    TopBar,
  },
  data() {
    return {
      fZList: [], //分组列表
      grouping: '',
      link: '',
      dzcs: '',
      plcs: '',
      gzcs: '',
      plhs: '',
    }
  },
  mounted() {
    ////接口名:获取分组下拉列表
    this.getlist()
  },
  methods: {
    //设置视频功能
    async setspgz() {
      if (!this.grouping) {
        this.$message({
          message: '请选择分组信息',
          type: 'error',
        })
        return
      }
       let a = this.plhs.split('\n')
      let arr = []
      for (let i of a) {
        let b = i + 'BATTAB'
        arr.push(b)
      }
      let q = String(arr).replace(/,/g, '')
      let param = {
        token: localStorage.getItem('token'),
        grouping: this.grouping,
        link: this.link,
        dzcs: this.dzcs,
        plcs: this.plcs,
        gzcs: this.gzcs,
        plhs: q
      }
      let res = await this.api.setspgz(param)
      if (res.sdata == 1) {
        this.$message({
          message: '设置成功！',
          type: 'success',
        })
      } else if (res.sdata == 0) {
        this.$message({
          message: res.msg,
          type: 'error',
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

    //下拉选择事件
    async selectChanged(value){
      if(value){
        let param = {
          token: localStorage.getItem('token'),
          grouping: this.grouping
        }
        let res = await this.api.getgrouping(param);
        this.link = res.splink;
        this.dzcs=res.splike;
        this.plcs=res.spcom;
        this.gzcs=res.spgz;
        this.plhs=res.spplhs;
      }
    },

  },
}
</script>
<style lang="less" scoped src='./index.less'>
</style>