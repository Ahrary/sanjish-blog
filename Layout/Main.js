import * as React from "react";
import axios from "axios";
import PropTypes from "prop-types";

import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { styled } from '@mui/material/styles';
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  border: '.2px solid black',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const Main = () => {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const url = "https://jsonplaceholder.typicode.com/posts";
  const postImage = "https://source.unsplash.com/random";

  React.useEffect(() => {
    axios(url)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <Paper elevation={0} sx={{ p: 2, bgcolor: "grey.200" }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ mt: 3, wordBreak: "break-word" }}
        >
          Loading data from «{url}»
        </Typography>
      </Paper>
    );
  if (error)
    return (
      <Paper elevation={0} sx={{ p: 2, bgcolor: "grey.200" }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ mt: 3, wordBreak: "break-word" }}
        >
          Error fetching data from «{url}»
        </Typography>
      </Paper>
    );

  return (
    <>
      {data?.slice(0, 12).map((thePost) => (
        <Item key={thePost.id} sx={{ thePost }}>
          <Card
            data-post-id={thePost.id}
            data-user-id={thePost.userId}
            sx={{ maxWidth: 345 }}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={postImage}
                alt={thePost.title}
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  style={{
                    textTransform: "capitalize",
                  }}
                >
                  {thePost.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {thePost.body}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Share
              </Button>
            </CardActions>
          </Card>
        </Item>
      ))}
    </>
  );
};

Main.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Main;
