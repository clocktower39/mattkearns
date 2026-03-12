import React from "react";
import { Box, Container, Tab, Tabs } from "@mui/material";

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
  logoSection: {
    padding: "22px",
    borderRadius: "18px",
    background:
      "radial-gradient(200px 200px at 12% 12%, rgba(115, 217, 13, 0.18), transparent 60%)," +
      "radial-gradient(240px 240px at 85% 18%, rgba(85, 120, 160, 0.25), transparent 60%)," +
      "radial-gradient(260px 260px at 40% 90%, rgba(115, 217, 13, 0.12), transparent 60%)," +
      "#0f141a",
    boxShadow: "0 18px 50px rgba(0, 0, 0, 0.45)",
  },
  logoControls: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "16px",
  },
  logoTabs: {
    borderRadius: "12px",
    background: "rgba(255, 255, 255, 0.04)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    flex: "1 1 auto",
    minWidth: "220px",
  },
  tabsRoot: {
    "& .MuiTabs-indicator": {
      backgroundColor: "#73d90d",
      height: "3px",
      borderRadius: "3px",
    },
  },
  tab: {
    color: "rgba(255, 255, 255, 0.7)",
    fontWeight: 600,
    textTransform: "none",
    "&.Mui-selected": {
      color: "#ffffff",
    },
  },
  logoMosaic: {
    columnCount: 4,
    columnGap: "16px",
    "@media (max-width: 900px)": {
      columnCount: 3,
    },
    "@media (max-width: 700px)": {
      columnCount: 2,
    },
    "@media (max-width: 500px)": {
      columnCount: 1,
    },
  },
  logoItem: {
    breakInside: "avoid",
    margin: "0 0 16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "14px",
    background: "rgba(255, 255, 255, 0.06)",
    boxShadow:
      "0 1px 0 rgba(255, 255, 255, 0.08) inset, 0 12px 22px rgba(0, 0, 0, 0.35)",
    transition: "transform 200ms ease, filter 200ms ease, box-shadow 200ms ease",
    "@media (max-width: 500px)": {
      marginBottom: "12px",
    },
    "&:hover": {
      transform: "translateY(-3px)",
      boxShadow:
        "0 1px 0 rgba(255, 255, 255, 0.18) inset, 0 18px 32px rgba(0, 0, 0, 0.5)",
    },
    "&:hover img": {
      filter: "grayscale(0) contrast(1.1) brightness(1.2)",
      transform: "translateY(-3px) scale(1.2)",
    },
  },
  logoItemSm: { height: "54px" },
  logoItemMd: { height: "70px" },
  logoItemLg: { height: "90px" },
  logoImg: {
    width: "auto",
    height: "auto",
    filter: "grayscale(0.15) contrast(1.1) brightness(1.15)",
    transition: "transform 2s ease, filter 200ms ease",
  },
  logoImgSm: { maxHeight: "36px", maxWidth: "90px" },
  logoImgMd: { maxHeight: "44px", maxWidth: "100px" },
  logoImgLg: { maxHeight: "58px", maxWidth: "120px" },
})

export default function Logos() {
  const classes = styles();
  const logos = [
    { src: "/img/logos/javascript_logo.svg", category: "Frontend" },
    { src: "/img/logos/ts-logo.svg", category: "Frontend" },
    { src: "/img/logos/reactjs_logo.svg", category: "Frontend" },
    { src: "/img/logos/redux_logo.svg", category: "Frontend" },
    { src: "/img/logos/mui_logo.svg", category: "Frontend" },
    { src: "/img/logos/html5_logo.svg", category: "Frontend" },
    { src: "/img/logos/css_logo.svg", category: "Frontend" },
    { src: "/img/logos/figma_logo.svg", category: "Frontend" },
    { src: "/img/logos/wordpress_logo.svg", category: "Frontend" },
    { src: "/img/logos/nodejs_logo.svg", category: "Backend" },
    { src: "/img/logos/python_logo.svg", category: "Backend" },
    { src: "/img/logos/php_logo.svg", category: "Backend" },
    { src: "/img/logos/mongodb_logo.svg", category: "Backend" },
    { src: "/img/logos/postgresql-logo.svg", category: "Backend" },
    { src: "/img/logos/socketio_logo.svg", category: "Backend" },
    { src: "/img/logos/jwt_logo.svg", category: "Backend" },
    { src: "/img/logos/postman_logo.svg", category: "Backend" },
    { src: "/img/logos/git_logo.svg", category: "Infra" },
    { src: "/img/logos/heroku_logo.svg", category: "Infra" },
    { src: "/img/logos/raspberrypi_logo.svg", category: "Infra" },
    { src: "/img/logos/visualstudio_logo.svg", category: "Infra" },
    { src: "/img/logos/docker_logo.svg", category: "Infra" },
    { src: "/img/logos/amazon_web_services_logo.svg", category: "Infra" },
    { src: "/img/logos/cloudflare_logo.svg", category: "Infra" },
    { src: "/img/logos/letsencrypt_logo.svg", category: "Infra" },
    { src: "/img/logos/linux_logo.svg", category: "Infra" },
    { src: "/img/logos/archlinux_logo.svg", category: "Infra" },
    { src: "/img/logos/manjaro_logo.svg", category: "Infra" },
    { src: "/img/logos/debian_logo.svg", category: "Infra" },
    { src: "/img/logos/nginx_logo.svg", category: "Infra" },
    { src: "/img/logos/home_assistant_logo.svg", category: "Misc" },
    { src: "/img/logos/plex_logo.svg", category: "Misc" },
    { src: "/img/logos/frigate_logo.svg", category: "Misc" },
    { src: "/img/logos/bitcoin_logo.svg", category: "Misc" },
    { src: "/img/logos/discord_logo.svg", category: "Misc" },
    { src: "/img/logos/fdroid_logo.svg", category: "Misc" },
    { src: "/img/logos/steampowered_logo.svg", category: "Misc" },
    { src: "/img/logos/torproject_logo.svg", category: "Misc" },
  ];

  const [active, setActive] = React.useState("All");
  const categories = ["All", "Frontend", "Backend", "Infra", "Misc"];
  const filtered = active === "All" ? logos : logos.filter((logo) => logo.category === active);

  return (
    <div style={classes.LogosContainer} >
      <Container maxWidth="md">
        <Box sx={classes.logoSection} aria-label="Technology logos">
          <Box sx={classes.logoControls}>
            <Box sx={classes.logoTabs}>
              <Tabs
                value={active}
                onChange={(event, value) => setActive(value)}
                variant="scrollable"
                scrollButtons="auto"
                sx={classes.tabsRoot}
              >
                {categories.map((category) => (
                  <Tab
                    key={category}
                    value={category}
                    label={category}
                    sx={classes.tab}
                  />
                ))}
              </Tabs>
            </Box>
          </Box>
          <Box sx={classes.logoMosaic}>
            {filtered.map((logo, index) => {
              const sizeClass =
                index % 7 === 0 ? "lg" : index % 3 === 0 ? "sm" : "md";
              const itemSize =
                sizeClass === "lg" ? classes.logoItemLg : sizeClass === "sm" ? classes.logoItemSm : classes.logoItemMd;
              const imgSize =
                sizeClass === "lg" ? classes.logoImgLg : sizeClass === "sm" ? classes.logoImgSm : classes.logoImgMd;
              return (
                <Box sx={[classes.logoItem, itemSize]} key={`${logo.src}-${index}`}>
                  <Box component="img" src={logo.src} alt="Logo" sx={[classes.logoImg, imgSize]} />
                </Box>
              );
            })}
          </Box>
        </Box>
      </Container>
    </div>
  );
}
