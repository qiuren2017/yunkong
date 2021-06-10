<template>
  <div class='zbSetUp'>
    <TopBar />
    <SidBar />
    <div class='area'>
      <div class='row'>
        分组名称:
        <el-select clearable style="width:150px;margin-right:30px" v-model="grouping" placeholder="请选择分组名称" @change="selectChanged">
          <el-option v-for="item in fZList" :key="item.name" :label="item.name" :value="item.name">
          </el-option>
        </el-select>
        直播间链接：<el-input class="input320" v-model="lg" style="margin-right:20px;"></el-input>
        超时：<el-input class="input82" v-model="cstime"></el-input>
        延时：<el-input class="input82" v-model="ystime"></el-input>
        <el-button type="primary" style="margin-left:18px;" @click='gorm'>设置直播</el-button>
      </div>
      <div class='row'>
        <el-checkbox v-model="likeActive" @change='setlike'>点赞次数</el-checkbox>
        <el-input class="input82" v-model="likeNum" style="margin-right:20px;"></el-input>
        <el-checkbox v-model="gzActive" @change='setgzzb'>关注主播</el-checkbox>
        次数：<el-input class="input82" v-model="gzzbNum" style="margin-right:20px;"></el-input>
        <el-checkbox v-model="gzbdActive" @change='setgzbd'>关注榜单</el-checkbox>
        位置：<el-input class="input82" v-model="wz" style="margin-right:20px;"></el-input>
        次数：<el-input class="input82" v-model="gzbdNum" style="margin-right:20px;">
        </el-input>
      </div>
      <div class='row'>
        <el-checkbox v-model="gwcActive" @change='setgwc'>浏览购物车</el-checkbox>
        位置：<el-input class="input82" style="padding-right:22px" v-model="gwc"></el-input>
        次数：<el-input class="input82" style="padding-right:22px" v-model="gwcNum"></el-input>
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
      gwcActive: false,
      gwc: '',
      gwcNum: '',
      fZList: [],
      lg: '',
      grouping: '',
      cstime: '',
      ystime: '',
      like: '',
      likeActive: false,
      gzActive: false,
      gzbdActive: false,
      likeNum: '',
      gzzbNum: '',
      gzbdNum: '',
      gz: '',
      wz: '',
      gzbd: '',
      input: '',
      radio: '',
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
    //浏览购物车
    async setgwc() {
      if (!this.grouping) {
        this.$message({
          message: '请选择分组信息',
          type: 'error',
        })
        return
      }
      
      if (this.gwcActive) {
        let param = {
          token: localStorage.getItem('token'),
          grouping: this.grouping,
          gwc: this.gwc,
          num: this.gwcNum,
        }
        let res = await this.api.setgwc(param);
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
      }else{
        let param = {
          token: localStorage.getItem('token'),
          grouping: this.grouping,
          gwc: '',
          num: '',
        }
        let res = await this.api.setgwc(param);
        if (res.sdata == 1) {
          this.$message({
            message: '关闭浏览购物车成功',
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
    //关注榜单
    async setgzbd() {
      if (!this.grouping) {
        this.$message({
          message: '请选择分组信息',
          type: 'error',
        })
        return
      }
      if (this.gzbdActive == true) {
        this.gzbd = 1
        let param = {
          token: localStorage.getItem('token'),
          grouping: this.grouping,
          gz: this.wz,
          num: this.gzbdNum,
        }
        let res = await this.api.setgzbd(param)
        if (res.sdata == 1) {
          if (this.wz) {
            this.$message({
              message: '关注榜单成功',
              type: 'success',
            });
            return;
          }
        }
      } else {
        this.gzbd = 0;
        let param = {
          token: localStorage.getItem('token'),
          grouping: this.grouping,
          gz: '',
          num: '',
        }
        let res = await this.api.setgzbd(param)
        if (res.sdata == 1) {
          if (this.wz) {
            this.$message({
              message: '取消关注榜单成功',
              type: 'success',
            })
            return;
          }
        }
      }
    },

    //关注主播
    async setgzzb() {
      if (!this.grouping) {
        this.$message({
          message: '请选择分组信息',
          type: 'error',
        })
        return
      }
      if (this.gzActive == true) {
        this.gz = 1
        let param = {
          token: localStorage.getItem('token'),
          grouping: this.grouping,
          gz: this.gz,
          num: this.gzzbNum,
        }
        let res = await this.api.setgzzb(param)
        if (res.sdata == 1) {
          this.$message({
            message: '关注主播成功',
            type: 'success',
          })
        }
      } else {
        this.gz = 0
        let param = {
          token: localStorage.getItem('token'),
          grouping: this.grouping,
          gz: this.gz,
          num: '',
        }
        let res = await this.api.setgzzb(param)
        if (res.sdata == 1) {
          this.$message({
            message: '取消关注主播成功',
            type: 'success',
          })
        }
      }
    },
    //点赞
    async setlike() {
      if (!this.grouping) {
        this.$message({
          message: '请选择分组信息',
          type: 'error',
        })
        return
      }
      if (this.likeActive == true) {
        this.like = 1
        let param = {
          token: localStorage.getItem('token'),
          grouping: this.grouping,
          like: this.like,
          num: this.likeNum,
        }
        let res = await this.api.setlike(param)
        if (res.sdata == 1) {
          this.$message({
            message: '点赞成功',
            type: 'success',
          })
        }
      } else {
        this.like = 0
        let param = {
          token: localStorage.getItem('token'),
          grouping: this.grouping,
          like: this.like,
          num: '',
        }
        let res = await this.api.setlike(param)
        if (res.sdata == 1) {
          this.$message({
            message: '取消点赞成功',
            type: 'success',
          })
        }
      }
    },

    //设置直播
    async gorm() {
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
        cstime: this.cstime,
        ystime: this.ystime,
      }
      let res = await this.api.gorm(param)
      if (res.sdata == 1) {
        this.$message({
          message: '设置直播成功',
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
        this.lg = res.link;
        this.cstime=res.cstime;
        this.ystime=res.ystime;
        this.wz=res.gzbd;
        this.gzbdNum=res.gzbdcs;
        this.likeActive=res.like==1?true:false;
        // this.likeActive=res.num==1?true:false;
        this.likeNum = res.num;
        this.gzzbNum=res.gzzb;
        this.gwc = res.gwc;
        this.gwcNum=res.gwccs;
        // like
      }
    },
  },
}
</script>
<style lang="less" scoped src='./index.less'></style>