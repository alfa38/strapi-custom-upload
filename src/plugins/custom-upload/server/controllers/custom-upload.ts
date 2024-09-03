import { Strapi } from '@strapi/strapi';
import * as fileSystem from 'fs';
import koa from 'koa';
export default {
  getBaseFiles(ctx: koa.Request) {
    try {
      let content: any = 1;
      const filePath = ctx.url.split('/').splice(3).join('/').split('?')[0];
      content = fileSystem.readFileSync(`${strapi.dirs.app.root}/${filePath}`, 'binary');
      ctx.res.writeHead(200, {'Content-Type': 'image/bmp'});
      ctx.res.write(content, 'binary');
    }
    catch (err) {
      console.log(err);
      throw(505);
    }
  },
};

// getBaseFiles: async (ctx, next) => {
//   try {
//     const files = await strapi.query('plugin::upload.file').findMany({
//       where: {
//         folderPath: {
//           $eqi: '/'
//         }
//       },
//     });
//     ctx.body = files;
//   } catch (err) {
//     ctx.body = err;
//   }
// },


// getOne: async (ctx, next) => {
//   try {
//     const { folderName } = ctx.params;
//     const folder = await strapi.query("plugin::upload.folder").findOne({
//       where: {
//         name: {
//           $eqi: folderName,
//         },
//       },
//       populate: ["files", "children"],
//     });
//     if (folder) {
//       ctx.body = folder;
//     } else {
//       ctx.assert({}, 404);
//     }
//   } catch (err) {
//    console.log(err);
//   }
// },
