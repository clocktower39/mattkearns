import React, { useRef, useState } from "react";
import { Button, CardMedia, Card, Grid, MobileStepper, Slide } from "@mui/material";
import { KeyboardArrowRight, KeyboardArrowLeft } from "@mui/icons-material";
import useOnScreen from "../Hooks/useOnScreen";

const styles = () => ({
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
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
});

export default function GameList({ list }) {
  const classes = styles();
  const ref = useRef();
  const onScreen = useOnScreen(ref, "-0px");
  const [activeStep, setActiveStep] = useState(0);

  const fixList = (arr, size = 4) => {
    if (arr.length <= size) {
      return [arr];
    } else {
      return [arr.slice(0, size)].concat(fixList(arr.slice(size), size));
    }
  };

  const fixedList = fixList(list);
  const maxSteps = fixedList.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <>
      <Grid item xs={12}>
          <Grid container item xs={12} spacing={1}>
            {fixedList[activeStep].map((item) => (
              <Grid item xs={3} key={`${item.title}-${item.poster}`} ref={ref} sx={{ overflow: 'hidden', }}>
                <Slide in={onScreen} direction="up" timeout={500}>
                  <Card sx={classes.root}>
                    <CardMedia sx={classes.media} image={item.poster} title={item.title} />
                  </Card>
                </Slide>
              </Grid>
            ))}
          </Grid>
      </Grid>
      <Grid item xs={12}>
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
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
      </Grid>
    </>
  );
}
