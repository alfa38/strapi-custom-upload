import { Schema } from '@strapi/strapi';
import storageSchema from './storage-link'

export default {
  'custom-upload': {
    schema: storageSchema,
  }
};
