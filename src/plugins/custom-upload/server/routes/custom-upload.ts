export default  {
  routes: [
    {
      method: 'GET',
      path: '/root-files/:subDirectory/:fileName',
      handler: 'plugin::custom-upload.custom-upload.getBaseFiles',
        config: {
        policies: [],
        auth: false,
      },
    },
  ],
};

