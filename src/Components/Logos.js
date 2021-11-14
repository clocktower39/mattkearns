import React from "react";
import { Grid } from '@mui/material'
import bitcoin_logo from "../img/logos/bitcoin_logo.svg";
import bootstrap_logo from "../img/logos/bootstrap_logo.svg";
import css_logo from "../img/logos/css_logo.svg";
import ethereum_logo from "../img/logos/ethereum_logo.svg";
import git_logo from "../img/logos/git_logo.svg";
import github_logo from "../img/logos/github_logo.svg";
import heroku_logo from "../img/logos/heroku_logo.svg";
import html5_logo from "../img/logos/html5_logo.svg";
import mongodb_logo from "../img/logos/mongodb_logo.svg";
import nodejs_logo from "../img/logos/nodejs_logo.svg";
import php_logo from "../img/logos/php_logo.svg";
import postman_logo from "../img/logos/postman_logo.svg";
import python_logo from "../img/logos/python_logo.svg";
import raspberrypi_logo from "../img/logos/raspberrypi_logo.svg";
import reactjs_logo from "../img/logos/reactjs_logo.svg";
import redux_logo from "../img/logos/redux_logo.svg";
import socketio_logo from "../img/logos/socketio_logo.svg";
import visualstudio_logo from "../img/logos/visualstudio_logo.svg";

export default function Logos() {
  const logos = [
    bitcoin_logo,
    bootstrap_logo,
    css_logo,
    ethereum_logo,
    git_logo,
    github_logo,
    heroku_logo,
    html5_logo,
    mongodb_logo,
    nodejs_logo,
    php_logo,
    postman_logo,
    python_logo,
    raspberrypi_logo,
    reactjs_logo,
    redux_logo,
    socketio_logo,
    visualstudio_logo,
  ];
  return logos.map((logo) => (
    <Grid container item xs={2} style={{alignContent: 'center'}}>
      <Grid item xs={12}>
        <img src={logo} style={{maxWidth: "100%", }} alt={"Logo"} />
      </Grid>
    </Grid>
  ));
}
