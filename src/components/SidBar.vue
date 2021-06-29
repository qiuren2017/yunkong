<template>
  <div class='sidbar'>
    <div class="area" @click='activeMode'>抖抖</div>
    <div class='area_children' v-if="childrenShow">
      <div :class="showColor('fzSetUp')" @click='changeTab(1)'> <i class="el-icon-setting"></i>分组设置</div>
      <div :class="showColor('zbSetUp')" @click='changeTab(2)'> <i class="el-icon-setting"></i>直播设置</div>
      <div :class="showColor('hsSetUp')" @click='changeTab(3)'> <i class="el-icon-setting"></i>话术设置</div>
      <div :class="showColor('sphsSetUp')" @click='changeTab(4)'> <i class="el-icon-setting"></i>刷屏话术设置</div>
      <div :class="showColor('yhSetUp')" @click='changeTab(5)'> <i class="el-icon-setting"></i>养号设置</div>
      <!-- <div :class="showColor('setUp')" @click='changeTab(6)'> <i class="el-icon-setting"></i>设置</div> -->
      <div :class="showColor('dzgzSetUp')" @click='changeTab(7)'> <i class="el-icon-setting"></i>视频点赞关注</div>
      <div :class="showColor('zdqfdSetUp')" @click='changeTab(8)'> <i class="el-icon-setting"></i>抢福袋自动</div>
      <div :class="showColor('lwfsdpSetUp')" @click='changeTab(9)'> <i class="el-icon-setting"></i>礼物粉丝团灯牌</div>
    </div>
    <div class="buttom">技术联系QQ 261560777</div>
  </div>
  
</template>
<script>
export default {
  data() {
    return {
      active: null,
      show: false,
      childrenShow: false,
    }
  },
  mounted() {
    this.active = this.$route.name
    if (this.$route.name) {
      this.childrenShow = true
    }
  },
  methods: {
    activeMode() {
      this.childrenShow = !this.childrenShow
    },
    showColor(value) {
      if (this.active == value) {
        this.show = true
        return 'active'
      } else {
        this.show = false
        return 'row'
      }
    },
    changeTab(value) {
      if (value == 1) {
        this.$router.push('/fzSetUp')
      } else if (value == 2) {
        this.$router.push('/zbSetUp')
      } else if (value == 3) {
        this.$router.push('/hsSetUp')
      } else if (value == 4) {
        this.$router.push('/sphsSetUp')
      } else if (value == 5) {
        this.$router.push('/yhSetUp')
      }
      //  else if (value == 6) {
      //   this.$router.push('/setUp')
      // }
      else if (value == 7) {
        this.$router.push('/dzgzSetUp')
      } else if (value == 8) {
        this.$router.push('/zdqfdSetUp')
      } else if (value == 9) {
        this.$router.push('/lwfsdpSetUp')
      }
    },
  },
}
</script>
<style scoped lang='less'>
.sidbar {
  position: fixed;
  top: 60px;
  left: 0;
  bottom: 0;
  width: 160px;
  background: #545c64;
  text-align: left;
  .area {
    padding-left: 30px;
    font-size: 14px;
    color: #fff;
    height: 50px;
    line-height: 50px;
    background: #35383b;
    cursor: pointer;
    user-select: none;
    .area_children {
      background: #545c64;
      height: 100%;
    }
  }
  .active {
    box-sizing: border-box;
    width: 160px;
    padding-left: 30px;
    display: inline-block;
    font-size: 14px;
    color: #fff;
    height: 50px;
    line-height: 50px;
    cursor: pointer;
    user-select: none;
    background: #9c9ea0;
  }
  .row {
    padding-left: 30px;
    font-size: 14px;
    color: #fff;
    height: 50px;
    line-height: 50px;
    background: #545c64;
    cursor: pointer;
    user-select: none;
    &:hover {
      background: #9c9ea0;
    }
  }
  .buttom{
    color: #fff;
    padding-left: 5px;
    font-size: 14px;
    // height: 50px;
    // line-height: 50px;
    position:fixed;
    bottom:30px;
    background: #545c64;
    cursor: pointer;
  }
}

</style>