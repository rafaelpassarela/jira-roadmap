/**
 * Roadmap for Jira API
 * Endpoint mapping for Roadmap for Jira App.
 *
 * OpenAPI spec version: 2.0
 * Contact: contact@mrrafael.ca
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { ConfigItem } from '../models/ConfigItem';
import { HttpFile } from '../http/http';

export class ConfigListListInner {
    'id': number;
    'key': string;
    'value': string;

    static readonly discriminator: string | undefined = undefined;

    static readonly attributeTypeMap: Array<{name: string, baseName: string, type: string, format: string}> = [
        {
            "name": "id",
            "baseName": "id",
            "type": "number",
            "format": ""
        },
        {
            "name": "key",
            "baseName": "key",
            "type": "string",
            "format": ""
        },
        {
            "name": "value",
            "baseName": "value",
            "type": "string",
            "format": ""
        }    ];

    static getAttributeTypeMap() {
        return ConfigListListInner.attributeTypeMap;
    }

    public constructor() {
    }
}

