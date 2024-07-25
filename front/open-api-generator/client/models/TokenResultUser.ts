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

import { UserModel } from '../models/UserModel';
import { HttpFile } from '../http/http';

export class TokenResultUser {
    'guid': string;
    'name': string;
    'email': string;
    'avatarUrl': string;
    'jiraAccountType': string;
    'hasJiraToken'?: boolean;
    'tokenJira': string;

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
            "name": "email",
            "baseName": "email",
            "type": "string",
            "format": ""
        },
        {
            "name": "avatarUrl",
            "baseName": "avatarUrl",
            "type": "string",
            "format": ""
        },
        {
            "name": "jiraAccountType",
            "baseName": "jira_accountType",
            "type": "string",
            "format": ""
        },
        {
            "name": "hasJiraToken",
            "baseName": "has_jira_token",
            "type": "boolean",
            "format": ""
        },
        {
            "name": "tokenJira",
            "baseName": "token_jira",
            "type": "string",
            "format": ""
        }    ];

    static getAttributeTypeMap() {
        return TokenResultUser.attributeTypeMap;
    }

    public constructor() {
    }
}

