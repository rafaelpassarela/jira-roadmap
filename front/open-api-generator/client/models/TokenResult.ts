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

import { TokenResultUser } from '../models/TokenResultUser';
import { HttpFile } from '../http/http';

export class TokenResult {
    'accessToken': string;
    'tokenType': string;
    'expiration'?: string;
    'user': TokenResultUser;

    static readonly discriminator: string | undefined = undefined;

    static readonly attributeTypeMap: Array<{name: string, baseName: string, type: string, format: string}> = [
        {
            "name": "accessToken",
            "baseName": "access_token",
            "type": "string",
            "format": ""
        },
        {
            "name": "tokenType",
            "baseName": "token_type",
            "type": "string",
            "format": ""
        },
        {
            "name": "expiration",
            "baseName": "expiration",
            "type": "string",
            "format": ""
        },
        {
            "name": "user",
            "baseName": "user",
            "type": "TokenResultUser",
            "format": ""
        }    ];

    static getAttributeTypeMap() {
        return TokenResult.attributeTypeMap;
    }

    public constructor() {
    }
}

