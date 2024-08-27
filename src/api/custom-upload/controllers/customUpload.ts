// @ts-nocheck
import * as fileSystem from 'fs';
import koa from 'koa';
import { encode, decode } from 'js-base64';
export default {
  async getBaseFiles(ctx: koa.Request, boundDispatch, third) {
    try {
      let content: any = 1;
      const filePath = ctx.url.split('/').splice(3).join('/').split('?')[0];
      console.log('filePath', filePath);
      content = fileSystem.readFileSync(`${strapi.dirs.app.root}/files/${filePath}`, 'binary');
      // let a = strapi.query('plugin::custom-upload');
      // console.log(a);
      console.log(content);
      ctx.res.writeHead(200, {'Content-Type': 'image/bmp'});
      ctx.res.write(content, 'binary');
      // const resp: koa.Response;
      // resp.body = content;
      // resp.header
      // ctx.response.
      // ctx.body = content;
      // // encode(content);
      // console.log(content);
      // return content;
    }
    catch (err) {
      console.log(err);
      throw(505);
    }
  },
  // async getOne(ctx, boundDispatch) {
  //   try {
  //     const { folderName } = ctx.params;
  //     const folder = await strapi.query("plugin::upload.folder").findOne({
  //       where: {
  //         name: {
  //           $eqi: folderName,
  //         }
  //       },
  //       populate: ["files", "children"],
  //     })
  //     if (folder) {
  //       ctx.body = folder;
  //     } else {
  //       ctx.assert({}, 400);
  //     }
  //   }
  //   catch (err) {
  //     console.log(err);
  //   }
  // }
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
