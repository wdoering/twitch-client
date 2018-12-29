import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import GridStreams from './Components/GridStreams';
import TopAppBar from './Components/TopAppBar';
import TwitchAPI from './API/TwitchAPI';
import { deepPurple } from '@material-ui/core/colors';
import VideoPlayer from './Components/VideoPlayer/VideoPlayer';
import { MAX_VIDEOS_COUNT_KEY } from './Utils/Constants';

const deepPurplePalette = createMuiTheme({
  palette: {
    primary: deepPurple,
    secondary: grey,
  },
  typography: {
    "fontFamily": "\"Roboto\", \"Arial\", \"Helvetica\", sans-serif",
    "fontWeightLight": 300,
    "fontWeightRegular": 400,
    "fontWeightMedium": 500,
  }
});


class App extends Component {
  constructor(props) {
    super(props);
    this.handleStreamClick = this.handleStreamClick.bind(this);

    this.state = {
      selectedStream: null,
      loading: false,
      tileData: []
    };
  }
  handleStreamClick = (oStream) => {
    this.setState({ selectedStream: oStream });
  }
  componentDidMount = () => {
    const twAPI = new TwitchAPI();
    twAPI.getTwitchStreams(undefined, localStorage.getItem(MAX_VIDEOS_COUNT_KEY)).then((response) => {
      this.setState({ tileData: response.data.data });

    }).catch((error) => {
      console.log(error);

    });
  }

  render() {
    return (
      <MuiThemeProvider theme={deepPurplePalette}>
        <div className="App">
          <TopAppBar></TopAppBar>
          {
            (this.state.tileData.length > 0 && !this.state.selectedStream) ?
              <GridStreams tileData={this.state.tileData} handleStreamClick={this.handleStreamClick}></GridStreams>
              :
              <VideoPlayer selectedStream={this.state.selectedStream}></VideoPlayer>
          }
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
