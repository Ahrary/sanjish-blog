import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, CardActionArea, CardActions } from '@mui/material';

function Main() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const url = 'https://jsonplaceholder.typicode.com/posts';
  const postImage = 'https://source.unsplash.com/random';

  useEffect(() => {
    axios(url)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return `Loading data from url: ${url}...`;
  if (error) return 'Error!';

  return (
    <>
    <Grid
      container
      spacing={1}
      direction="row"
      justifyContent="center"
      alignItems="center"
      alignContent="center"
      wrap="wrap"
    >
      <Typography variant='h3' gutterBottom sx={{ mt: 6 }}>
        Blog Posts
      </Typography>
      <Divider />
    </Grid>
      {data && data.slice(0, 12).map((post) => (
        <Grid item xs={12} sm={6} md={3} key={post.id}>
          <Card
            data-post-id={post.id}
            data-user-id={post.userId}
            sx={{ maxWidth: 345 }}>
          <CardActionArea>
             <CardMedia
              component="img"
              height="140"
              image={postImage}
              alt='Image Label'
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                style={{
                    textTransform: 'capitalize'
                }}>
              {post.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
              {post.body}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              Share
            </Button>
          </CardActions>
        </Card>
      </Grid>
      ))}
    </>
  );
}

Main.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
};

export default Main;
