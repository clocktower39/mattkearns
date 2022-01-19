import React, { useRef } from "react";
import {
  Typography,
  CardActionArea,
  CardContent,
  CardMedia,
  Card,
  Grid,
  Grow,
} from "@mui/material";
import useOnScreen from "../Hooks/useOnScreen";
import { theme } from "../theme";

export default function RecipeReviewCard(props) {
  const ref = useRef();
  const onScreen = useOnScreen(ref, "-300px");

  return (
    <Grid item container xs={12} sm={6} ref={ref}>
      <Grow in={onScreen} timeout={1250}>
        <div style={{ width: "100%" }}>
          <Card
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CardActionArea component={"a"} href={props.project.link} >
              <Grow in={onScreen} timeout={1250}>
                <CardMedia
                  sx={{
                    height: 0,
                    paddingTop: "56.25%", // 16:9 == '56.25%'
                  }}
                  image={props.project.img}
                  title={props.project.name}
                />
              </Grow>
              <CardContent
                sx={{
                  width: "100%",
                  padding: '5px',
                  backgroundColor: "rgb(134, 124, 184,.7)",
                  bottom: "-20%",
                  height: "100%",
                  position: "absolute",
                  transition: "all 1s",
                  transform: "translateY(60%)",
                  "&:hover": {
                    transform: "translateY(20%)",
                  },
                  [theme.breakpoints.up("md")]: {
                    bottom: "-25%",
                  },
                  [theme.breakpoints.up("sm")]: {
                    bottom: "-22%",
                  },
                  [theme.breakpoints.up("xs")]: {
                    bottom: "-30%",
                  },
                }}
              >
                <Typography
                  gutterBottom
                  variant="h5"
                  component="a"
                  href={props.project.link}
                  sx={{
                    display: 'block',
                    width: "90%", color: "white",
                    textDecoration: "none",
                    "&:hover": {
                      fontWeight: 500
                    }
                  }}>
                  {props.project.name}
                </Typography>
                <Typography
                  variant="body1"
                  color="textSecondary"
                  component="a"
                  href={props.project.link}
                  sx={{
                    color: "white",
                    textDecoration: "none",
                    "&:hover": {
                      fontWeight: 500
                    }
                  }}
                >
                  {props.project.desc}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
      </Grow>
    </Grid>
  );
}
