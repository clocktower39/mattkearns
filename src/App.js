import { Avatar, Container, Grid, Typography, makeStyles } from '@material-ui/core';
import { Code, EmojiPeople, Work, Subject, GitHub, LinkedIn, Instagram } from '@material-ui/icons';
import img from './img/IMG_1290.jpg';
import './App.css';

const useStyle = makeStyles(theme =>({
  root: {
    position: 'relative',
    minHeight: '100vh',
  },
  gridContainer:{
    minHeight: '100vh',
  },
  Title: {
    fontWeight: 500,
    backgroundColor: '#2D3D4C',
    borderRadius: '25px 25px 0 0',
    marginTop: '12.5px',
    color: 'white',
    order: 1,
  },
  TitleHeader:{
    paddingLeft: '12.5px',
  },
  headshot: {
    height: '125px',
    width: '125px',
  },
  sidebar: {
    backgroundColor: '#EDEDED',
    textAlign: 'center',
    order: 2,
    [theme.breakpoints.down('sm')]: {
      order: 4,
    },
  },
  sidebarSection: {
    paddingBottom: '7.5px',
  },
  main: {
    backgroundColor: '#FEFEFE',
    order: 3,
  },
  mainSubDescriptioin: {
    paddingLeft: '35px',
    paddingBottom: '25px',
  },
  mainSubDescriptioinTasks: {
    paddingLeft: '35px',
    paddingBottom: '7.5px',
    '& p':{
      paddingBottom: '7.5px',
    }
  },
  exampleLinks: {
    textDecoration: 'none',
    color: 'black',
  },
}))

function App() {
  const classes = useStyle();
  return (
    <Container maxWidth="md" className={classes.root}>
      <Grid container spacing={3} className={classes.gridContainer}>
        <Grid xs={12} item container className={classes.Title}>

          <Grid container item xs={4} justify="center">
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

            <Typography variant="subtitle1">Phone</Typography>
            <Grid item xs={12} className={classes.sidebarSection}>
              <Typography variant="caption">555-555-5555</Typography>
            </Grid>

            <Typography variant="subtitle1">Email</Typography>
            <Grid item xs={12} className={classes.sidebarSection}>
              <Typography variant="caption">matt@fakeemail.com</Typography>
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
              Passionate self-taught web developer driven to start a career
              building applications and new services. Advanced problem-solver
              with a track record of exceeding expectation and boosting
              efficiency in a productive work environment.
            </Typography>
          </Grid>

          <Typography variant="h5">
            <Code /> Projects
          </Typography>
          <Grid container item xs={12} className={classes.mainSubDescriptioin}>
            <Grid item xs={12}>
              <Typography variant="subtitle1"><a className={classes.exampleLinks} href="https://mattkearns.dev/random-schedule-generator">
                Random Schedule Generator</a>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1"><a className={classes.exampleLinks} href="https://mattkearns.dev/fitness-exercises/">Fitness Exercises App</a></Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1"><a className={classes.exampleLinks} href="https://madeupbymaria.com">Makeup Site</a></Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1"><a className={classes.exampleLinks} href="https://mattkearns.dev/social-picture-app/">Social Picture App</a></Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1"><a className={classes.exampleLinks} href="https://mattkearns.dev/message">Messenger App</a></Typography>
            </Grid>
          </Grid>

          <Typography variant="h5">
            <Work /> Work Experience
          </Typography>
          <Grid container item xs={12} className={classes.mainSubDescriptioin}>

            <Typography variant="subtitle1">
              Operation Support Lead
            </Typography>
            <Grid item xs={12} className={classes.mainSubDescriptioinTasks}>
              <Typography variant="body2">-Developed web tools to automate reports for program service level agreements</Typography>
              <Typography variant="body2">-Collaborated with client management team and CVS Chain headquarters Pharmacy representatives via conference calls</Typography>
              <Typography variant="body2">-Liaison between REMS department and IT for program system issues</Typography>
              <Typography variant="body2">-Monitored, coordinated and evaluated program service levels using call management systems to ensure contractual commitments were consistently met</Typography>
              <Typography variant="body2">-Acted as supervisory support to the call center for escalated calls from health care providers, pharmacies, patients and other stakeholders.</Typography>
              <Typography variant="body2">-Identified patterns of performance and system issues then escalated to the appropriate leadership</Typography>
              <Typography variant="body2">-Evaluated unresolved issues and escalated to the appropriate party if necessary</Typography>
              <Typography variant="body2"></Typography>
            </Grid>

            <Typography variant="subtitle1">
              REMS Support Representative
            </Typography>
            <Grid item xs={12} className={classes.mainSubDescriptioinTasks}>
              <Typography variant="body2">-Supported multiple REMS programs</Typography>
              <Typography variant="body2">-Answer inbound calls regarding REMS requirements</Typography>
              <Typography variant="body2">-Assist REMS stakeholder with registration, enrollment, certification processing</Typography>
              <Typography variant="body2">-Unlock REMS web accounts and generate temporary password for REMS stakeholders</Typography>
              <Typography variant="body2">-Access REMS stakeholders web account that request web assistance</Typography>
              <Typography variant="body2">-Identify potential adverse events and product complaints to the appropriate REMS drug manufacturer</Typography>
            </Grid>

            <Typography variant="subtitle1">Ranch Hand</Typography>
            <Grid item xs={12} className={classes.mainSubDescriptioinTasks}>
              <Typography variant="body2">-Supervised guest safety during river interactions and ranch stays</Typography>
              <Typography variant="body2">-Documented and reported any property damage or customer concerns and completed requested services to resolve</Typography>
              <Typography variant="body2">-Maintained equipment and ranch structures</Typography>
            </Grid>
            
            <Typography variant="subtitle1">
              Initial Loss Reporting Representative
            </Typography>
            <Grid item xs={12} className={classes.mainSubDescriptioinTasks}>
              <Typography variant="body2">-Communicate with customers and associates by phone, mobile app, click-to-chat and Internet reporting</Typography>
              <Typography variant="body2">-Gather and document loss information</Typography>
              <Typography variant="body2">-Handle a large volume of calls in a collaborative team setting</Typography>
              <Typography variant="body2">-Use State Farm systems and technology</Typography>
            </Grid>
          </Grid>

          <Typography variant="h5">
            <Subject /> Education
          </Typography>
          <Grid container item className={classes.mainSubDescriptioin}>
              <Typography variant="subtitle1">FreeCodeCamp</Typography>
            <Grid item xs={12} className={classes.mainSubDescriptioinTasks}>
              <Typography variant="body2">-Responsive Web Design Certification</Typography>
              <Typography variant="body2">-JavaScript Algorithms and Data Structures Certification</Typography>
              <Typography variant="body2">-Front End Libraries Certification</Typography>
              <Typography variant="body2">-Data Visualization Certification</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">
                Illinois State University
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
