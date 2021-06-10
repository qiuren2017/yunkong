<template>
  <div class='setup'>
    <TopBar />
    <SidBar />
    <div class='area'>
      <div class='title'>礼物粉丝团灯牌</div>
      <div class='row'>
        分组名称:
        <el-select clearable style="width:200px;margin-right:30px" v-model="grouping" placeholder="请选择分组名称" @change="selectChanged">
          <el-option v-for="item in fZList" :key="item.name" :label="item.name" :value="item.name">
          </el-option>
        </el-select>
      </div>
      <div class='row'>
        <el-checkbox style="width:70px" v-model="lwActive" @change='setslw'>送礼物</el-checkbox>
        次数：<el-input class="input82" style="padding-right:22px" v-model="lwNum"></el-input>
        <el-checkbox style="width:70px" v-model="fstActive" @change='setfst'>加粉丝团</el-checkbox>
        次数：<el-input class="input82" style="padding-right:22px" v-model="fstNum"></el-input>
        <el-checkbox style="width:70px" v-model="dpActive" @change='setsdp'>送灯牌</el-checkbox>
        次数：<el-input class="input82" style="padding-right:22px" v-model="dpNum"></el-input>
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
      fZList: [], //列表数据
      grouping: '',
      lwActive: false,
      dpActive: false,
      fstActive: false,
      lwNum: '',
      dpNum: '',
      fstNum: '',
      zbqfdNum: '',
    }
  },
  mounted() {
    ////接口名:获取分组下拉列表
    this.getlist()
  },
  methods: {
    //送灯牌
    async setsdp() {
      if (!this.grouping) {
        this.$message({
          message: '请选择分组信息',
          type: 'error',
        })
        return
      }
      let msg = '送灯牌成功';
      if (!this.dpActive) {
          msg = '取消送灯牌成功';
          this.dpNum='';
      }
      let param = {
        token: localStorage.getItem('token'),
        grouping: this.grouping,
        sdp: this.dpNum,
      }
      
      let res = await this.api.setsdp(param)
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

    //加粉丝团
    async setfst() {
      if (!this.grouping) {
        this.$message({
          message: '请选择分组信息',
          type: 'error',
        })
        return
      }
      let msg = '加粉丝团成功';
      if (!this.fstActive) {
         this.fstNum='';
        msg = '取消加粉丝团成功';
      }
      let param = {
        token: localStorage.getItem('token'),
        grouping: this.grouping,
        fst: this.fstNum,
      }
      
      let res = await this.api.setfst(param)
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
    //送礼物
    async setslw() {
      if (!this.grouping) {
        this.$message({
          message: '请选择分组信息',
          type: 'error',
        })
        return
      }
      let msg = "送礼物成功";
      if(!this.lwActive){
        this.lwNum='';
        msg = "取消送礼物成功";
      }
      let param = {
        token: localStorage.getItem('token'),
        grouping: this.grouping,
        slw: this.lwNum,
      }
      let res = await this.api.setslw(param)
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
        // this.lwActive=
        // this.fstActive=
        // this.dpActive=
        this.lwNum =res.slw;
        this.fstNum=res.fst;
        this.dpNum =res.sdp;
      }
    },

  },
}
</script>
<style lang="less" scoped src='./index.less'>
</style>