/*
 * @description 登录、获取用户信息、退出登录、清除accessToken
 */

import Vue from "vue"
import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
} from "@/utils/accessToken"
import { resetRouter } from "@/router"

const state = {
  accessToken: getAccessToken(),
  username: "",
  avatar: "",
  userType: "" || window.localStorage.getItem('userType'),
  permissions: [],
};
const getters = {
  accessToken: (state) => state.accessToken,
  username: (state) => state.username,
  avatar: (state) => state.avatar,
  userType: (state) => state.userType,
  permissions: (state) => state.permissions,
};
const mutations = {
  setAccessToken(state, accessToken) {
    state.accessToken = accessToken;
    setAccessToken(accessToken);
  },
  setUsername(state, username) {
    state.username = username;
  },
  setAvatar(state, avatar) {
    state.avatar = avatar;
  },
  setUserType(state, userType) {
    state.userType = userType
		window.localStorage.setItem('userType', userType)
  },
  setPermissions(state, permissions) {
    state.permissions = permissions;
  },
};
const actions = {
  setPermissions({ commit }, permissions) {
    commit("setPermissions", permissions)
  },
  async login({ commit }) {
    const accessToken = '654321'
    commit("setAccessToken", accessToken)
  },
  getUserInfo({ commit }) {
    var permissions = ["admin"]
    var username = "admin"
    var avatar = "https://i.gtimg.cn/club/item/face/img/2/15922_100.gif"
    if (permissions && username && Array.isArray(permissions)) {
      commit("setPermissions", permissions);
      commit("setUsername", username);
      commit("setAvatar", avatar);
      return permissions;
    } else {
      Vue.prototype.$baseMessage("用户信息接口异常", "error");
      return false;
    }
  },
  async logout({ dispatch }) {
    await dispatch("resetAccessToken")
    await resetRouter();
  },
  resetAccessToken({ commit }) {
    commit("setPermissions", [])
    commit("setAccessToken", "")
    removeAccessToken()
  },
}
export default { state, getters, mutations, actions }
