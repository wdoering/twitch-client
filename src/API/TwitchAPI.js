import axios from 'axios';
import { TWITCH_API_BASE_URL, TWITCH_APP_KEY, GAMES_ENDPOINT, STREAMS_ENDPOINT } from '../Utils/Constants';



axios.defaults.headers.common['Client-ID'] = TWITCH_APP_KEY;

export class TwitchAPI {

    getGames(sGameName) {
        let params = {
        };

        if (sGameName)
            params.name = sGameName;

        return axios.get(TWITCH_API_BASE_URL + GAMES_ENDPOINT, { params });
    }
    /**
     * 
     * @param {number} nId Get Current Stream Information
     */
    getStreamInfoById(nId) {
        let params = {
            user_id: nId
        };

        return axios.get(TWITCH_API_BASE_URL + STREAMS_ENDPOINT, { params });
    }


    /**
     * 
     * @param {string} searchUserLogin search works by passing the exact login name of the streamer
     * @param {number} nMaxListSize max number of channels desired
     */
    getTwitchStreams(nMaxListSize, searchUserLogin = "") {
        let params = {

        };

        if (nMaxListSize)
            params.first = nMaxListSize;

        if (searchUserLogin)
            params.user_login = searchUserLogin;

        return axios.get(TWITCH_API_BASE_URL + STREAMS_ENDPOINT, { params });
    }
}

export default TwitchAPI