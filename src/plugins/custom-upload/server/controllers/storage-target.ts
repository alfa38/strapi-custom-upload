// @ts-nocheck
import koa from 'koa';
import _ from 'lodash';

export default {
  getCurrentTarget: async () => {
    let currentTarget = _.clone(await strapi.db.query('plugin::custom-upload.target-link').findOne());
    if (currentTarget && currentTarget.selection === null) {
      await strapi.db.query('plugin::custom-upload.target-link').update({
        where: {
          id: currentTarget.id,
        },
        data: {
          selection: 'default',
        }
      })
      return 'default';
    }

    if (!currentTarget) {
      currentTarget = 'default';
      await strapi.db.query('plugin::custom-upload.target-link').create({
        data: {
          selection: 'default',
        }
      });
      return 'default';
    }
    return currentTarget.selection;
  },
  setCurrentTarget: async (ctx: koa.Request) => {
    console.log('CTX', ctx.params);
    let currentTarget = _.clone(await strapi.db.query('plugin::custom-upload.target-link').findOne());
    if (!currentTarget) {
      await strapi.db.query('plugin::custom-upload.target-link').create({
        data: {
          selection: ctx.params.target,
        }
      });
    } else {
      await strapi.db.query('plugin::custom-upload.target-link').update({
        where: {
          id: currentTarget.id,
        },
        data: {
          selection: ctx.params.target,
        }
      })
    }
    return ctx.params.target;
  },
}
