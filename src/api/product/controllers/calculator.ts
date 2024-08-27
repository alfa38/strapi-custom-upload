/**
 * A set of functions called "actions" for `calculator`
 */

export default {
  combineNumbers(ctx, boundDispatch) {
    const body = ctx.request.body;
    // const num = strapi.service('api::product.calculate').calculatePlus(body.num1, body.num2);
    const num = strapi.dirs;

    return num;
  }
};
