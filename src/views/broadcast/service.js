import { get, patch, remove, post } from '@/service'

export const getRecordings = pagination => get('/recordings', pagination).then(res => res).catch(err => err)

export const getRecordingById = id => get(`/recordings/${id}`).then(res => res).catch(err => err)

export const updateRecording = (id, content) => patch(`/recordings/${id}`, content).then(res => res).catch(err => err)

export const deleteBroadcast = id => remove(`/recordings/${id}`).then(res => res).catch(err => err)

export const sendRecordingIds = ids => post('/merges', { ids }).then(res => res).catch(err => err)

export const getRecordingDetail = id => get(`/recordings/${id}`).then(res => res).catch(err => err)
