/*
 * @description
 */
import { queryUserAndLocation } from "@/api/management";
const state = {
  location: [],
};
const getters = {
  location: (state) => state.location,
};
const mutations = {
  changeLocation(state,location) {
    state.location = location
  },
};
const actions = {
  async getlocation({ commit },queryForm) {
    const data = await queryUserAndLocation(queryForm);
    commit('changeLocation', data.content.locations)
  }
};
export default { state, getters, mutations, actions };
