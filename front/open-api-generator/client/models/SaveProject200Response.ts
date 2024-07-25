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

import { ProjectConfigModel } from '../models/ProjectConfigModel';
import { HttpFile } from '../http/http';

/**
* JSON object containing the saved project config
*/
export class SaveProject200Response {
    'projectKey': string;
    'startDate': string;
    'dueDate': string;

    static readonly discriminator: string | undefined = undefined;

    static readonly attributeTypeMap: Array<{name: string, baseName: string, type: string, format: string}> = [
        {
            "name": "projectKey",
            "baseName": "projectKey",
            "type": "string",
            "format": ""
        },
        {
            "name": "startDate",
            "baseName": "startDate",
            "type": "string",
            "format": ""
        },
        {
            "name": "dueDate",
            "baseName": "dueDate",
            "type": "string",
            "format": ""
        }    ];

    static getAttributeTypeMap() {
        return SaveProject200Response.attributeTypeMap;
    }

    public constructor() {
    }
}

