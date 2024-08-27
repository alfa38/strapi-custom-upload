export default ({ env }) => ({

  // 'upload-to-destination': {
  //   enabled: true,
  //   resolve: './src/plugins/upload-to-destination'
  // },
  upload: {
    config: {
      provider: 'strapi-provider-upload-custom', // For community providers pass the full package name (e.g. provider: 'strapi-provider-upload-google-cloud-storage')
      providerOptions: {
        maxSizeLimit: 600,
        rootPath: 'files/',
        uploadDir: 'images',
      },
      // providerOptions: {
      //   accessKeyId: env('AWS_ACCESS_KEY_ID'),
      //   secretAccessKey: env('AWS_ACCESS_SECRET'),
      //   region: env('AWS_REGION'),
      //   params: {
      //     ACL: env('AWS_ACL', 'public-read'), // 'private' if you want to make the uploaded files private
      //     Bucket: env('AWS_BUCKET'),
      //   },
      // },
      // providerOptions: {
      //   rootParam: 'uploads',
      // }
    },
  },
  'custom-upload': {
    enabled: true,
    resolve: './src/plugins/custom-upload'
  },

});
