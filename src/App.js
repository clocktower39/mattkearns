import { Box, CardMedia, Container, Grid, Typography, makeStyles } from '@material-ui/core';
import { Code, EmojiPeople, Work, Subject, GitHub, LinkedIn, Instagram } from '@material-ui/icons';
import img from './img/IMG_1290.jpg';
import './App.css';

const useStyle = makeStyles({
  root: {
    position: 'relative',
    minHeight: '100vh',
  },
  gridContainer:{
    minHeight: '100vh',
  },
  Title: {
    backgroundColor: '#2D3D4C',
    borderRadius: '25px 25px 0 0',
    marginTop: '12.5px',
    color: 'white',
  },
  Box: {
    height: '125px',
    width: '125px',
  },
  cardMedia: {
    height: 0,
    paddingTop: '100%',
    borderRadius: '50%',
  },
  sidebar: {
    backgroundColor: '#EDEDED',
    textAlign: 'center',
  },
  main: {
    backgroundColor: '#FEFEFE',
  },
  mainSubDescriptioin: {
    paddingLeft: '35px',
  },
})

function App() {
  const classes = useStyle();
  return (
    <Container maxWidth="md" className={classes.root}>
      <Grid container spacing={3} className={classes.gridContainer}>
        <Grid xs={12} item container className={classes.Title}>
          <Grid container item xs={4} justify="center">
            <Box component={"div"} className={classes.Box}>
              <CardMedia className={classes.cardMedia} image={img} />
            </Box>
          </Grid>

          <Grid item xs={8}>
            <Typography variant="h3" gutterBottom>
              Matt Kearns
            </Typography>
            <Typography variant="h5">Full Stack Developer</Typography>
          </Grid>
        </Grid>

        <Grid container item xs={4} className={classes.sidebar}>
          <Grid container item xs={12} justify="center">
            <Grid container item xs={12} justify="center">
              <Typography variant="h5">CONTACT</Typography>
            </Grid>

            <Typography variant="subtitle1">Phone</Typography>
            <Grid item xs={12}>
              <Typography variant="caption">555-555-5555</Typography>
            </Grid>

            <Typography variant="subtitle1">Email</Typography>
            <Grid item xs={12}>
              <Typography variant="caption">matt@fakeemail.com</Typography>
            </Grid>

            <Typography variant="subtitle1">Home</Typography>
            <Grid item xs={12}>
              <Typography variant="caption">
                123 W Main Street Athens Greece
              </Typography>
            </Grid>

            <Typography variant="subtitle1">Skills</Typography>
            <Grid container item xs={12}>
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
            <Grid container item xs={12}>
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

        <Grid container item xs={8} className={classes.main}>
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
              <Typography variant="subtitle1">
                Random Schedule Generator
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Fitness Exercises App</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Makeup Site</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Social Picture App</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Messenger App</Typography>
            </Grid>
          </Grid>

          <Typography variant="h5">
            <Work /> Work Experience
          </Typography>
          <Grid container item xs={12} className={classes.mainSubDescriptioin}>
            <Grid item xs={12}>
              <Typography variant="subtitle1">
                Operation Support Lead
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">
                REMS Support Representative
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Ranch Hand</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">
                Initial Loss Reporting Representative
              </Typography>
            </Grid>
          </Grid>

          <Typography variant="h5">
            <Subject /> Education
          </Typography>
          <Grid container item className={classes.mainSubDescriptioin}>
            <Grid item xs={12}>
              <Typography variant="subtitle1">FreeCodeCamp</Typography>
              <Typography variant="body2">
                • Responsive Web Design Certification
              </Typography>
              <Typography variant="body2">
                • JavaScript Algorithms and Data Structures Certification
              </Typography>
              <Typography variant="body2">
                • Front End Libraries Certification
              </Typography>
              <Typography variant="body2">
                • Data Visualization Certification
              </Typography>
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
