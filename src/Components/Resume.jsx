import React from "react";
import { Avatar, Container, Grid, IconButton, Typography } from "@mui/material";
import {
  Code,
  EmojiPeople,
  Work,
  Subject,
  Source as SourceIcon,
  GitHub,
  LinkedIn,
  Instagram,
} from "@mui/icons-material";
import img from "../img/avatar.jpg";

export default function Resume() {
  const tools = [
    "Javascript",
    "Node.js",
    "MongoDB",
    "CSS",
    "Yarn",
    "NPM",
    "Mongoose",
    "HTML",
    "Express",
    "Multer",
    "React",
    "Python",
    "Redux",
    "PHP",
    "Material-UI",
    "Socket.IO",
    "SQL",
    "D3",
    "JWT",
    "AWS",
    "Git",
    "Puppeteer",
    "Docker",
    "Heroku",
    "cPanel",
  ];
  return (
    <Container maxWidth="md" disableGutters>
      <Grid container>
        <Grid
          xs={12}
          item
          container
          sx={{
            fontWeight: 500,
            backgroundColor: "#2D3D4C",
            borderRadius: "12.5px 12.5px 0 0",
            color: "white",
            order: 1,
          }}
        >
          <Grid container item xs={4} sx={{ justifyContent: "center" }}>
            <Avatar
              alt="pic"
              src={img}
              sx={{
                height: "125px",
                width: "125px",
                margin: "5px",
              }}
            />
          </Grid>

          <Grid container item xs={8} sx={{ paddingLeft: "12.5px", alignItems: "center" }}>
            <Grid item xs={12}>
              <Typography variant="h2">Matt Kearns</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Full Stack Developer</Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          item
          sm={12}
          md={4}
          sx={{
            backgroundColor: "#EDEDED",
            textAlign: "center",
            order: {
              xs: 4,
              md: 2,
            },
            padding: "10px",
          }}
        >
          <Grid container item xs={12}>
            <Grid item xs={12} sx={{ paddingBottom: "7.5px" }}>
              <Typography variant="h4" sx={{ color: "black" }}>
                CONTACT
              </Typography>
            </Grid>

            <Grid container item xs={12} sx={{ paddingBottom: "7.5px" }}>
              <Grid item xs={12}>
                <Typography variant="subtitle1">Email</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="caption">matt@mattkearns.dev</Typography>
              </Grid>
            </Grid>

            <Grid container item xs={12} sx={{ paddingBottom: "7.5px" }}>
              <Grid item xs={12}>
                <Typography variant="subtitle1">Tools</Typography>
              </Grid>
              {tools.map((tool) => (
                <Grid item xs={4} key={tools}>
                  <Typography variant="caption">{tool}</Typography>
                </Grid>
              ))}
            </Grid>

            <Grid container item xs={12} sx={{ paddingBottom: "7.5px" }}>
              <Grid item xs={12}>
                <Typography variant="subtitle1">Social Media</Typography>
              </Grid>
              <Grid item xs={12}>
                <IconButton
                  onClick={() => window.open("https://www.github.com/clocktower39", "_blank")}
                >
                  <GitHub />
                </IconButton>
              </Grid>
              <Grid item xs={12}>
                <IconButton
                  onClick={() =>
                    window.open("https://www.linkedin.com/in/matthew-kearns-6b8865117/", "_blank")
                  }
                >
                  <LinkedIn />
                </IconButton>
              </Grid>
              <Grid item xs={12}>
                <IconButton>
                  <Instagram />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          container
          item
          sm={12}
          md={8}
          sx={{
            backgroundColor: "#FEFEFE",
            order: 3,
            padding: "10px",
          }}
        >
          <Typography variant="h4">
            <EmojiPeople /> About Me
          </Typography>
          <Grid container item xs={12} sx={{ paddingLeft: "35px", paddingBottom: "25px" }}>
            <Typography variant="body2">
              Experienced and self-motivated web developer with over six years of expertise in
              JavaScript, React, and building responsive, user-centric interfaces. Proficient with
              modern frameworks, libraries, and tools, with a strong commitment to optimizing
              codebases for scalability and maintainability. Adept at collaborating with
              cross-functional teams to deliver innovative solutions.
            </Typography>
          </Grid>

          <Typography variant="h4">
            <Code /> Projects
          </Typography>
          <Grid container item xs={12} sx={{ paddingLeft: "35px", paddingBottom: "25px" }}>
            <Grid item xs={12}>
              <Typography variant="h6" component="a" href="https://mattkearns.dev/">
                Personal Website
              </Typography>
              <Typography variant="body2">
                • Learn more about me and check out some of my projects
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" component="a" href="https://www.firebellyfitness.com">
                Firebelly Fitness
              </Typography>
              <Typography variant="body2">
                • Personal Trainer website and web application for tracking workouts and
                progression.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="h6"
                component="a"
                href="https://mattkearns.dev/social-picture-app"
              >
                Social Picture App
              </Typography>
              <Typography variant="body2">
                • Share photos with friends, comment, react, and message.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="h6"
                component="a"
                href="https://mattkearns.dev/self-driving-car-sim"
              >
                Self Driving Car Simulator
              </Typography>
              <Typography variant="body2">
                • 1000 instances of a car are deployed, save the best car position to teach the
                neural network how to drive and avoid cars.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="h6"
                component="a"
                href="https://github.com/clocktower39/tv-controller"
              >
                CEC-TV-Controller
              </Typography>
              <Typography variant="body2">
                • Control your TV via a raspberry pi using the HDMI CEC commands.
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
          </Grid>

          <Typography variant="h4">
            <SourceIcon /> Experience
          </Typography>
          <Grid container item xs={12} sx={{ paddingLeft: "35px", paddingBottom: "25px" }}>
            <Typography variant="subtitle1">Freelance Web Developer</Typography>
            <Grid item xs={12}>
              <Typography variant="subtitle2">2018 - Current</Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                paddingLeft: "35px",
                paddingBottom: "7.5px",
                "& p": {
                  paddingBottom: "7.5px",
                },
              }}
            >
              <Typography variant="body2">
                • Collaborate with clients to create and launch responsive and user-friendly
                websites tailored to their specific needs
              </Typography>
              <Typography variant="body2">
                • Utilize a combination of JavaScript, CSS, HTML, and frameworks like React to build
                interactive and dynamic front-end interfaces
              </Typography>
              <Typography variant="body2">
                • Developed back-end functionalities using Node.js, Express, JWT, and MongoDB to
                ensure smooth data handling, seamless user interactions, and proper authentication
              </Typography>
              <Typography variant="body2">
                • Conducted regular maintenance and updates to ensure websites remain up-to-date and
                functional
              </Typography>
              <Typography variant="body2">
                • Provided training and support to clients for content management and website
                maintenance
              </Typography>
            </Grid>
          </Grid>
          <Typography variant="h4">
            <Work /> NON-RELATED WORK HISTORY
          </Typography>
          <Grid container item xs={12} sx={{ paddingLeft: "35px", paddingBottom: "25px" }}>
            <Typography variant="subtitle1">Operation Support Lead | McKesson</Typography>
            <Grid item xs={12}>
              <Typography variant="subtitle2">March 2019 - Current</Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                paddingLeft: "35px",
                paddingBottom: "7.5px",
                "& p": {
                  paddingBottom: "7.5px",
                },
              }}
            >
              <Typography variant="body2">
                • Automate reports and tasks using Sharepoint, firefox extensions and web scraping
                tools.
              </Typography>
              <Typography variant="body2">
                • Participate in IT meetings and assist with customer facing bugs as needed
              </Typography>
              <Typography variant="body2">
                • Resolve system issues and handle system-related production support tickets
              </Typography>
              <Typography variant="body2">
                • Took lead on noncompliance investigations and provided reports to management.
              </Typography>
              <Typography variant="body2">
                • Provided data analysis and generated reports for program performance improvement
              </Typography>
              <Typography variant="body2">
                • Reviewed and provided revisions for work instruction SOPs and other documentation
              </Typography>
              <Typography variant="body2">
                • Coordinated and led team meetings and training sessions
              </Typography>
              <Typography variant="body2">• Scheduled and ran program meetings.</Typography>
              <Typography variant="body2"></Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1">Seasonal Operations Supervisor | McKesson</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2">September 2021 - March 2022</Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                paddingLeft: "35px",
                paddingBottom: "7.5px",
                "& p": {
                  paddingBottom: "7.5px",
                },
              }}
            >
              <Typography variant="body2">
                • Assist with integration and development of new tools into the existing system.
              </Typography>
              <Typography variant="body2">
                • Primary contact for highest severity IT tickets for all employees in contact
                center such as entire system outages.
              </Typography>
              <Typography variant="body2">
                • Supervised and trained new team members to ensure they were proficient in their
                roles
              </Typography>
              <Typography variant="body2">
                • Monitored team performance and identified areas for improvement to ensure service
                level agreements are met
              </Typography>
              <Typography variant="body2">
                • Coordinated and facilitated training sessions and team building events to improve
                team communication and morale
              </Typography>
              <Typography variant="body2">
                • Conducted quality assurance checks to ensure accuracy and completeness of work,
                and provided feedback to team members to promote continuous improvement
              </Typography>
              <Typography variant="body2">
                • Collaborated with other supervisors and managers to ensure cross-functional
                alignment and consistency in processes and procedures
              </Typography>
              <Typography variant="body2"></Typography>
            </Grid>

            <Typography variant="subtitle1">REMS Support Representative | McKesson</Typography>
            <Grid item xs={12}>
              <Typography variant="subtitle2">
                July 2018 - March 2019 (Contractor December 2017 - July 2018)
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                paddingLeft: "35px",
                paddingBottom: "7.5px",
                "& p": {
                  paddingBottom: "7.5px",
                },
              }}
            >
              <Typography variant="body2">
                • Served as subject matter expert for new hire training class
              </Typography>
              <Typography variant="body2">
                • Identified potential adverse events and product complaints
              </Typography>
              <Typography variant="body2">
                • Provided support for multiple programs and assisted stakeholders with registration
                and website issues
              </Typography>
            </Grid>
          </Grid>

          <Typography variant="h4">
            <Subject /> Education
          </Typography>
          <Grid container item sx={{ paddingLeft: "35px", paddingBottom: "25px" }}>
            <Typography variant="subtitle1">FreeCodeCamp</Typography>
            <Grid
              item
              xs={12}
              sx={{
                paddingLeft: "35px",
                paddingBottom: "7.5px",
                "& p": {
                  paddingBottom: "7.5px",
                },
              }}
            >
              <Typography variant="body2">• Responsive Web Design Certification</Typography>
              <Typography variant="body2">
                • JavaScript Algorithms and Data Structures Certification
              </Typography>
              <Typography variant="body2">• Front End Libraries Certification</Typography>
              <Typography variant="body2">• Data Visualization Certification</Typography>
              <Typography variant="body2">• APIs and Microservices Certification</Typography>
            </Grid>
          </Grid>

          <Grid container item sx={{ paddingLeft: "35px", paddingBottom: "25px" }}>
            <Typography variant="subtitle1">LinkedIn</Typography>
            <Grid
              item
              xs={12}
              sx={{
                paddingLeft: "35px",
                paddingBottom: "7.5px",
                "& p": {
                  paddingBottom: "7.5px",
                },
              }}
            >
              <Typography variant="body2">
                • 100+ software development and related technical courses completed and certified.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
