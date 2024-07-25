import {
    RequestContext, HttpMethod, ServerConfiguration,
} from 'roadmap-client-api';

class RoadmapServerConfiguration<T extends { [key: string]: string }> extends ServerConfiguration<T> {
    requestURL: string;

    varConfig: T;

    constructor(url: string, variableConfiguration: T) {
        super(url, variableConfiguration);

        this.requestURL = url;
        this.varConfig = variableConfiguration;
    }

    public makeRequestContext(endpoint: string, httpMethod: HttpMethod): RequestContext {
        const requestContext = new RequestContext(this.getRequestURL() + endpoint, httpMethod);
        requestContext.setHeaderParam('Access-Control-Allow-Origin', '*');

        return requestContext;
    }

    private getRequestURL() {
        let replacedUrl = this.requestURL;

        Object.keys(this.varConfig).forEach((key) => {
            const re = new RegExp(`{${key}}`, 'g');
            replacedUrl = replacedUrl.replace(re, this.varConfig[key]);
        });

        return replacedUrl;
    }
}

export default RoadmapServerConfiguration;
