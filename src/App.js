import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import GridStreams from './Components/GridStreams';
import LinearProgress from '@material-ui/core/LinearProgress';
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
    this.handleStreamSearch = this.handleStreamSearch.bind(this);
    this.handleMaxVideosCount = this.handleMaxVideosCount.bind(this);
    this.delayTimer = null;
    this.nMaxTimeout = 400;
    let nInitialCountValue = 2;
    const nMaxVideosCount = localStorage.getItem("maxVideosCount");
    if (nMaxVideosCount)
      nInitialCountValue = nMaxVideosCount;

    this.state = {
      selectedStream: null,
      loading: false,
      tileData: [],
      searchValue: "",
      maxVideosCount: nInitialCountValue
    };
  }

  handleStreamClick = (oStream) => {
    this.setState({ selectedStream: oStream });
  }

  handleMaxVideosCount(event) {

    localStorage.setItem("maxVideosCount", event.target.value);
    this.setState({
      maxVideosCount: event.target.value
    });
    const twAPI = new TwitchAPI();

    twAPI.getTwitchStreams(event.target.value).then((response) => {
      this.setState({ loading: false, tileData: response.data.data });
    }).catch((error) => {

      this.setState({ loading: false });
      console.log(error);

    });
  }

  handleStreamSearch = (event) => {

    clearTimeout(this.delayTimer);
    this.setState({ loading: true });
    const twAPI = new TwitchAPI();

    let sSearchValue = event.target.value;


    this.delayTimer = setTimeout(() => {

      twAPI.getTwitchStreams(this.state.maxVideosCount, sSearchValue).then((response) => {
        this.setState({ loading: false, tileData: response.data.data });
      }).catch((error) => {

        this.setState({ loading: false });
        console.log(error);

      });

    }, this.nMaxTimeout);

  }

  componentDidMount = () => {
    this.setState({ loading: true });
    const twAPI = new TwitchAPI();
    twAPI.getTwitchStreams(localStorage.getItem(MAX_VIDEOS_COUNT_KEY)).then((response) => {
      this.setState({ loading: false, tileData: response.data.data });

    }).catch((error) => {
      this.setState({ loading: false });
      console.log(error);

    });
  }

  render() {
    return (
      <MuiThemeProvider theme={deepPurplePalette}>
        <div className="App">
          <TopAppBar handleStreamSearch={this.handleStreamSearch} handleMaxVideosCount={this.handleMaxVideosCount} maxVideosCount={this.state.maxVideosCount}></TopAppBar>
          {(this.state.loading) ? <LinearProgress /> : null}

          {

            (this.state.tileData.length > 0 && !this.state.selectedStream) ?
              <GridStreams tileData={this.state.tileData} handleStreamClick={this.handleStreamClick}></GridStreams>
              : (!!this.state.selectedStream) ? <VideoPlayer selectedStream={this.state.selectedStream}></VideoPlayer> : "Nenhum conteúdo disponível :("

          }
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
