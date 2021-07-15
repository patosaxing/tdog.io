import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Collapse,
  Avatar,
  IconButton,
} from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SampleImg from "./R.png";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    marginTop: 10,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function RecipeReviewCard() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="PlaceHolder for Video"
        subheader="Uploaded on: June 23, 2021"
      />
      <CardMedia
        className={classes.media}
        image={SampleImg}
        title="TestVideo for EvalView"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          This impressive interview video is from a EvolveU-Cohort6 Learner. She
          answered all the advance React questions in 15mins.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>COMMENTS:</Typography>
          <Typography paragraph>
            WHat people are taking about this interview:
          </Typography>
          <Typography paragraph>
            I want to give you a quick and easy way to get started preparing for
            your job interview, and of course, that begins with learning how to
            answer the most common job interview questions for 2021!
          </Typography>
          <Typography paragraph>
            That’s right. If you haven’t had a job interview for a while, you
            might be surprised at how much things have changed. But don’t worry,
            because we’ve really gone out of our way to make sure that we are
            sharing our “latest and greatest” techniques for answering each
            question.
          </Typography>
          <Typography>
            At the end of your answer try segueing into an insightful question
            for the hiring manager that shows you understand exactly what issues
            or problems the company is for looking for you to solve.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
