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
            <CardActionArea component={"a"} href={props.project.link} sx={{
              "&:hover .card-content": {
                transform: "translateY(0%)",
              },
            }} >
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
                className="card-content"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '5px 7.5px',
                  backgroundColor: "rgb(134, 124, 184,.7)",
                  bottom: "-20%",
                  height: "100%",
                  minWidth: 'calc(100% - 15px)',
                  position: "absolute",
                  transition: "all 1s",
                  transform: "translateY(56%)",
                  [theme.breakpoints.up("md")]: {
                    bottom: "-25%",
                  },
                  [theme.breakpoints.up("sm")]: {
                    bottom: "-25%",
                  },
                  [theme.breakpoints.up("xs")]: {
                    bottom: "-30%",
                  },
                }}
              >
                <Typography
                  gutterBottom
                  variant="h5"
                  component="p"
                  href={props.project.link}
                  sx={{
                    width: "100%",
                    color: "white",
                  }}>
                  {props.project.name}
                </Typography>
                <Typography
                  variant="body1"
                  color="textSecondary"
                  component="p"
                  href={props.project.link}
                  sx={{
                    padding: '7.5px 0',
                    color: "white",
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
