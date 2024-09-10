"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
exports.default = {
    getCurrentTarget: async () => {
        let currentTarget = await (0, utils_1.getFirstEntry)('plugin::custom-upload.target-link'); // should be only one entry
        if (currentTarget && currentTarget.selection === null) {
            const firstTarget = await (0, utils_1.getFirstEntry)('plugin::custom-upload.custom-upload');
            await strapi.entityService.update("plugin::custom-upload.target-link", currentTarget.id, { data: { selection: firstTarget === null || firstTarget === void 0 ? void 0 : firstTarget.name } }); // it doesnt' want to see proper type here, no matter what i'am doing => see issue https://github.com/strapi/strapi/issues/18784
            return firstTarget;
        }
        if (!currentTarget) {
            const firstTarget = (await (0, utils_1.getFirstEntry)('plugin::custom-upload.custom-upload')); // strapi entity service output resulting types as AnyType || null, seems fixed in strapi 5.
            await strapi.entityService.create("plugin::custom-upload.target-link", { data: { selection: firstTarget === null || firstTarget === void 0 ? void 0 : firstTarget.name } });
            return firstTarget;
        }
        return currentTarget.selection;
    },
    setCurrentTarget: async (ctx) => {
        let currentTarget = await (0, utils_1.getFirstEntry)('plugin::custom-upload.target-link');
        if (!currentTarget) {
            await strapi.entityService.create("plugin::custom-upload.target-link", { data: { selection: ctx.params.target } });
        }
        else {
            await strapi.entityService.update("plugin::custom-upload.target-link", currentTarget.id, { data: { selection: ctx.params.target } });
        }
        return ctx.params.target;
    },
};
