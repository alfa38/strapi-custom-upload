"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFirstEntry = void 0;
const getFirstEntry = async (query) => {
    const entries = await strapi.entityService.findMany(query); // returns array of entries only if there are more than one entry present
    if (!entries)
        return {};
    if (Array.isArray(entries)) {
        if (entries.length === 0) {
            return {};
        }
        else {
            return [0];
        }
    }
    return entries;
};
exports.getFirstEntry = getFirstEntry;
