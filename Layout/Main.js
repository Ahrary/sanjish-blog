import * as React from "react";
import axios from "axios";

import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Masonry from "@mui/lab/Masonry";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  border: ".2px solid black",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const Main = () => {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [q, setQ] = React.useState("");
  const [searchParam] = React.useState("title");
  const [filterParam, setFilterParam] = React.useState(["All"]);
  const [open, setOpen] = React.useState(false);

  const url = "https://jsonplaceholder.typicode.com/posts";

  // temporary using random picture from unsplash
  const postImage = "https://source.unsplash.com/random";

  React.useEffect(() => {
    axios(url)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  const search = (data) => {
    const searchResult = data.filter((post) => {
      return post[searchParam].toLowerCase().includes(q.toLowerCase());
    });
    return searchResult;
  };

  const handleChange = (e) => {
    setQ(e.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          mb: 2,
          display: "flex",
          alignItems: "center",
          width: "auto",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          value={q}
          onChange={handleChange}
          placeholder="Search by Title"
          inputProps={{ "aria-label": "search by title" }}
        />
        <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>

        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="filter-open-select-label">Filter</InputLabel>
          <Select
            labelId="filter-select-label"
            id="filter-open-select"
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={filterParam}
            label="Filter"
            onChange={(e) => {
              setFilterParam(e.target.value);
            }}
          >
            <MenuItem value="All">
              <em>All</em>
            </MenuItem>
            <MenuItem value="10">10</MenuItem>
            <MenuItem value="20">20</MenuItem>
            <MenuItem value="50">50</MenuItem>
          </Select>
        </FormControl>
      </Paper>

      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error.message}</div>
      ) : (
        <div>
          <Masonry
            columns={4}
            spacing={2}
            defaultHeight={450}
            defaultColumns={4}
            defaultSpacing={2}
          >
            {search(data).map((post) => (
              <Item key={post.id}>
                <Card>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt="Contemplative Reptile"
                      height="140"
                      image={postImage}
                      title="Contemplative Reptile"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {post.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {post.body}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary">
                      Share
                    </Button>
                    <Button size="small" color="primary">
                      Learn More
                    </Button>
                  </CardActions>
                </Card>
              </Item>
            ))}
          </Masonry>
        </div>
      )}
    </div>
  );
};

export default Main;
