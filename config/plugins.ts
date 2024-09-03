export default ({ env }) => ({

  // 'upload-to-destination': {
  //   enabled: true,
  //   resolve: './src/plugins/upload-to-destination'
  // },
  upload: {
    config: {
      provider: 'strapi-provider-custom-upload', // For community providers pass the full package name (e.g. provider: 'strapi-provider-upload-google-cloud-storage')
      providerOptions: {
        maxSizeLimit: 600,
        rootPath: 'files/',
        uploadDir: 'images',
      },
    },
  },
  'custom-upload': {
    enabled: true,
    resolve: './src/plugins/custom-upload'
  },

});
