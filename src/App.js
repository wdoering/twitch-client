import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import deepOrange from '@material-ui/core/colors/deepOrange';
import grey from '@material-ui/core/colors/grey';
import GridStreams from './Components/GridStreams';
import TopAppBar from './Components/TopAppBar';
import TwitchAPI from './API/TwitchAPI';
import { deepPurple } from '@material-ui/core/colors';

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
    this.state = {
      loading: false,
      tileData: []
    };
  }

  componentDidMount = () => {
    const twAPI = new TwitchAPI();
    twAPI.getTwitchStreams().then((response) => {
      this.setState({ tileData: response.data.data });
      console.log(response);

    }).catch((error) => {
      console.log(error);

    });
    console.log("Montou o App.js")

  }
  componentDidUpdate = () => {
    console.log("Atualizou o App.js")

  }

  render() {
    return (
      <MuiThemeProvider theme={deepPurplePalette}>
        <div className="App">
          <TopAppBar></TopAppBar>
          {

            (this.state.tileData.length > 0) ?

              <GridStreams tileData={this.state.tileData}>

              </GridStreams>

              :

              "Não há videos disponíveis, faça uma busca ou carregue 5" // colocar um paper pra ficar mais bonito
          }

        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
