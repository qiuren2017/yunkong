<template>
  <div class='setup'>
    <TopBar />
    <SidBar />
    <div class='area'>
      <div class='title'>设置自动抢福袋</div>
      <div class='row'>
        分组名称:
        <el-select clearable style="width:200px;margin-right:30px" v-model="grouping" placeholder="请选择分组名称" @change="selectChanged">
          <el-option v-for="item in fZList" :key="item.name" :label="item.name" :value="item.name">
          </el-option>
        </el-select>
      </div>
       <div class='row'>
        <el-checkbox style="width:70px" v-model="zbqfdActive" @change='setbzdfd'>直播抢福袋</el-checkbox>
      </div>
      <div class='row'>
        <el-checkbox style="width:70px" v-model="fdActive" @change='fd'>设置福袋</el-checkbox>
        <el-switch v-model="hb_active" style="margin-left:20px">抢红包</el-switch>抢红包
        <el-switch v-model="zf_active" style="margin-left:20px">支付</el-switch>支付
        <!-- <switch v-model="hb0">抢红包</switch>
        <el-radio v-model="hb1" label="1">抢红包</el-radio>
        <el-radio v-model="zf" label="1">支付</el-radio> -->
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
      zbqfdActive: false,
      fdActive: false,
      hb_active:false,
      zf_active:false,
      zbqfdNum: '',
      kq: '',
      hb: '',
      zf: '',
      rs: '',
      sj: '',
      gl: '',
    }
  },
  mounted() {
    ////接口名:获取分组下拉列表
    this.getlist()
  },
  methods: {
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
        let param = {
          token: localStorage.getItem('token'),
          grouping: this.grouping,
          kq: this.fdActive==true?1:0,
          hb: this.hb_active==true?1:0,
          zf: this.zf_active==true?1:0,
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
        let param = {
          token: localStorage.getItem('token'),
          grouping: this.grouping,
          kq: '',
          hb: '',
          zf: '',
          rs: '',
          sj: '',
          gl: '',
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
      let msg = '直播抢福袋成功';
      if (!this.zbqfdActive == true) {
          msg = '取消直播抢福袋成功';
      }
      let param = {
        token: localStorage.getItem('token'),
        grouping: this.grouping,
        fd: this.zbqfdActive==true?1:0
      }
      let res = await this.api.setbzdfd(param)
      if (res.sdata == 1) {
        this.$message({
          message: msg,
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
        // this.zbqfdActive = res.fd;
        this.fdActive=res.fd=='开启'?true:false;
        this.hb=res.hb;
        this.zf=res.zf;
        this.rs=res.rs;
        this.sj=res.sj;
        this.gl=res.gl;
        this.hb_active=res.hb==1?true:false;
        this.zf_active=res.zf==1?true:false;
      }
    },

  },
}
</script>
<style lang="less" scoped src='./index.less'>
</style>