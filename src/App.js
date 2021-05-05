import { Box, CardMedia, Container, Grid, Typography, makeStyles } from '@material-ui/core';
import { Code, EmojiPeople, Work, Subject } from '@material-ui/icons';
import img from './img/IMG_1288.jpg';
import './App.css';

const useStyle = makeStyles({
  root: {
    
  },
  Title: {
    backgroundColor: '#2D3D4C',
    borderRadius: '25px 25px 0 0',
    marginTop: '10px',
    color: 'white',
  },
  Box: {
    height: '150px',
    width: '150px',
  },
  cardMedia: {
    height: 0,
    paddingTop: '100%',
    borderRadius: '50%'
  },
  sidebar: {
    backgroundColor: '#EDEDED',
    textAlign: 'center',
  },
  main: {
    backgroundColor: '#FEFEFE',
  },
})

function App() {
  const classes = useStyle();
  return (
    <Container maxWidth="md" className={classes.root}>
      <Grid container spacing={3} className={classes.gridContainer}>
        
        <Grid xs={12} item container className={classes.Title}>

          <Grid item xs={4}>
            <Box component={'div'}
                  className={classes.Box}>
                <CardMedia
                  className={classes.cardMedia}
                  image={img}
                />
            </Box>
          </Grid>

          <Grid item xs={8}>
            <Typography variant='h3'>Matt Kearns</Typography>
            <Typography variant='h5'>Full Stack Developer</Typography>
          </Grid>

        </Grid>

        <Grid container item xs={4} className={classes.sidebar}>
            <Grid container item xs={12} justify='center'>
              <Grid container item xs={12} justify='center'>
                <Typography variant='h5'>CONTACT</Typography>
              </Grid>

              <Typography variant='subtitle1'>Phone</Typography>
              <Grid item xs={12}>
                <Typography variant='caption'>555-555-5555</Typography>
              </Grid>

              <Typography variant='subtitle1'>Email</Typography>
              <Grid item xs={12}>
                <Typography variant='caption'>matt@fakeemail.com</Typography>
              </Grid>

              <Typography variant='subtitle1'>Home</Typography>
              <Grid item xs={12}>
                <Typography variant='caption'>123 W Main Street Athens Greece</Typography>
              </Grid>

              <Typography variant='subtitle1'>Skills</Typography>
              <Grid container item xs={12}>
                <Grid item xs={6} ><Typography variant='caption'>Javascript</Typography></Grid>
                <Grid item xs={6} ><Typography variant='caption'>React</Typography></Grid>
                <Grid item xs={6} ><Typography variant='caption'>Redux</Typography></Grid>
                <Grid item xs={6} ><Typography variant='caption'>Material-UI</Typography></Grid>
                <Grid item xs={6} ><Typography variant='caption'>Node.js</Typography></Grid>
                <Grid item xs={6} ><Typography variant='caption'>Express</Typography></Grid>
                <Grid item xs={6} ><Typography variant='caption'>MongoDB</Typography></Grid>
                <Grid item xs={6} ><Typography variant='caption'>Mongoose</Typography></Grid>
                <Grid item xs={6} ><Typography variant='caption'>Git</Typography></Grid>
                <Grid item xs={6} ><Typography variant='caption'>APIs</Typography></Grid>
              </Grid>

              <Typography variant='subtitle1'>Social Media</Typography>
              <Grid container item xs={12}>
                <Grid item xs={12} ><Typography variant='caption'>Github</Typography></Grid>
                <Grid item xs={12} ><Typography variant='caption'>Linkedin</Typography></Grid>
                <Grid item xs={12} ><Typography variant='caption'>Instagram</Typography></Grid>
              </Grid>
            </Grid>
        </Grid>
        
        <Grid container item xs={8} className={classes.main}>
            <Typography variant='h5'><EmojiPeople />About Me</Typography>
            <Typography variant='subtitle1'>I have always loved computers, it started with video games, which led to cheat codes, then to modding, and now promgramming.</Typography>

            <Typography variant='h5'><Code />Projects</Typography>
            <Grid container item>
              <Grid item xs={12}><Typography variant='subtitle1'>Random Schedule Generator</Typography></Grid>
              <Grid item xs={12}><Typography variant='subtitle1'>Fitness Exercises App</Typography></Grid>
              <Grid item xs={12}><Typography variant='subtitle1'>Makeup Site</Typography></Grid>
              <Grid item xs={12}><Typography variant='subtitle1'>Social Picture App</Typography></Grid>
              <Grid item xs={12}><Typography variant='subtitle1'>Messenger App</Typography></Grid>
            </Grid>

            <Typography variant='h5'><Work />Work Experience</Typography>
            <Grid container item>
              <Grid item xs={12}><Typography variant='subtitle1'>Operation Support Lead</Typography></Grid>
              <Grid item xs={12}><Typography variant='subtitle1'>REMS Support Representative</Typography></Grid>
              <Grid item xs={12}><Typography variant='subtitle1'>Ranch Hand</Typography></Grid>
              <Grid item xs={12}><Typography variant='subtitle1'>Initial Loss Reporting Representative</Typography></Grid>
            </Grid>

            <Typography variant='h5'><Subject />Education</Typography>
            <Grid container item>
              <Grid item xs={12}><Typography variant='subtitle1'>FreeCodeCamp</Typography></Grid>
              <Grid item xs={12}><Typography variant='subtitle1'>Illinois State University</Typography></Grid>
            </Grid>
        </Grid>

      </Grid>
    </Container>
  );
}

export default App;
