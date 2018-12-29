import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class VideoPlayer extends Component {
    static propTypes = {
        prop: PropTypes
    }

  /**
   * 
   *  {
        "id": "31883882864",
        "user_id": "39298218",
        "user_name": "dakotaz",
        "game_id": "33214",
        "community_ids": [],
        "type": "live",
        "title": "TSM Dakotaz - use code \"dakotaz\" in itemshop!",
        "viewer_count": 30012,
        "started_at": "2018-12-28T09:43:54Z",
        "language": "en",
        "thumbnail_url": "https://static-cdn.jtvnw.net/previews-ttv/live_user_dakotaz-{width}x{height}.jpg",
        "tag_ids": [
            "6ea6bca4-4712-4ab9-a906-e3336a9d8039"
        ]
    },
   */
    render() {
        const { selectedStream } = this.props;
        console.log(selectedStream)
        let player;
        if (selectedStream) {
            const uri = 'http://player.twitch.tv/?channel=' + selectedStream.user_name;
            player = (
                <div>
                    {/* <span className="close-icon" onClick={this.handleCloseStream}></span> */}
                    <iframe
                    title={selectedStream.user_name}
                        src={uri}
                        height='500px' // height='100%' makes it very small
                        width='100%'
                        allowFullScreen='true'
                        frameBorder='0'
                    ></iframe>
                </div>
            )
        } else {
            player = (<div></div>)
        }
        return (
            <div>
                {player}
            </div>
        )
    }
}
