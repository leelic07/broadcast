import { get, patch, remove } from '@/service'

export const getRecordings = () => get('/recordings').then(res => res).catch(err => err)

export const getRecordingById = id => get(`/recordings/${id}`).then(res => res).catch(err => err)

export const updateRecording = (id, content) => patch(`/recordings/${id}`, content).then(res => res).catch(err => err)

export const deleteBroadcast = id => remove(`/recordings/${id}`).then(res => res).catch(err => err)
