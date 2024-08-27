export default  {
  routes: [
    {
      method: 'GET',
      path: '/count/plus/get/:number1/:number2',
      handler: 'api::product.calculator.combineNumbers', // or 'plugin::plugin-name.controllerName.functionName' for a plugin-specific controller
      config: {
        middlewares: [(ctx, next) => {
          return next();
        }],
        auth: false,
      },
    },
    {
      method: 'POST',
      path: '/count/plus/post',
      handler: 'api::product.calculator.combineNumbers', // or 'plugin::plugin-name.controllerName.functionName' for a plugin-specific controller
      config: {
        middlewares: [(ctx, next) => {
          return next();
        }],
        auth: false,
      },
    },
  ],
};