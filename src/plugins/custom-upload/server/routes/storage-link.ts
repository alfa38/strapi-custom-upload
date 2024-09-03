// import { factories } from '@strapi/strapi';

export default {
  routes: [
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






// export default factories.createCoreRouter('plugin::custom-upload.storage-link');