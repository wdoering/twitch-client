import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: '100%',
    height: '100%',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
});


function TitlebarGridList(props) {

  const { classes } = props;

  return (
    <div className={classes.root}>

        <GridList cellHeight={180} cellWidth={290} className={classes.gridList}>

          {
            props.tileData.map(tile => (
              <GridListTile item xs={3} key={tile.id} onClick={() => props.handleStreamClick(tile)}>
                <img src={tile.thumbnail_url.replace("{width}", "290").replace("{height}", "180")} alt={tile.title} />
                <GridListTileBar
                  title={tile.title}
                  subtitle={<span>by: {tile.user_name}  ||  watchers: {tile.viewer_count}</span>}
                />
              </GridListTile>
            ))
          }
        </GridList>
    </div>
  );
}

TitlebarGridList.propTypes = {
  classes: PropTypes.object.isRequired,
  tileData: PropTypes.array.isRequired,
  handleStreamClick: PropTypes.func.isRequired
};

export default withStyles(styles)(TitlebarGridList);