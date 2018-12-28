import axios from 'axios';
import { TWITCH_API_BASE_URL } from '../Utils/Constants';

// https://api.twitch.tv/helix/streams?game_id=33214

export class TwitchAPI {

    getAllTwitch(searchTwitchBy = "") {
        let params = {};
        if (searchTwitchBy)
            params.searchTwitchBy = searchTwitchBy;
        return axios.get(TWITCH_API_BASE_URL, { params });
    }
}

export default TwitchAPI