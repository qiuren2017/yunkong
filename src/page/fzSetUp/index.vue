<template>
  <div class='fzSetUp'>
    <TopBar />
    <SidBar />
    <div class='area'>
      <div class='title'>分组设置</div>
      <div class='row'>
        分组名称:
        <el-select clearable style="width:236px;margin-right:30px" v-model="grouping" placeholder="请选择分组名称">
          <el-option v-for="item in fZList" :key="item.name" :label="item.name" :value="item.name">
          </el-option>
        </el-select>
        <el-button type="primary" @click='setgp'>保存分组信息</el-button>
        <el-button type="primary" @click='delgp'>删除分组</el-button>
        <el-button type="primary" @click='roused'>一键唤醒</el-button>
        <el-button type="primary" style="margin-right:30px" @click='close'>一键关闭</el-button>
      </div>
      <div class='row1'>
        在线：{{this.zx}} /任务中：{{this.rwsl }} /空闲：{{this.kx}}
      </div>
      <el-table :header-cell-class-name="cellClass" height="75%" ref="multipleTable" :data="msgList" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" align='center' width="55"></el-table-column>
        <el-table-column label="IMEI" align='center' show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.uuid }}</template>
        </el-table-column>
        <el-table-column prop="sdate" align='center' label="状态" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="grouping" align='center' label="分组" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="rw" align='center' label="任务" show-overflow-tooltip>
        </el-table-column>
        <el-table-column sortable prop="bz" align='center' label="备注名" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="zt" align='center' label="时时反馈" show-overflow-tooltip>
        </el-table-column>
      </el-table>
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
      grouping: '',
      msgList: [],
      changeItem: {},
      rwsl: '',
      zx: '',
      kx: '',
    }
  },
  components: {
    SidBar,
    TopBar,
  },
  mounted() {
    this.getMsg()
    this.getlist()
  },
  methods: {
    //删除分组
    async delgp() {
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
      }
      let res = await this.api.delgp(param)
      if (res.sdata == 1) {
        this.$message({
          message: '删除分组成功！',
          type: 'success',
        })
        this.grouping = ''
        this.getlist()
      } else if (res.sdata == 0) {
        this.$message({
          message: res.msg,
          type: 'error',
        })
      }
    },
    //一键关闭
    async close() {
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
      }
      let res = await this.api.close(param)
      if (res.sdata == 1) {
        this.$message({
          message: '一键关闭成功！',
          type: 'success',
        })
      } else if (res.sdata == 0) {
        this.$message({
          message: res.msg,
          type: 'error',
        })
      }
    },
    //一键唤醒
    async roused() {
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
      }
      let res = await this.api.roused(param)
      if (res.sdata == 1) {
        this.$message({
          message: '一键唤醒成功！',
          type: 'success',
        })
      } else if (res.sdata == 0) {
        this.$message({
          message: res.msg,
          type: 'error',
        })
      }
    },
    ////接口名:获取挂机信息
    async getMsg() {
      let res = await this.api.getMsg({ token: localStorage.getItem('token') })
      if (res.stada == 1) {
        this.msgList = res.msg
        this.rwsl = res.rwsl
        this.zx = res.zx
        this.kx = res.kx
      } else if (res.stada == 0) {
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
    //保存分组
    async setgp() {
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
        imei: this.changeItem,
      }
      let res = await this.api.setgp(param)
      if (res.sdata == 1) {
        this.$message({
          message: '保存分组信息成功',
          type: 'success',
        })
      }
      this.getMsg()
    },
    handleSelectionChange(val) {
      this.changeItem = ''
      for (let i of val) {
        let arr = i.uuid + 'BATTAB'
        this.changeItem += arr
      }
    },
    cellClass(row) {
      if (row.columnIndex === 0) {
        return 'disabledSelection'
      }
    },
  },
}
</script>
<style lang="less" scoped src='./index.less'></style>