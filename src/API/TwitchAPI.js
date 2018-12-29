import axios from 'axios';
import { TWITCH_API_BASE_URL, TWITCH_APP_KEY } from '../Utils/Constants';
// https://api.twitch.tv/helix/streams?game_id=33214
axios.defaults.headers.common['Client-ID'] = TWITCH_APP_KEY;

export class TwitchAPI {
    
    getTwitchStreams(searchTwitchBy = "") {
        let params = {
          
        };
        if (searchTwitchBy)
            params.searchTwitchBy = searchTwitchBy;
        return axios.get(TWITCH_API_BASE_URL, { params });
    }
}

export default TwitchAPI