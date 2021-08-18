/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { CardMedia, Card, Slide, makeStyles } from "@material-ui/core";

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

export default function GameList(props) {
  const classes = useStyles();
  const ref = useRef();
  const onScreen = useOnScreen(ref, "-300px");

  return (
    <div ref={ref}>
      <Slide in={onScreen} direction="right" timeout={1500}>
        <Card className={classes.root}>
          <CardMedia
            className={classes.media}
            image={props.item.poster}
            title={props.item.title}
          />
        </Card>
      </Slide>
    </div>
  );
}

// Hook
function useOnScreen(ref) {
  // State and setter for storing whether element is visible
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      // Update our state when observer callback fires
      if(entry.isIntersecting){
        setIntersecting(entry.isIntersecting);
      }
    });
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      observer.unobserve(ref.current);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return isIntersecting;
}
