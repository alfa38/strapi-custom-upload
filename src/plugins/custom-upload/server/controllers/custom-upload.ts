import { Strapi } from '@strapi/strapi';
import * as fileSystem from 'fs';
import koa from 'koa';
export default {
  getBaseFiles(ctx: koa.Request) {
    try {
      const filePath = ctx.url.split('/').splice(3).join('/').split('?')[0];
      console.log('F', filePath);
      const content = fileSystem.readFileSync(`${strapi.dirs.app.root}/files/${filePath}`, 'binary');
      ctx.res.writeHead(200, {'Content-Type': 'image/bmp'});
      ctx.res.write(content, 'binary');
    }
    catch (err) {
      console.log(err);
      throw(505);
    }
  },
};
