export default  {
  routes: [
    {
      method: 'GET',
      path: '/root-files/:subDirectory/:fileName',
      handler: 'api::custom-upload.custom-upload.getBaseFiles',
        config: {
        policies: [],
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/root-files/:subDirectory/:subdir2/:fileName',
      handler: 'api::custom-upload.custom-upload.getBaseFiles',
        config: {
        policies: [],
        auth: false,
      },
    },
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
