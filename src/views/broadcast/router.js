export default [{
  path: '/broadcast',
  name: 'Broadcast',
  component: () => import('./index')
}, {
  path: '/broadcast/edit/:id',
  name: 'BroadcastEdit',
  component: () => import('./views/edit')
}, {
  path: '/broadcast/merge',
  name: 'BroadcastMerge',
  component: () => import('./views/merge')
}]
