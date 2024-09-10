declare module '@strapi/design-system/*';
declare module '@strapi/design-system';
declare module '@strapi/icons';
declare module '@strapi/icons/*';
declare module '@strapi/helper-plugin';

export interface PluginCustomUploadCustomUpload extends Schema.CollectionType {
  collectionName: 'target-link';
  info: {
    name: 'target-link';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  attributes: {
    id: ID,
    selection: string,
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
  };
}
declare module '@strapi/content-type' {
  export module Shared {
    export interface ContentTypes {
      // 'admin::permission': AdminPermission;
      // 'admin::user': AdminUser;
      // 'admin::role': AdminRole;
      // 'admin::api-token': AdminApiToken;
      // 'admin::api-token-permission': AdminApiTokenPermission;
      // 'admin::transfer-token': AdminTransferToken;
      // 'admin::transfer-token-permission': AdminTransferTokenPermission;
      // 'plugin::upload.file': PluginUploadFile;
      // 'plugin::upload.folder': PluginUploadFolder;
      // 'plugin::content-releases.release': PluginContentReleasesRelease;
      // 'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      // 'plugin::custom-upload.custom-upload': PluginCustomUploadCustomUpload;
      // 'plugin::custom-upload.target-link': PluginCustomUploadTargetLink;
      // 'plugin::i18n.locale': PluginI18NLocale;
      // 'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      // 'plugin::users-permissions.role': PluginUsersPermissionsRole;
      // 'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'plugin::custom-upload.target-link': PluginCustomUploadCustomUpload;
    }
  }
}
