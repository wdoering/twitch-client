import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    // width: 290,
    width: '100%',
    height: '100%',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
});




// import image from 'path/to/image.jpg';

function TitlebarGridList(props) {

  const { classes } = props;

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
  console.log(props);
  console.log((props.tileData[0]) ? props.tileData[0].thumbnail_url : "null");

  return (
    <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          <ListSubheader component="div">This subheader will probably not be used</ListSubheader>
        </GridListTile>
        {props.tileData.map(tile => (
          <GridListTile key={tile.id}>
            <img src={tile.thumbnail_url.replace("{width}","290").replace("{height}","180")} alt={tile.title} />
            <GridListTileBar
              title={tile.title}
              subtitle={<span>by: {tile.user_name}  ||  watchers: {tile.viewer_count}</span>}
              actionIcon={
                <IconButton className={classes.icon}>
                  <InfoIcon />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}

TitlebarGridList.propTypes = {
  classes: PropTypes.object.isRequired,
  tileData: PropTypes.object.isRequired,
};

export default withStyles(styles)(TitlebarGridList);