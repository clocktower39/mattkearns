import React, { useState } from "react";
import { Button, CardMedia, Card, Grid, MobileStepper } from "@mui/material";
import { KeyboardArrowRight, KeyboardArrowLeft } from "@mui/icons-material";

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
  CardContainer: { overflow: 'hidden', },
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
      <Grid size={12}>
          <Grid container size={12} spacing={1}>
            {fixedList[activeStep].map((item) => (
              <Grid size={3} key={`${item.title}-${item.poster}`} sx={ classes.CardContainer }>
                  <Card sx={classes.root}>
                    <CardMedia sx={classes.media} image={item.poster} title={item.title} />
                  </Card>
              </Grid>
            ))}
          </Grid>
      </Grid>
      <Grid size={12}>
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
