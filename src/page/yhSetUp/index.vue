<template>
  <div class='index'>
    <TopBar />
    <SidBar />
    <div class='area'>
      <div class='title'>养号设置</div>
      <div class='row'>
        分组名称:
        <el-select clearable style="width:200px;margin-right:30px" v-model="grouping" placeholder="请选择分组名称" @change="selectChanged">
          <el-option v-for="item in fZList" :key="item.name" :label="item.name" :value="item.name">
          </el-option>
        </el-select>
      </div>
      <div class='row'>
        养号时间 <el-input class="input320" v-model="time"></el-input>
        <el-button type="primary" @click='settime'>设置养号时间</el-button>
      </div>
      <div class='row'>
        <div class='row_item'>
          <span class="item"> 点赞概率：</span>
          <el-input class="input82" v-model="dzgl"></el-input>
        </div>
        <div class='row_item'>
          <span class="item"> 进评论概率：</span>
          <el-input class="input82" v-model="plgl"></el-input>
        </div>
        <div class='row_item'>
          <span class="item"> 评论点赞概率：</span>
          <el-input class="input82" v-model="pldzgl"></el-input>
        </div>
        <div class='row_item'>
          <span class="item"> 进主页概率：</span>
          <el-input class="input82" v-model="zygl"></el-input>
        </div>
        <div class='row_item'>
          <span class="item"> 视频点赞概率：</span>
          <el-input class="input82" v-model="zydzgl"></el-input>
        </div>
        <div class='row_item'>
          <span class="item"> 评论转发概率：</span>
          <el-input class="input82" v-model="zfplgl"></el-input>
        </div>
        <div class='row_item'>
          <span class="item"> 评论概率：</span>
          <el-input class="input82" v-model="plhsgl"></el-input>
        </div>
        <div class='row_item'>
          <span class="item"> 回复评论概率：</span>
          <el-input class="input82" v-model="plhfgl"></el-input>
        </div>
        <div class='row_item1'>
          <div class="item"> 评论转发话术：</div>
          <el-input rows="8"  type="textarea" style='width:90%;margin:10px 0;' v-model="plhs"></el-input>
        </div>
        <div class='right_left_btn'>
          <el-button type="primary" @click='setyh'>养号设置</el-button>
        </div>
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
      grouping: '', //分组
      dzgl: '', //点赞概率
      plgl: '', //进评论概率
      pldzgl: '', //评论点赞概率
      zygl: '', //进主页概率
      zydzgl: '', //视频点赞概率
      zfplgl: '', //转发评论概率
      plhsgl: '', //评论概率
      plhfgl: '', //评论回复概率
      plhs: '', //评论话术
      time: '', //养号时间
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
    //设置养号时间
    // token=token&grouping=分组名&time=时间
    async settime() {
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
        time: this.time,
      }
      let res = await this.api.time(param)
      if (res.sdata == 1) {
        this.$message({
          message: '设置养号时间成功',
          type: 'success',
        })
      } else if (res.sdata == 0) {
        this.$message({
          message: res.msg,
          type: 'error',
        })
      }
    },
    //设置养号概率
    async setyh() {
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
        dzgl: this.dzgl, //点赞概率
        plgl: this.plgl, //进评论概率
        pldzgl: this.pldzgl, //评论点赞概率
        zygl: this.zygl, //进主页概率
        zydzgl: this.zydzgl, //视频点赞概率
        zfplgl: this.zfplgl, //转发评论概率
        plhsgl: this.plhsgl, //评论概率
        plhfgl: this.plhfgl, //评论回复概率
        plhs: q, //评论话术
      }
      let res = await this.api.setyh(param)
      if (res.sdata == 1) {
        this.$message({
          message: '养号设置成功',
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
    //下拉选择查询
    async selectChanged(value) {
      if (value) {
        let param = {
          token: localStorage.getItem('token'),
          grouping: this.grouping,
        }
        let res = await this.api.getgrouping(param)
        this.time = res.time
        this.dzgl = res.dzgl
        this.plgl = res.plgl
        this.pldzgl = res.pldzgl
        this.zygl = res.zygl
        this.zydzgl = res.zydzgl
        this.zfplgl = res.plzfgl
        this.plhsgl = res.plhsgl
        this.plhfgl = res.plhfgl
        this.plhs = res.plhs
      }
    },
  },
}
</script>
<style lang="less" scoped src='./index.less'></style>