"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    "kind": "collectionType",
    "collectionName": "storage_links",
    "info": {
        "singularName": "custom-upload",
        "pluralName": "storage-links",
        "displayName": "storage-link"
    },
    "options": {
        "draftAndPublish": false,
        "comment": ""
    },
    "attributes": {
        "name": {
            "type": "text"
        },
        "link": {
            "type": "text"
        },
        "description": {
            "type": "text"
        }
    }
};
