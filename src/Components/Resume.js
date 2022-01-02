import React from "react";
import { Avatar, Container, Grid, Typography } from "@mui/material";
import { Code, EmojiPeople, Work, Subject, GitHub, LinkedIn, Instagram } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import img from "../img/avatar.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    minHeight: "100vh",
  },
  gridContainer: {
    minHeight: "100vh",
  },
  Title: {
    fontWeight: 500,
    backgroundColor: "#2D3D4C",
    borderRadius: "25px 25px 0 0",
    marginTop: "12px",
    color: "white",
    order: 1,
  },
  TitleHeader: {
    paddingLeft: "12.5px",
  },
  headshot: {
    height: "125px",
    width: "125px",
  },
  sidebar: {
    backgroundColor: "#EDEDED",
    textAlign: "center",
    order: 2,
    [theme.breakpoints.down("sm")]: {
      order: 4,
    },
  },
  sidebarSection: {
    paddingBottom: "7.5px",
  },
  main: {
    backgroundColor: "#FEFEFE",
    order: 3,
  },
  mainSubDescriptioin: {
    paddingLeft: "35px",
    paddingBottom: "25px",
  },
  mainSubDescriptioinTasks: {
    paddingLeft: "35px",
    paddingBottom: "7.5px",
    "& p": {
      paddingBottom: "7.5px",
    },
  },
  exampleLinks: {
    textDecoration: "none",
    color: "black",
  },
}));

export default function Resume() {
  const classes = useStyles();
  return (
    <Container maxWidth="md" className={classes.root}>
      <Grid container spacing={3} className={classes.gridContainer}>
        <Grid xs={12} item container className={classes.Title}>
          <Grid container item xs={4} justifyContent="center">
            <Avatar alt="pic" src={img} className={classes.headshot} />
          </Grid>

          <Grid item xs={8} className={classes.TitleHeader}>
            <Typography variant="h4" gutterBottom>
              Matt Kearns
            </Typography>
            <Typography variant="h6">Full Stack Developer</Typography>
          </Grid>
        </Grid>

        <Grid container item sm={12} md={4} className={classes.sidebar}>
          <Grid item xs={12}>
            <Grid item xs={12} className={classes.sidebarSection}>
              <Typography variant="h5">CONTACT</Typography>
            </Grid>

            {/* <Typography variant="subtitle1">Phone</Typography>
            <Grid item xs={12} className={classes.sidebarSection}>
              <Typography variant="caption">555-555-5555</Typography>
            </Grid> */}

            <Typography variant="subtitle1">Email</Typography>
            <Grid item xs={12} className={classes.sidebarSection}>
              <Typography variant="caption">matt@mattkearns.dev</Typography>
            </Grid>

            {/* <Typography variant="subtitle1">Home</Typography>
                <Grid item xs={12} className={classes.sidebarSection}>
                  <Typography variant="caption">
                    123 W Main Street Athens Greece
                  </Typography>
                </Grid> */}

            <Typography variant="subtitle1">Skills</Typography>
            <Grid container item xs={12} className={classes.sidebarSection}>
              <Grid item xs={12} md={6}>
                <Typography variant="caption">Javascript</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="caption">React</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="caption">Redux</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="caption">Material-UI</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="caption">Node.js</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="caption">Express</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="caption">MongoDB</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="caption">Mongoose</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="caption">Git</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="caption">APIs</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="caption">JWT</Typography>
              </Grid>
            </Grid>

            <Typography variant="subtitle1">Social Media</Typography>
            <Grid container item xs={12} className={classes.sidebarSection}>
              <Grid item xs={12}>
                <Typography variant="caption">
                  <GitHub />
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="caption">
                  <LinkedIn />
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="caption">
                  <Instagram />
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid container item sm={12} md={8} className={classes.main}>
          <Typography variant="h5">
            <EmojiPeople /> About Me
          </Typography>
          <Grid container item xs={12} className={classes.mainSubDescriptioin}>
            <Typography variant="subtitle1">
              I am a passionate and self-taught full stack web developer driven to create and
              maintain scalable web applications. I have excellent problem-solving skills and a
              track record of exceeding expectations, boosting efficiency, and facilitating a
              productive work environment
            </Typography>
          </Grid>

          <Typography variant="h5">
            <Code /> Projects
          </Typography>
          <Grid container item xs={12} className={classes.mainSubDescriptioin}>
            <Grid item xs={12}>
              <Typography variant="h6">
                <a
                  className={classes.exampleLinks}
                  href="https://mattkearns.dev/medication-tracking-system/"
                >
                  Medication Tracking System
                </a>
              </Typography>
              <Typography variant="subtitle1">
                {" "}
                -A system to track patient blood work and enrollment information.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">
                <a
                  className={classes.exampleLinks}
                  href="https://mattkearns.dev/random-schedule-generator"
                >
                  Random Schedule Generator
                </a>
              </Typography>
              <Typography variant="subtitle1">
                {" "}
                -An app to randomly generate schedules based on a weighted system and program
                assignments.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">
                <a className={classes.exampleLinks} href="https://mattkearns.dev/message">
                  Messenger App
                </a>
              </Typography>
              <Typography variant="subtitle1">
                {" "}
                -A real-time chat app using socket.io, JWT authentication, and deployed with Heroku.
              </Typography>
            </Grid>
          </Grid>

          <Typography variant="h5">
            <Work /> Work Experience
          </Typography>
          <Grid container item xs={12} className={classes.mainSubDescriptioin}>
            <Typography variant="subtitle1">Seasonal Operations Supervisor</Typography>
            <Grid item xs={12} className={classes.mainSubDescriptioinTasks}>
              <Typography variant="body2">
                -Primary contact for highest severity IT tickets for all employees in contact center
                such as entire system outages.
              </Typography>
              <Typography variant="body2">-Directly supervise 70 employees.</Typography>
              <Typography variant="body2">
                -Responsible for maintenance of department progress and agent productivity
                reporting.
              </Typography>
              <Typography variant="body2">
                -Assist with integration and development of new tools into the existing system.
              </Typography>
              <Typography variant="body2">
                -Create new processes and work flows to improve efficiency and productivity.
              </Typography>
              <Typography variant="body2"></Typography>
            </Grid>
            <Typography variant="subtitle1">Operation Support Lead</Typography>
            <Grid item xs={12} className={classes.mainSubDescriptioinTasks}>
              <Typography variant="body2">
                -Developed Firefox extensions to automate reports and workflows.
              </Typography>
              <Typography variant="body2">
                -Monitored, coordinated and evaluated program service levels using call management
                systems to ensure contractual commitments were met.
              </Typography>
              <Typography variant="body2">
                -Liaison between my department and IT for program system issues.
              </Typography>
              <Typography variant="body2">
                -Identified patterns of performance and system issues.
              </Typography>
              <Typography variant="body2">
                -Took lead on noncompliance investigations and provided reports to management.
              </Typography>
              <Typography variant="body2">
                -Collaborated with clients and other departments to accomplish goals.
              </Typography>
              <Typography variant="body2">
                -Provided guidance, support and constructive feedback to representatives.
              </Typography>
              <Typography variant="body2">-Scheduled and ran program meetings.</Typography>
              <Typography variant="body2"></Typography>
            </Grid>

            <Typography variant="subtitle1">REMS Support Representative</Typography>
            <Grid item xs={12} className={classes.mainSubDescriptioinTasks}>
              <Typography variant="body2">-Supported multiple REMS programs</Typography>
              <Typography variant="body2">
                -Provided HIPPA compliant customer servicing to stakeholders.
              </Typography>
              <Typography variant="body2">
                -Assisted stakeholders with registration, enrollment, certification processing.
              </Typography>
              <Typography variant="body2">
                -Unlocked web accounts and generated temporary passwords for stakeholders.
              </Typography>
              <Typography variant="body2">
                -Identified drug side effects and reported to the appropriate manufacturer.
              </Typography>
            </Grid>
          </Grid>

          <Typography variant="h5">
            <Subject /> Education
          </Typography>
          <Grid container item className={classes.mainSubDescriptioin}>
            <Typography variant="subtitle1">FreeCodeCamp</Typography>
            <Grid item xs={12} className={classes.mainSubDescriptioinTasks}>
              <Typography variant="body2">-Responsive Web Design Certification</Typography>
              <Typography variant="body2">
                -JavaScript Algorithms and Data Structures Certification
              </Typography>
              <Typography variant="body2">-Front End Libraries Certification</Typography>
              <Typography variant="body2">-Data Visualization Certification</Typography>
              <Typography variant="body2">-APIs and Microservices Certification</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
