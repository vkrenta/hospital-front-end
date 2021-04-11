export const state = () => ({
  hospitals: [],
});

export const mutations = {
  setHospitals(state, list) {
    state.hospitals = [...list];
  },
};

export const actions = {
  async fetchHospitals({ commit }, { page = 1, limit = 10 }) {
    const listOfHospitals = await this.$axios.$get(
      `/hospitals?offset=${limit * (page - 1)}&limit=${limit}`
    );

    commit('setHospitals', listOfHospitals);

    return listOfHospitals;
  },
};

export const getters = {
  getHospitals({ hospitals }) {
    return hospitals;
  },
};
