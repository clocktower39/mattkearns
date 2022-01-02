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
              backgroundColor: "",
            }}
          >
            <CardActionArea>
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
                  width: '100%',
                  backgroundColor: 'rgb(120, 120, 120, .7)',
                  bottom: '-10px',
                  height: '83px',
                  position: 'absolute',
                  transition: 'all 1s',
                  transform: 'translateY(50px)',
                  '&:hover': {
                    transform: 'translateY(0px)',
                  }
                }}
              >
                <Typography gutterBottom variant="h5" component="h2" sx={{ width: "100%"}}>
                  {props.project.name}
                </Typography>
                <Typography variant="body1" color="textSecondary" component="p">
                  <a href={props.project.link} style={{ textDecoration: 'none', color: 'white', padding: '0px 7.5px'}}>{props.project.desc}</a>
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
      </Grow>
    </Grid>
  );
}
