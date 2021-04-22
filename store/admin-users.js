export const state = () => {};

export const mutations = {};

export const actions = {
  async createUser({}, user) {
    await this.$userAxios.post('/api/users', user);
  },
};

export const getters = {};
