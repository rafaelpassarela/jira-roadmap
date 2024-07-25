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

import { RoadmapModelListListInner } from '../models/RoadmapModelListListInner';
import { HttpFile } from '../http/http';

export class RoadmapModelList {
    'list'?: Array<RoadmapModelListListInner>;

    static readonly discriminator: string | undefined = undefined;

    static readonly attributeTypeMap: Array<{name: string, baseName: string, type: string, format: string}> = [
        {
            "name": "list",
            "baseName": "list",
            "type": "Array<RoadmapModelListListInner>",
            "format": ""
        }    ];

    static getAttributeTypeMap() {
        return RoadmapModelList.attributeTypeMap;
    }

    public constructor() {
    }
}

