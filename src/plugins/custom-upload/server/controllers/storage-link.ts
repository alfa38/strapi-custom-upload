import { Strapi } from "@strapi/strapi";
export default {
  getAllTargets: async () => {
    let targets = (await strapi.entityService.findMany('plugin::custom-upload.custom-upload'));
    if (targets === null) {
      return [];
    }
    return targets.map((target) => target.name);
  }
}
