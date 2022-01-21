import React from "react";
import { Avatar, Container, Grid, Typography } from "@mui/material";
import { Code, EmojiPeople, Work, Subject, GitHub, LinkedIn, Instagram } from "@mui/icons-material";
import img from "../img/avatar.jpg";

export default function Resume() {
  return (
    <Container maxWidth="md" disableGutters>
      <Grid container >
        <Grid xs={12} item container sx={{
          fontWeight: 500,
          backgroundColor: "#2D3D4C",
          borderRadius: "12.5px 12.5px 0 0",
          color: "white",
          order: 1,
        }}>
          <Grid container item xs={4} sx={{ justifyContent: "center" }} >
            <Avatar alt="pic" src={img} sx={{
              height: "125px",
              width: "125px",
              margin: '5px'
            }} />
          </Grid>

          <Grid container item xs={8} sx={{ paddingLeft: "12.5px", alignItems: 'center' }}>
            <Grid item xs={12}>
              <Typography variant="h4">
                Matt Kearns
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Full Stack Developer</Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item sm={12} md={4} sx={{
          backgroundColor: "#EDEDED",
          textAlign: "center",
          order: {
            xs: 4,
            md: 2,
          },
          padding: '10px',
        }}>
          <Grid container item xs={12}>
            <Grid item xs={12} sx={{ paddingBottom: "7.5px", }}>
              <Typography variant="h5" sx={{ color: 'black' }}>CONTACT</Typography>
            </Grid>

            <Grid container item xs={12} sx={{ paddingBottom: "7.5px", }}>
              <Grid item xs={12}>
                <Typography variant="subtitle1">Email</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="caption">matt@mattkearns.dev</Typography>
              </Grid>
            </Grid>

            <Grid container item xs={12} sx={{ paddingBottom: "7.5px", }}>
              <Grid item xs={12}>
                <Typography variant="subtitle1">Skills</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption">HTML</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption">CSS</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption">Javascript</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption">React</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption">Redux</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption">Material-UI</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption">Node.js</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption">Express</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption">Socket.io</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption">MongoDB</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption">Mongoose</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption">Git</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption">APIs</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption">JWT</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption">Python</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption">PHP</Typography>
              </Grid>
            </Grid>

            <Grid container item xs={12} sx={{ paddingBottom: "7.5px", }}>
              <Grid item xs={12}>
                <Typography variant="subtitle1">Social Media</Typography>
              </Grid>
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

        <Grid container item sm={12} md={8} sx={{
          backgroundColor: "#FEFEFE",
          order: 3,
          padding: '10px',
        }}>
          <Typography variant="h5">
            <EmojiPeople /> About Me
          </Typography>
          <Grid container item xs={12} sx={{ paddingLeft: "35px", paddingBottom: "25px", }}>
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
          <Grid container item xs={12} sx={{ paddingLeft: "35px", paddingBottom: "25px", }}>
            <Grid item xs={12}>
              <Typography variant="h6" component="a" href="https://mattkearns.dev/medication-tracking-system/">
                Medication Tracking System
              </Typography>
              <Typography variant="body2">
                • Application to monitor and track patient blood levels.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" component="a" href="https://mattkearns.dev/activity-tracker">
                Activity Tracker
              </Typography>
              <Typography variant="body2">
                • Create personalized daily tasks to check off each day and track progress.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" component="a" href="https://mattkearns.dev/message">
                Messenger App
              </Typography>
              <Typography variant="body2">
                • Message application using socket.io for real time updates, JWT for authentication, mongoDB for storage.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" component="a" href="https://mattkearns.dev/five-day-forecast">
                5 day Forecast
              </Typography>
              <Typography variant="body2">
                • Search by zip code to get a five day forecast of the weather using the openweathermap api.
              </Typography>
            </Grid>
          </Grid>

          <Typography variant="h5">
            <Work /> Work Experience
          </Typography>
          <Grid container item xs={12} sx={{ paddingLeft: "35px", paddingBottom: "25px", }}>
            <Grid item xs={12}><Typography variant="subtitle1">Seasonal Operations Supervisor | McKesson</Typography></Grid>
            <Grid item xs={12}><Typography variant="subtitle2">September 2021 - Current</Typography></Grid>
            <Grid item xs={12} sx={{
              paddingLeft: "35px",
              paddingBottom: "7.5px",
              "& p": {
                paddingBottom: "7.5px",
              },
            }}>
              <Typography variant="body2">
                • Primary contact for highest severity IT tickets for all employees in contact center
                such as entire system outages.
              </Typography>
              <Typography variant="body2">• Directly supervise 35 employees.</Typography>
              <Typography variant="body2">
                • Responsible for maintenance of department progress and agent productivity
                reporting.
              </Typography>
              <Typography variant="body2">
                • Assist with integration and development of new tools into the existing system.
              </Typography>
              <Typography variant="body2">
                • Create new processes and work flows to improve efficiency and productivity.
              </Typography>
              <Typography variant="body2"></Typography>
            </Grid>
            <Typography variant="subtitle1">Operation Support Lead | McKesson</Typography>
            <Grid item xs={12}><Typography variant="subtitle2">March 2019 - September 2021</Typography></Grid>
            <Grid item xs={12} sx={{
              paddingLeft: "35px",
              paddingBottom: "7.5px",
              "& p": {
                paddingBottom: "7.5px",
              },
            }}>
              <Typography variant="body2">
                • Developed Firefox extensions to automate reports and workflows.
              </Typography>
              <Typography variant="body2">
                • Monitored, coordinated and evaluated program service levels using call management
                systems to ensure contractual commitments were met.
              </Typography>
              <Typography variant="body2">
                • Liaison between my department and IT for program system issues.
              </Typography>
              <Typography variant="body2">
                • Identified patterns of performance and system issues.
              </Typography>
              <Typography variant="body2">
                • Took lead on noncompliance investigations and provided reports to management.
              </Typography>
              <Typography variant="body2">
                • Collaborated with clients and other departments to accomplish goals.
              </Typography>
              <Typography variant="body2">
                • Provided guidance, support and constructive feedback to representatives.
              </Typography>
              <Typography variant="body2">-Scheduled and ran program meetings.</Typography>
              <Typography variant="body2"></Typography>
            </Grid>

            <Typography variant="subtitle1">REMS Support Representative | McKesson</Typography>
            <Grid item xs={12}><Typography variant="subtitle2">July 2018 - March 2019 (Contractor December 2017 - July 2018)</Typography></Grid>
            <Grid item xs={12} sx={{
              paddingLeft: "35px",
              paddingBottom: "7.5px",
              "& p": {
                paddingBottom: "7.5px",
              },
            }}>
              <Typography variant="body2">-Supported multiple REMS programs</Typography>
              <Typography variant="body2">
                • Provided HIPPA compliant customer servicing to stakeholders.
              </Typography>
              <Typography variant="body2">
                • Assisted stakeholders with registration, enrollment, certification processing.
              </Typography>
              <Typography variant="body2">
                • Unlocked web accounts and generated temporary passwords for stakeholders.
              </Typography>
              <Typography variant="body2">
                • Identified drug side effects and reported to the appropriate manufacturer.
              </Typography>
            </Grid>
          </Grid>

          <Typography variant="h5">
            <Subject /> Education
          </Typography>
          <Grid container item sx={{ paddingLeft: "35px", paddingBottom: "25px", }}>
            <Typography variant="subtitle1">FreeCodeCamp</Typography>
            <Grid item xs={12} sx={{
              paddingLeft: "35px",
              paddingBottom: "7.5px",
              "& p": {
                paddingBottom: "7.5px",
              },
            }}>
              <Typography variant="body2">• Responsive Web Design Certification</Typography>
              <Typography variant="body2">
                • JavaScript Algorithms and Data Structures Certification
              </Typography>
              <Typography variant="body2">• Front End Libraries Certification</Typography>
              <Typography variant="body2">• Data Visualization Certification</Typography>
              <Typography variant="body2">• APIs and Microservices Certification</Typography>
            </Grid>
          </Grid>

          <Grid container item sx={{ paddingLeft: "35px", paddingBottom: "25px", }}>
            <Typography variant="subtitle1">LinkedIn</Typography>
            <Grid item xs={12} sx={{
              paddingLeft: "35px",
              paddingBottom: "7.5px",
              "& p": {
                paddingBottom: "7.5px",
              },
            }}>
              <Typography variant="body2">• 100+ software development and related technical courses completed and certified.</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
