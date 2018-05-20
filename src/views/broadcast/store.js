import {
  getRecordings,
  getRecordingById,
  updateRecording,
  deleteBroadcast
} from './service'
import { Message } from 'element-ui'
import router from '@/router'

export default {
  state: {
    broadcastList: [],
    broadForEdit: {},
    updateRecordingResult: {},
    deleteRecordingResult: {},
    checkedRecording: {},
    contents: ''
  },
  actions: {
    getRecordings ({ commit }, pagination) {
      getRecordings(pagination).then(res => res.code === 200 && commit('getRecordings', res)).catch(err => console.log(err))
    },
    getRecordingById ({ commit }, id) {
      getRecordingById(id).then(res => res.code === 200 && commit('getRecordingById', res)).catch(err => console.log(err))
    },
    updateRecording ({ commit }, recording) {
      const id = recording.id
      const content = recording.content
      updateRecording(id, { content }).then(res => commit('updateRecording', res)).catch(err => console.log(err))
    },
    deleteBroadcast ({ commit }, id) {
      deleteBroadcast(id).then(res => commit('deleteBroadcast', res)).catch(err => console.log(err))
    }
  },
  mutations: {
    getRecordings (state, res) {
      const recordings = res.recordings
      state.broadcastList = recordings || []
    },
    getRecordingById (state, res) {
      const recording = res.recording
      state.broadForEdit = recording
    },
    updateRecording (state, res) {
      const code = res.code
      code === 200 ? Message({
        type: 'success',
        message: '修改语音内容成功',
        showClose: true
      }) : Message({
        type: 'error',
        message: '修改语音内容失败',
        showClose: true
      })

      state.updateRecordingResult = res
    },
    logout (state) {
      router.replace({
        path: '/login'
      })
      Message({
        type: 'success',
        message: '退出登录成功',
        showClose: true
      })
    },
    deleteBroadcast (state, res) {
      const code = res.code
      code === 200 ? Message({
        type: 'success',
        message: '删除语音成功',
        showClose: true
      }) : Message({
        type: 'error',
        message: '删除语音失败',
        showClose: true
      })
      state.deleteRecordingResult = res
    },
    mergeRecording (state, res) {
      let contents = ''
      res.forEach(record => {
        contents += `${record.content}\n`
      })
      state.contents = contents
      state.checkedRecording = res
      router.push({ path: '/broadcast/merge' })
    }
  },
  getters: {
    broadcastList: state => state.broadcastList,
    broadForEdit: state => state.broadForEdit,
    updateRecordingResult: state => state.updateRecordingResult,
    deleteRecordingResult: state => state.deleteRecordingResult,
    checkedRecording: state => state.checkedRecording,
    contents: state => state.contents
  }
}
