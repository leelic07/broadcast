import {
  getRecordings,
  getRecordingById,
  updateRecording,
  deleteBroadcast,
  sendRecordingIds,
  getRecordingDetail
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
    contents: '',
    mergeRecordingResult: {},
    downloadUrl: '',
    recordingDetail: {}
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
    },
    sendRecordingIds ({ commit }, ids) {
      sendRecordingIds(ids).then(res => res.code === 200 && commit('sendRecordingIds', res)).catch(err => console.log(err))
    },
    getRecordingDetail ({ commit }, id) {
      getRecordingDetail(id).then(res => res.code === 200 && commit('getRecordingDetail', res)).catch(err => console.log(err))
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
      sessionStorage.setItem('token', '')
      if (sessionStorage['token']) {
        Message.error({
          message: '退出登录失败',
          showClose: true
        })
      } else {
        router.push({
          path: '/login'
        })
        Message({
          type: 'success',
          message: '退出登录成功',
          showClose: true
        })
      }
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
      state.checkedRecording = res
      router.push({ path: '/broadcast/merge' })
    },
    sendRecordingIds (state, res) {
      const downloadUrl = res.recording.download_url
      const contents = res.recording.content
      const code = res.code
      state.contents = contents
      state.downloadUrl = downloadUrl
      state.mergeRecordingResult = res
      code === 200 ? Message({
        type: 'success',
        message: '合并记录成功',
        showClose: true
      }) : Message.error({
        message: '合并记录失败',
        showClose: true
      })
    },
    getRecordingDetail (state, res) {
      const recording = res.recording
      state.recordingDetail = recording
    }
  },
  getters: {
    broadcastList: state => state.broadcastList,
    broadForEdit: state => state.broadForEdit,
    updateRecordingResult: state => state.updateRecordingResult,
    deleteRecordingResult: state => state.deleteRecordingResult,
    checkedRecording: state => state.checkedRecording,
    contents: state => state.contents,
    mergeRecordingResult: state => state.mergeRecordingResult,
    downloadUrl: state => state.downloadUrl,
    recordingDetail: state => state.recordingDetail
  }
}
