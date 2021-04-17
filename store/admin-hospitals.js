export const state = () => ({
  hospitals: [],
  count: 0,
});

export const mutations = {
  setHospitals(state, list) {
    state.hospitals = [...list];
  },
  setHospitalsCount(state, data) {
    state.hospitalsCount = data;
  },
};

export const actions = {
  async fetchHospitals({ commit }, { page = 1 }) {
    const listOfHospitals = await this.$axios.$get('/api/hospitals', {
      params: { page },
    });

    commit('setHospitals', listOfHospitals);

    return listOfHospitals;
  },

  async fetchHospitalsCount({ commit }) {
    const {
      data: { count },
    } = await this.$userAxios.get('/api/hospitals/count');

    commit('setHospitalsCount', count);

    return count;
  },
};

export const getters = {
  getHospitals({ hospitals }) {
    return hospitals;
  },

  getHospitalsCount({ hospitalsCount }) {
    return hospitalsCount;
  },
};
