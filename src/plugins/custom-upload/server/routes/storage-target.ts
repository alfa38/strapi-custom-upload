export default {
  routes: [
    {
      method: 'GET',
      path: '/getCurrentTarget',
      handler: 'plugin::custom-upload.storage-target.getCurrentTarget',
      api: true,
      config: {
        policies: [],
        auth: false,
      }
    },
    {
      method: 'GET',
      path: '/setCurrentTarget/:target',
      handler: 'plugin::custom-upload.storage-target.setCurrentTarget',
      api: true,
      config: {
        policies: [],
        auth: false,
      }
    },
    {
      method: 'GET',
      path: '/getAllTargets',
      handler: 'plugin::custom-upload.storage-link.getAllTargets',
      api: true,
      config: {
        policies: [],
        auth: false,
      }
    },
  ]
}
