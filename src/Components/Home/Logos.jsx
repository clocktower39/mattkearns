import React from "react";
import { Container, Grid } from "@mui/material";

const styles = () => ({
  LogosContainer: {
    padding: "50px 0",
  },
  TitleContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "#73D90D",
    height: "75px",
    borderRadius: "0 50px 50px 0",
    paddingRight: "25px",
    marginBottom: '50px'
  },
  LogoContainer: { alignContent: "center", },
  LogoImg: { maxWidth: "100%", },
})

export default function Logos() {
  const classes = styles();
  const logos = [
    "/img/logos/javascript_logo.svg",
    "/img/logos/ts-logo.svg",
    "/img/logos/reactjs_logo.svg",
    "/img/logos/redux_logo.svg",
    "/img/logos/mui_logo.svg",
    "/img/logos/html5_logo.svg",
    "/img/logos/css_logo.svg",
    "/img/logos/nodejs_logo.svg",
    "/img/logos/python_logo.svg",
    "/img/logos/php_logo.svg",
    "/img/logos/mongodb_logo.svg",
    "/img/logos/postgresql-logo.svg",
    "/img/logos/socketio_logo.svg",
    "/img/logos/git_logo.svg",
    "/img/logos/heroku_logo.svg",
    "/img/logos/postman_logo.svg",
    "/img/logos/raspberrypi_logo.svg",
    "/img/logos/visualstudio_logo.svg",
    "/img/logos/jwt_logo.svg",
    "/img/logos/home_assistant_logo.svg",
    "/img/logos/plex_logo.svg",
    "/img/logos/frigate_logo.svg",
    "/img/logos/docker_logo.svg",
    "/img/logos/amazon_web_services_logo.svg",
    "/img/logos/wordpress_logo.svg",
    "/img/logos/bitcoin_logo.svg",
    "/img/logos/cloudflare_logo.svg",
    "/img/logos/discord_logo.svg",
    "/img/logos/fdroid_logo.svg",
    "/img/logos/figma_logo.svg",
    "/img/logos/letsencrypt_logo.svg",
    "/img/logos/linux_logo.svg",
    "/img/logos/archlinux_logo.svg",
    "/img/logos/manjaro_logo.svg",
    "/img/logos/debian_logo.svg",
    "/img/logos/nginx_logo.svg",
    "/img/logos/steampowered_logo.svg",
    "/img/logos/torproject_logo.svg",
  ];

  return (
    <div style={classes.LogosContainer} >
      <Container maxWidth="md">
        <Grid container spacing={2}>
          {logos.map((logo, index) => (
            <Grid
              container
              size={{ xs: 3, sm: 2 }}
              sx={classes.LogoContainer}
              key={`logo-${index}`}
            >
              <Grid size={12}>
                <img src={logo} style={classes.LogoImg} alt={"Logo"} />
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}
