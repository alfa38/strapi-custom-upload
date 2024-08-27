export default  {
  routes: [
    // {
    //   method: 'GET',
    //   path: '/1/2',
    //   handler: 'plugin::custom-upload.custom-upload.getOne',
    //   api: true,
    //   config: {
    //     policies: [],
    //     auth: false,
    //   }
    // },
    {
      method: 'GET',
      path: '/',
      handler: 'plugin::custom-upload.custom-upload.getOne',
      api: true,
      config: {
        policies: [],
        auth: false,
      }
    },
    // {
    //   method: 'GET',
    //   path: '/:subDirectory/:fileName', // executes with :/custom-upload/path
    //   // handler: 'api::custom-upload.custom-upload.getBaseFiles',
    //   handler: 'plugin::custom-upload.custom-upload.getBaseFiles',
    //     config: {
    //     policies: [],
    //     auth: false,
    //   },
    // },
    // {
    //   method: 'GET',
    //   path: '/:subDirectory/:subdir2/:fileName',
    //   // handler: 'api::custom-upload.custom-upload.getBaseFiles',
    //   handler: 'plugin::custom-upload.custom-upload.getBaseFiles',
    //     config: {
    //     policies: [],
    //     auth: false,
    //   },
    // },
    // {
    //   method: 'GET',
    //   path: '/docs/:folderName',
    //   handler: 'api::custom-upload.custom-upload.getOne',
    //     config: {
    //     policies: [],
    //     auth: false,
    //   },
    // },
    // {
    //   method: 'GET',
    //   path: '/folders',
    //   handler: 'fs.getAllFolders',
    //     config: {
    //     policies: [],
    //     auth: false,
    //   },
    // },
    // {
    //   method: 'GET',
    //   path: '/folder',
    //   handler: 'fs.getFolder',
    //     config: {
    //     policies: [],
    //     auth: false,
    //   },
    // },
  ],
};
