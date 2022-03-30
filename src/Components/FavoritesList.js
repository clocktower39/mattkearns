import React, { useRef, useState } from "react";
import { Button, CardMedia, Card, Grid, MobileStepper, Slide } from "@mui/material";
import { KeyboardArrowRight, KeyboardArrowLeft } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import useOnScreen from "../Hooks/useOnScreen";
import SwipeableViews from "react-swipeable-views";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "",
  },
  media: {
    height: 0,
    paddingTop: "150%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
    alignItems: "flex-end",
  },
  cardTypography: {
    fontFamily: "Odibee Sans, cursive",
  },
}));

export default function GameList({ list }) {
  const classes = useStyles();
  const ref = useRef();
  const onScreen = useOnScreen(ref, "-300px");
  const [activeStep, setActiveStep] = useState(0);

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <>
      <MobileStepper
        steps={1}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === 1 - 1}>
            Next
            <KeyboardArrowRight />
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            <KeyboardArrowLeft />
            Back
          </Button>
        }
      />
      <SwipeableViews
        axis="x"
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
        animateHeight
      >
        <Grid container item xs={12} ref={ref}>
          {list.map((item) => (<>
            <Grid container item xs={3} key={item.title}>
              <Slide in={onScreen} direction="right" timeout={1500}>
                <Card className={classes.root}>
                  <CardMedia className={classes.media} image={item.poster} title={item.title} />
                </Card>
              </Slide>
            </Grid>
            </>
          ))}
        </Grid>
      </SwipeableViews>
    </>
  );
}
