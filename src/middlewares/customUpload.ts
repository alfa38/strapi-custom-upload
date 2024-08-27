/**
 * `customUpload` middleware
 */

import { Strapi } from "@strapi/strapi";
import koaStatic from "koa-static";

export default (config, { strapi }: { strapi: Strapi }) => {
  strapi.server.routes([
    {
      method: "GET",
      path: '/((?!files/).+)',
      handler: koaStatic(`${strapi.dirs.app.root}\\files`, {
        maxage: config.maxage,
        defer: true,
        hidden: false,
      }),
      config: { auth: false },
    },
  ]);
};
