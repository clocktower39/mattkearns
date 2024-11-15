import React, { useRef } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Grow,
  Typography,
} from "@mui/material";
import useOnScreen from "../../Hooks/useOnScreen";
import { projects } from "../../states";
import { theme } from "../../theme";

const styles = () => ({
  ProjectsContainer: { padding: "50px 0px", backgroundColor: "#1c1c1c" },
  TitleContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "#8a2be2",
    height: "75px",
    borderRadius: "0 50px 50px 0",
    paddingRight: "25px",
    marginBottom: "50px",
  },
  Title: { color: "#deeaef", textTransform: "uppercase" },
  CardContainer: { width: "100%" },
  Card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  CardActionArea: {
    "&:hover .card-content": {
      transform: "translateY(0%)",
    },
  },
  CardMedia: {
    height: 0,
    paddingTop: "56.25%", // 16:9 == '56.25%'
  },
  CardContent: {
    display: "flex",
    flexDirection: "column",
    padding: "5px 7.5px",
    backgroundColor: "rgb(134, 124, 184,.7)",
    bottom: "-20%",
    height: "100%",
    minWidth: "calc(100% - 15px)",
    position: "absolute",
    transition: "all 1s",
    transform: "translateY(56%)",
    [theme.breakpoints.up("md")]: {
      bottom: "-25%",
    },
    [theme.breakpoints.up("sm")]: {
      bottom: "-25%",
    },
    [theme.breakpoints.up("xs")]: {
      bottom: "-30%",
    },
  },
  CardContentH5: {
    width: "100%",
    color: "white",
  },
  CardContentBody1: {
    padding: "7.5px 0",
    color: "white",
  },
});

function ProjectCard(props) {
  const classes = styles();

  return (
    <Grid item container xs={12} sm={6}>
      <div style={classes.CardContainer}>
        <Card sx={classes.Card}>
          <CardActionArea
            component={"a"}
            href={props.project.link}
            sx={classes.CardActionArea}
          >
            <CardMedia
              sx={classes.CardMedia}
              image={props.project.img}
              title={props.project.name}
            />
            <CardContent className="card-content" sx={classes.CardContent}>
              <Typography
                gutterBottom
                variant="h5"
                component="p"
                href={props.project.link}
                sx={classes.CardContentH5}
              >
                {props.project.name}
              </Typography>
              <Typography
                variant="body1"
                color="textSecondary"
                component="p"
                href={props.project.link}
                sx={classes.CardContentBody1}
              >
                {props.project.desc}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    </Grid>
  );
}

export default function Projects() {
  const ref = useRef();
  const onScreen = useOnScreen(ref, "-300px");

  const classes = styles();
  return (
    <div style={classes.ProjectsContainer}>
      <Grid container item xs={12}>
        <Grid item container xs={5} sx={classes.TitleContainer}>
          <Typography variant="h3" sx={classes.Title}>
            Projects
          </Typography>
        </Grid>
      </Grid>
      <Container maxWidth="md" ref={ref}>
        <Grow in={onScreen} timeout={1250}>
          <Grid container spacing={3}>
            {projects.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </Grid>
        </Grow>
      </Container>
    </div>
  );
}
