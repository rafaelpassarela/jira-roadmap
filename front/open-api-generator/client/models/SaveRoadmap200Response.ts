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

import { IssueModelListListInner } from '../models/IssueModelListListInner';
import { RoadmapModel } from '../models/RoadmapModel';
import { RoadmapModelSharesInner } from '../models/RoadmapModelSharesInner';
import { HttpFile } from '../http/http';

/**
* JSON object containing the saved Roadmap
*/
export class SaveRoadmap200Response {
    'guid': string;
    'name': string;
    'description': string;
    'startDate': string;
    'endDate': string;
    'active': boolean;
    /**
    * 0 - Owner, 1 - Editor, 2 - Viewer
    */
    'level'?: number;
    'issues'?: Array<IssueModelListListInner>;
    'shares': Array<RoadmapModelSharesInner>;

    static readonly discriminator: string | undefined = undefined;

    static readonly attributeTypeMap: Array<{name: string, baseName: string, type: string, format: string}> = [
        {
            "name": "guid",
            "baseName": "guid",
            "type": "string",
            "format": ""
        },
        {
            "name": "name",
            "baseName": "name",
            "type": "string",
            "format": ""
        },
        {
            "name": "description",
            "baseName": "description",
            "type": "string",
            "format": ""
        },
        {
            "name": "startDate",
            "baseName": "start_date",
            "type": "string",
            "format": ""
        },
        {
            "name": "endDate",
            "baseName": "end_date",
            "type": "string",
            "format": ""
        },
        {
            "name": "active",
            "baseName": "active",
            "type": "boolean",
            "format": ""
        },
        {
            "name": "level",
            "baseName": "level",
            "type": "number",
            "format": ""
        },
        {
            "name": "issues",
            "baseName": "issues",
            "type": "Array<IssueModelListListInner>",
            "format": ""
        },
        {
            "name": "shares",
            "baseName": "shares",
            "type": "Array<RoadmapModelSharesInner>",
            "format": ""
        }    ];

    static getAttributeTypeMap() {
        return SaveRoadmap200Response.attributeTypeMap;
    }

    public constructor() {
    }
}

