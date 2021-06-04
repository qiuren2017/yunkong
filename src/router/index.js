import Vue from "vue";
import Router from "vue-router";
import Home from "@/page/home"; //登陆
import SetUp from "@/page/setUp";
import FzSetUp from "@/page/fzSetUp";
import HsSetUp from "@/page/hsSetUp";
import SphsSetUp from "@/page/sphsSetUp";
import YhSetUp from "@/page/yhSetUp";
import ZbSetUp from "@/page/zbSetUp";
import DzgzSetUp from "@/page/dzgzSetUp";
import ZdqfdSetUp from "@/page/zdqfdSetUp";
import LwfsdpSetUp from "@/page/lwfsdpSetUp";



Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/setUp",
      name: "setUp",
      component: SetUp
    },
    {
      path: "/fzSetUp",
      name: "fzSetUp",
      component: FzSetUp
    },
    {
      path: "/hsSetUp",
      name: "hsSetUp",
      component: HsSetUp
    },
    {
      path: "/sphsSetUp",
      name: "sphsSetUp",
      component: SphsSetUp
    },
    {
      path: "/yhSetUp",
      name: "yhSetUp",
      component: YhSetUp
    },
    {
      path: "/zbSetUp",
      name: "zbSetUp",
      component: ZbSetUp
    },
    {
      path: "/dzgzSetUp",
      name: "dzgzSetUp",
      component: DzgzSetUp
    },
    {
      path: "/zdqfdSetUp",
      name: "zdqfdSetUp",
      component: ZdqfdSetUp
    },
    {
      path: "/lwfsdpSetUp",
      name: "lwfsdpSetUp",
      component: LwfsdpSetUp
    }

    
  ]
});
