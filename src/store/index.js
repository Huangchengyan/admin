/*
 * @description 导入所有 vuex 模块，
 */

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const files = require.context("./modules", false, /\.js$/);
const modules = {};

files.keys().forEach((key) => {
  modules[key.replace(/(\.\/|\.js)/g, "")] = files(key).default;
});
Object.keys(modules).forEach((key) => {
  modules[key]["namespaced"] = true;
});
const store = new Vuex.Store({
  modules,
});
export default store;
