<template>
  <div class='index'>
    <TopBar />
    <SidBar />
    <div class='area'>
      <div class='title'>话术设置</div>
      <div class='row'>
        分组名称:
        <el-select clearable style="width:150px;margin-right:30px" v-model="grouping" @change='changeGrouping(grouping)' placeholder="请选择分组名称">
          <el-option v-for="item in fZList" :key="item.name" :label="item.name" :value="item.name">
          </el-option>
        </el-select>
        <el-radio v-model="mode" label="1">随机发送</el-radio>
        <el-radio v-model="mode" label="0">顺序发送</el-radio>
        话术间隔：<el-input class="input82" v-model="time" style="margin-right:30px"></el-input>
        <!-- 话术名：<el-input class="input220" v-model="name"></el-input> -->
        <el-button type="primary" style="margin-right:30px" @click='setdlg'>设置常规话术</el-button>

      </div>
      <div class='row'>
        话术选择：<el-select style="width:200px;margin-right:20px" v-model="lg" placeholder="请选择话术名称">
          <el-option v-for="item in hsList" :key="item.name" :label="item.name" :value="item.name">
          </el-option>
        </el-select>
        <el-button type="primary" @click='dellg'>删除话术</el-button>
        <el-input class='inpuths' placeholder="请输入添加的话术名" v-model="hsName"></el-input>
        <el-button type="primary" style="margin-right:30px" @click='addlg'>保存话术</el-button>

      </div>
      <div class='row'>

      </div>
      <el-input type="textarea" placeholder="请输入话术信息" style="width:80%;margin-left:20px" v-model="text" rows="8"></el-input>
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
      hsList: [],
      grouping: '',
      input: '',
      time: '',
      name: '',
      mode: '',
      text: '',
      lg: '',
      hsName: '',
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
    //删除话术
    async dellg() {
      if (!this.grouping) {
        this.$message({
          message: '请选择分组信息',
          type: 'error',
        })
        return
      }
      if (!this.lg) {
        this.$message({
          message: '请选择话术',
          type: 'error',
        })
        return
      }
      let param = {
        token: localStorage.getItem('token'),
        grouping: this.grouping,
        lg: this.lg,
      }
      let res = await this.api.dellg(param)
      if (res.sdata == 1) {
        this.$message({
          message: '删除话术成功',
          type: 'success',
        })
        this.getgrouping()
        this.lg = ''
      } else if (res.sdata == 0) {
        this.$message({
          message: res.msg,
          type: 'error',
        })
      }
    },

    changeGrouping(item) {
      if (item) {
        this.getgrouping()
      }
    },
    async getgrouping() {
      let param = {
        token: localStorage.getItem('token'),
        grouping: this.grouping,
      }
      let res = await this.api.getgrouping(param)
      this.mode = res.mode
      this.name = res.lgname
      this.time = res.hstime
      this.hsList = res.txt
    },
    //保存话术
    async addlg() {
      if (!this.grouping) {
        this.$message({
          message: '请选择分组信息',
          type: 'error',
        })
        return
      }
      if (!this.hsName) {
        this.$message({
          message: '请输入话术名',
          type: 'error',
        })
        return
      }
      if (!this.text) {
        this.$message({
          message: '请输入话术信息',
          type: 'error',
        })
        return
      }
      let a = this.text.split('\n')
      let arr = []
      for (let i of a) {
        let b = i + 'BATTAB'
        arr.push(b)
      }
      let q = String(arr).replace(/,/g, '')

      let param = {
        token: localStorage.getItem('token'),
        gp: this.grouping,
        name: this.hsName,
        text: q,
      }
      let res = await this.api.addlg(param)
      if (res.sdata == 1) {
        this.$message({
          message: '保存话术成功',
          type: 'success',
        })
        this.getgrouping()
      } else if (res.sdata == 0) {
        this.$message({
          message: res.msg,
          type: 'error',
        })
      }
    },

    //设置常规话术
    async setdlg() {
      if (!this.grouping) {
        this.$message({
          message: '请选择分组信息',
          type: 'error',
        })
        return
      }
      if (!this.lg) {
        this.$message({
          message: '请选择话术',
          type: 'error',
        })
        return
      }
      let param = {
        token: localStorage.getItem('token'),
        grouping: this.grouping,
        name: this.lg,
        mode: this.mode,
        time: this.time,
      }
      // console.log(param)
      let res = await this.api.setdlg(param)
      if (res.sdata == 1) {
        this.$message({
          message: '设置常规话术成功',
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
  },
}
</script>
<style lang="less" scoped src='./index.less'></style>