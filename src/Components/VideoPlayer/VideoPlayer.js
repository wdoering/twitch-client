import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import InfoIcon from '@material-ui/icons/Info';
import Visibility from '@material-ui/icons/Visibility';
import PersonPin from '@material-ui/icons/PersonPin';



const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    icon: {
        color: 'red',
        // color: 'rgba(255, 255, 255, 0.54)',
    },
});
class VideoPlayer extends Component {
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
        const { classes } = this.props;
        const { selectedStream } = this.props;

        let player;
        if (selectedStream) {
            const uri = 'http://player.twitch.tv/?channel=' + selectedStream.user_name;
            player = (
                <div>

                    <div>

                        <iframe
                            title={selectedStream.user_name}
                            src={uri}
                            height='500px' // height='100%' makes it very small
                            width='100%'
                            allowFullScreen='true'
                            frameBorder='0'
                        ></iframe>
                    </div>
                    <div>
                        <Grid container spacing={24}>
                            <Grid item xs={12}>
                                <Paper className={classes.paper}>

                                    <Typography>{selectedStream.title}</Typography>
                                    <br></br>
                                    <Visibility className={classes.icon} />
                                    <Typography>{selectedStream.viewer_count}</Typography>

                                </Paper>
                            </Grid>

                        </Grid>

                    </div>
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
export default withStyles(styles)(VideoPlayer);