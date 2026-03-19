import React, { useState } from "react";
import { Button, CardMedia, Card, Grid, MobileStepper } from "@mui/material";
import { KeyboardArrowRight, KeyboardArrowLeft } from "@mui/icons-material";

const styles = () => ({
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    borderRadius: "16px",
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 16px 30px rgba(0, 0, 0, 0.22)",
    transition: "transform 180ms ease, box-shadow 180ms ease",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 22px 40px rgba(0, 0, 0, 0.28)",
    },
  },
  media: {
    height: 0,
    paddingTop: "150%",
    backgroundSize: "cover",
  },
  cardContainer: { overflow: "hidden" },
  cardContent: {
    flexGrow: 1,
    alignItems: "flex-end",
  },
  cardTypography: {
    fontFamily: "Odibee Sans, cursive",
  },
  stepper: {
    marginTop: "12px",
    borderRadius: "14px",
    backgroundColor: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.06)",
    color: "white",
    "& .MuiMobileStepper-dot": {
      backgroundColor: "rgba(255,255,255,0.22)",
    },
    "& .MuiMobileStepper-dotActive": {
      backgroundColor: "#73D90D",
    },
  },
  navButton: {
    color: "white",
    textTransform: "none",
    "&.Mui-disabled": {
      color: "rgba(255,255,255,0.25)",
    },
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
              <Grid size={3} key={`${item.title}-${item.poster}`} sx={ classes.cardContainer }>
                  <Card sx={classes.root}>
                    <CardMedia sx={classes.media} image={item.poster} title={item.title} />
                  </Card>
              </Grid>
            ))}
          </Grid>
      </Grid>
      <Grid size={12}>
        <MobileStepper
          sx={classes.stepper}
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
              sx={classes.navButton}
            >
              Next
              <KeyboardArrowRight />
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
              sx={classes.navButton}
            >
              <KeyboardArrowLeft />
              Back
            </Button>
          }
        />
      </Grid>
    </>
  );
}
