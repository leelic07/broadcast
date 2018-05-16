import { getRecordings } from './service'

export default {
  state: {
    broadcastList: []
  },
  actions: {
    getRecordings ({ commit }) {
      getRecordings().then(res => commit('getRecordings', res)).catch(err => console.log(err))
    }
  },
  mutations: {
    getRecordings (state, recordingResult) {
      const recordings = recordingResult.recordings
      state.broadcastList = recordings
      debugger
    }
  },
  getters: {
    broadcastList: state => state.broadcastList
  }
}
