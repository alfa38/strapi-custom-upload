export const getFirstEntry = async ( query: string ) => {
  const entries = await strapi.entityService.findMany(query as any); // returns array of entries only if there are more than one entry present
  if (!entries) return {};
  if (Array.isArray(entries)) {
    if (entries.length === 0) {
      return {};
    } else {
      return [0];
    }
  } 
  return entries;
}
