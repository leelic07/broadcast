export default {
  state: {
    loading: false
  },
  mutations: {
    showLoading: state => {
      state.loading = true
    },
    hideLoading: state => {
      state.loading = false
    }
  },
  getters: {
    loading: state => state.loading
  }
}
