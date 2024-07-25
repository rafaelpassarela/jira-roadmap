import {
    SecurityAuthentication, TokenProvider,
} from 'roadmap-client-api';
import Cookies from 'js-cookie';

export type RoadmapAuthMethodsConfiguration = {
    "default"?: SecurityAuthentication;
    "bearerAuth"?: RoadmapHttpBearerConfiguration;
};

export type RoadmapHttpBearerConfiguration = { tokenProvider: RoadmapTokenProvider };

export class RoadmapTokenProvider implements TokenProvider {

    getToken(): string | Promise<string> {
        // let token = localStorage.getItem('Bearer');
        let token = Cookies.get('Bearer');

        return (token ? token : '');
    }

}
