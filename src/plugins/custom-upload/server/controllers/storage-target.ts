// @ts-nocheck

import { Strapi } from '@strapi/strapi';
import { IRequest } from './types';
import { getFirstEntry} from './utils';

export default {
  getCurrentTarget: async () => {
    let currentTarget = await getFirstEntry('plugin::custom-upload.target-link'); // should be only one entry
    if (currentTarget && currentTarget.selection === null) {
      const firstTarget = await getFirstEntry('plugin::custom-upload.custom-upload');
      await strapi.entityService.update("plugin::custom-upload.target-link", currentTarget.id, {data: { selection: firstTarget?.name}}); // it doesnt' want to see proper type here, no matter what i'am doing => see issue https://github.com/strapi/strapi/issues/18784
      return firstTarget;
    }

    if (!currentTarget) {
      const firstTarget = (await getFirstEntry('plugin::custom-upload.custom-upload')); // strapi entity service output resulting types as AnyType || null, seems fixed in strapi 5.
      await strapi.entityService.create("plugin::custom-upload.target-link", {data: { selection: firstTarget?.name}});
      return firstTarget;
    }
    return currentTarget.selection;
  },
  setCurrentTarget: async (ctx: IRequest) => {
    let currentTarget = await getFirstEntry('plugin::custom-upload.target-link');
    if (!currentTarget) {
      await strapi.entityService.create("plugin::custom-upload.target-link", {data: { selection: ctx.params.target}});
    } else {
      await strapi.entityService.update("plugin::custom-upload.target-link", currentTarget.id, {data: { selection: ctx.params.target}});
    }
    return ctx.params.target;
  },
}
