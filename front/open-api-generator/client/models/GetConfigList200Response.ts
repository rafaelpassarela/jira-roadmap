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

import { ConfigList } from '../models/ConfigList';
import { ConfigListListInner } from '../models/ConfigListListInner';
import { HttpFile } from '../http/http';

/**
* JSON object with the list of configurations
*/
export class GetConfigList200Response {
    'list'?: Array<ConfigListListInner>;

    static readonly discriminator: string | undefined = undefined;

    static readonly attributeTypeMap: Array<{name: string, baseName: string, type: string, format: string}> = [
        {
            "name": "list",
            "baseName": "list",
            "type": "Array<ConfigListListInner>",
            "format": ""
        }    ];

    static getAttributeTypeMap() {
        return GetConfigList200Response.attributeTypeMap;
    }

    public constructor() {
    }
}

