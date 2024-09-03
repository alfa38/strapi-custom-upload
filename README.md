list the provider direct path into packcage.json:

"strapi-provider-custom-upload": "file:providers/strapi-provider-custom-upload/"

then add it into server/plugins.ts like this

upload: {
    config: {
      provider: 'strapi-provider-custom-upload', // For community providers pass the full package name (e.g. provider: 'strapi-provider-upload-google-cloud-storage')
      providerOptions: {
        maxSizeLimit: 600,
        rootPath: 'files/',
        uploadDir: 'images',
      },
	  }
	}
	
for plugin - add something like this into same file

'custom-upload': {
    enabled: true,
    resolve: './src/plugins/custom-upload'
  },
}


you need to build both plugin and provider from ts, for them to work if you'll made any changes (yarn run build)

then to apply changes into provider => yarn install to apply provider module
