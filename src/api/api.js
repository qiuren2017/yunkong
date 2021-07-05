import http from "axios";
import qs from "qs";
import Vue from "vue";
//请求带上cookie
// http.defaults.withCredentials = true;
// let obj = window.location.href;
// let index = obj.lastIndexOf("#");
// obj = obj.substring(0, index);
// if (
//   window.location.href.indexOf("192.168") >= 0 ||
//   obj.indexOf("192") >= 0 ||
//   obj.indexOf("localhost") >= 0
// ) {
  var base = "http://42.193.105.228:888/api"; //接口
  Vue.prototype.base = "http://42.193.105.228:888/api"; //接口
  Vue.prototype.link = "http://42.193.105.228:888/api"; //链接
// } else {
  
// }

const makeUrl = function(url, params) {
  let newParams = { ...params };
  let reg = /\:(\w+)/g;
  url = url.replace(reg, (match, key) => {
    delete newParams[key];
    return params[key];
  });
  return { url, params: newParams };
};
const doPost = function(u) {
  return function(p = {}) {
    let { url, params } = makeUrl(u, p);
    return params
      ? http.post(`${base}/${url}`, params)
      : http.post(`${base}/${url}`);
  };
};
const doGet = function(u) {
  return function(p = {}) {
    let { url, params } = makeUrl(u, p);
    return params
      ? http.get(`${base}/${url}`, { params: params })
      : http.get(`${base}/${url}`);
  };
};
//返回拦截器
http.interceptors.response.use(function(res) {
  return res.data;
});
let api = {
  getLogin:doGet('login'),//登陆
  getMsg:doGet('getmsg'),//接口名:获取挂机信息
  getlist:doGet('getlist'),//接口名:获取分组列表
  setgp:doGet('setgp'),//接口名:保存分组
  setdlg:doGet('setdlg'),//接口名:设置常规话术
  roused:doGet('roused'),//接口名:一键唤醒
  close:doGet('close'),//接口名:一键关闭
  delgp:doGet('delgp'),//接口名:删除分组
  gorm:doGet('gorm'),//接口名:设置直播连接
  setlike:doGet('setlike'),//接口名:设置点赞
  setgzzb:doGet('setgzzb'),//接口名:设置关注主播
  setgzbd:doGet('setgzbd'),//接口名:设置关注榜单
  addlg:doGet('addlg'),//接口名:保存话术
  getgrouping:doGet('getgrouping'),//接口名:获取话术列表
  setslg:doGet('setslg'),//接口名:设置刷频话术
  setgwc:doGet('setgwc'),//接口名:设置浏览购物车
  setslw:doGet('setslw'),//接口名:设置送礼物
  setfst:doGet('setfst'),//接口名:设置加粉丝团
  setsdp:doGet('setsdp'),//接口名:设置送灯牌
  setbzdfd:doGet('setbzdfd'),//接口名:设置直播抢福袋
  fd:doGet('fd'),//接口名:设置福袋   未通过
  setspgz:doGet('setspgz'),//接口名:设置视频功能  
  setyh:doGet('setyh'),//接口名:设置养号概率  
  time:doGet('time'),//接口名:设置养号时间  
  dellg:doGet('dellg'),//接口名:删除话术  



};

export default api;
