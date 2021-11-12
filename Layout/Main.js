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
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Masonry from "@mui/lab/Masonry";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

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
  const [toggle, setToggle] = React.useState(false);
  const [ten, setTen] = React.useState(false);
  const [twenty, setTwenty] = React.useState(false);
  const [fifty, setFifty] = React.useState(false);

  const url = "https://jsonplaceholder.typicode.com/posts";

  // temporary using first img
  const postImage = "https://via.placeholder.com/150/92c952";

  const {
    handleChange,
    handleClick,
    handleTen,
    handleTwenty,
    handleFifty,
    search,
  } = filteringFunctions();

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

  function ColorToggleButton() {
    const [alignment, setAlignment] = React.useState('All');
  };
    const handleToggleChange = (e, newAlignment) => {
      setAlignment(newAlignment);
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

 {/* Added the ability to filter by amount of posts (10, 20, 50) */}

        <ToggleButtonGroup
          color="primary"
          value={ColorToggleButton.alignment}
          exclusive
          onChange={handleToggleChange}
        >
          <ToggleButton onClick={handleClick} value="All">All</ToggleButton>
          <ToggleButton onClick={handleTen} value="10">10</ToggleButton>
          <ToggleButton onClick={handleTwenty} value="20">20</ToggleButton>
          <ToggleButton onClick={handleFifty} value="50">50</ToggleButton>
        </ToggleButtonGroup>
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
            {search(data)
              .slice(0, ten ? 10 : twenty ? 20 : fifty ? 50 : 100)
              .map(({ id, title, body, userId }) => (
                <Item key={id}>
                  <Card sx={{ dataUserId: `${userId}`, dataPostId: `${id}` }}>
                    <CardActionArea>
                        <CardMedia
                          component="img"
                          alt="The Alternative Text for Img"
                          height="140"
                          image={postImage}
                          title="The Title of Img"
                        />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {body.length > 99
                            ? body.substring(
                                0,
                                body.substring(0, 99 + 1).search(/\s+\S*$/)
                              )
                            : body}
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

  function filteringFunctions() {
    const handleClick = (e) => {
      e.preventDefault();
      setToggle(!toggle);
      setTen(false);
      setTwenty(false);
      setFifty(false);
    };

    const handleTen = (e) => {
      e.preventDefault();
      setTen(!ten);
      setToggle(false);
      setTwenty(false);
      setFifty(false);
    };

    const handleTwenty = (e) => {
      e.preventDefault();
      setTwenty(!twenty);
      setToggle(false);
      setTen(false);
      setFifty(false);
    };

    const handleFifty = (e) => {
      e.preventDefault();
      setFifty(!fifty);
      setToggle(false);
      setTen(false);
      setTwenty(false);
    };

    const search = (data) => {
      const searchResult = data.filter((post) => {
        return post[searchParam].toLowerCase().includes(q.toLowerCase());
      });
      return searchResult;
    };

    const handleChange = (e) => {
      setQ(e.target.value);
    };
    return {
      handleChange,
      handleClick,
      handleTen,
      handleTwenty,
      handleFifty,
      search,
    };
  }
};

export default Main;
