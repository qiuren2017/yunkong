<template>
  <div class='setup'>
    <TopBar />
    <SidBar />
    <div class='area'>
      <div class='title'>设置</div>
      <div class='row'>
        分组名称:
        <el-select clearable style="width:200px;margin-right:30px" v-model="grouping" placeholder="请选择分组名称">
          <el-option v-for="item in fZList" :key="item.name" :label="item.name" :value="item.name">
          </el-option>
        </el-select>
      </div>
      <div class='row'>
        <el-checkbox style="width:70px" v-model="gwcActive" @change='setgwc'>浏览购物车</el-checkbox>
        位置：<el-input class="input82" style="padding-right:22px" v-model="gwc"></el-input>
        次数：<el-input class="input82" style="padding-right:22px" v-model="gwcNum"></el-input>
        <el-checkbox style="width:70px" v-model="lwActive" @change='setslw'>送礼物</el-checkbox>
        次数：<el-input class="input82" style="padding-right:22px" v-model="lwNum"></el-input>
        <el-checkbox style="width:70px" v-model="fstActive" @change='setfst'>加粉丝团</el-checkbox>
        次数：<el-input class="input82" style="padding-right:22px" v-model="fstNum"></el-input>
        <el-checkbox style="width:70px" v-model="dpActive" @change='setsdp'>送灯牌</el-checkbox>
        次数：<el-input class="input82" style="padding-right:22px" v-model="dpNum"></el-input>
      </div>
      <div class='row'>
        <el-checkbox style="width:70px" v-model="zbqfdActive" @change='setbzdfd'>直播抢福袋</el-checkbox>
      </div>
      <div class='row'>
        <el-checkbox style="width:70px" v-model="fdActive" @change='fd'>设置福袋</el-checkbox>
        <el-radio v-model="hb" label="1">抢红包</el-radio>
        <el-radio v-model="zf" label="1">支付</el-radio>
        <div class='row_item'>
          <span> 人数：</span>
          <el-input class="input82" v-model="rs"></el-input>
        </div>
        <div class='row_item'>
          <span> 时间：</span>
          <el-input class="input82" v-model="sj"></el-input>
        </div>
        <div class='row_item'>
          <span> 概率：</span>
          <el-input class="input82" v-model="gl"></el-input>
        </div>
        <div class='row_item' style="margin-top:20px">
          视频连接：<el-input class="input520" v-model="link"></el-input>
          <span> 点赞次数</span>
          <el-input class="input82" v-model="dzcs"></el-input>
          <span> 评论次数</span>
          <el-input class="input82" v-model="plcs"></el-input>
          <span> 关注次数</span>
          <el-input class="input82" v-model="gzcs"></el-input>
        </div>
        <div class='row_item1'>
          <div> 评论话术：</div>
          <el-input type="textarea" style="width:66%" v-model="plhs"></el-input>
          <el-button type="primary" @click='setspgz'>设置</el-button>
        </div>
        <div class='set_btn'>

        </div>
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
      msgList: [], //列表数据
      fZList: [], //分组列表
      grouping: '',
      gwc: '',
      gwcNum: '',
      gwcActive: false,
      lwActive: false,
      dpActive: false,
      fstActive: false,
      zbqfdActive: false,
      fdActive: false,
      lwNum: '',
      dpNum: '',
      fstNum: '',
      zbqfdNum: '',
      kq: '',
      hb: '',
      zf: '',
      rs: '',
      sj: '',
      gl: '',
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
      let param = {
        token: localStorage.getItem('token'),
        grouping: this.grouping,
        link: this.link,
        dzcs: this.dzcs,
        plcs: this.plcs,
        gzcs: this.gzcs,
        plhs: this.plhs,
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

    //设置福袋
    async fd() {
      if (!this.grouping) {
        this.$message({
          message: '请选择分组信息',
          type: 'error',
        })
        return
      }
      if (this.fdActive == true) {
        this.kq = '开启'
        let param = {
          token: localStorage.getItem('token'),
          grouping: this.grouping,
          kq: this.kq,
          hb: this.hb,
          zf: this.zf,
          rs: this.rs,
          sj: this.sj,
          gl: this.gl,
        }
        let res = await this.api.fd(param)
        if (res.sdata == 1) {
          this.$message({
            message: '开启福袋成功',
            type: 'success',
          })
        } else if (res.sdata == 0) {
          this.$message({
            message: res.msg,
            type: 'error',
          })
        }
      } else {
        this.kq = '关闭'
        let param = {
          token: localStorage.getItem('token'),
          grouping: this.grouping,
          kq: this.kq,
          hb: this.hb,
          zf: this.zf,
          rs: this.rs,
          sj: this.sj,
          gl: this.gl,
        }
        let res = await this.api.fd(param)
        if (res.sdata == 1) {
          this.$message({
            message: '关闭福袋成功',
            type: 'success',
          })
        } else if (res.sdata == 0) {
          this.$message({
            message: res.msg,
            type: 'error',
          })
        }
      }
    },

    //设置直播抢福袋
    async setbzdfd() {
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
        fd: this.zbqfdNum,
      }
      if (this.zbqfdActive == true) {
        this.zbqfdNum = 1
        let res = await this.api.setbzdfd(param)
        if (res.sdata == 1) {
          this.$message({
            message: '直播抢福袋成功',
            type: 'success',
          })
        } else if (res.sdata == 0) {
          this.$message({
            message: res.msg,
            type: 'error',
          })
        }
      } else {
        this.zbqfdNum = 0
        let res = await this.api.setbzdfd(param)
        if (res.sdata == 1) {
          this.$message({
            message: '取消直播抢福袋成功',
            type: 'success',
          })
        } else if (res.sdata == 0) {
          this.$message({
            message: res.msg,
            type: 'error',
          })
        }
      }
    },

    //送灯牌
    async setsdp() {
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
        sdp: this.dpNum,
      }
      let res = await this.api.setfst(param)
      if (res.sdata == 1) {
        this.$message({
          message: '送灯牌成功',
          type: 'success',
        })
      } else if (res.sdata == 0) {
        this.$message({
          message: res.msg,
          type: 'error',
        })
      }
    },

    //加粉丝团
    async setfst() {
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
        fst: this.fstNum,
      }
      let res = await this.api.setfst(param)
      if (res.sdata == 1) {
        this.$message({
          message: '加粉丝团成功',
          type: 'success',
        })
      } else if (res.sdata == 0) {
        this.$message({
          message: res.msg,
          type: 'error',
        })
      }
    },
    //送礼物
    async setslw() {
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
        slw: this.lwNum,
      }
      let res = await this.api.setslw(param)
      if (res.sdata == 1) {
        this.$message({
          message: '送礼物成功',
          type: 'success',
        })
      } else if (res.sdata == 0) {
        this.$message({
          message: res.msg,
          type: 'error',
        })
      }
    },
    //浏览购物车
    async setgwc() {
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
        gwc: this.gwc,
        num: this.gwcNum,
      }
      let res = await this.api.setgwc(param)
      if (res.sdata == 1) {
        this.$message({
          message: '浏览购物车成功',
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
    handleSelectionChange(val) {
      this.multipleSelection = val
    },

    //将多选变成文字 设置样式
    cellClass(row) {
      if (row.columnIndex === 0) {
        return 'disabledCheck'
      }
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
  },
}
</script>
<style lang="less" scoped src='./index.less'>
</style>