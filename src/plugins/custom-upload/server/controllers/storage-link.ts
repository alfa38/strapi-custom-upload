import _ from 'lodash';

export default {
  getAllTargets: async () => {
    let targets = _.clone(await strapi.db.query('plugin::custom-upload.custom-upload').findMany()).map((target) => target.name);
    return targets;
  }
}
