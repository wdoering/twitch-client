import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Visibility from '@material-ui/icons/Visibility';
import TwitchAPI from '../../API/TwitchAPI';
import PropTypes from 'prop-types';


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
        color: 'red'
    },
});
class VideoPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewersCount: this.props.selectedStream.viewer_count
        }
    }

    updateViewersCount() {
        const REFRESH_INTERVAL_SECONDS = 5000;
        if (this.props.selectedStream) {

            setInterval(() => {
                let twAPI = new TwitchAPI();

                twAPI.getStreamInfoById(this.props.selectedStream.user_id).then((response) => {
                    if (response.data.data[0]) // this is because twitch API always returns arrays, even if you pass the userID
                        this.setState({ viewersCount: response.data.data[0].viewer_count });
                });

            }, REFRESH_INTERVAL_SECONDS);
        }
    }

    componentDidMount() {
        this.updateViewersCount();
    }

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
                            height='600px' // height='100%' makes it very small
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
                                    <Typography>{this.state.viewersCount}</Typography>

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

VideoPlayer.propTypes = {
    selectedStream: PropTypes.object.isRequired
};

export default withStyles(styles)(VideoPlayer);