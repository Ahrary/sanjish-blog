import * as React from "react";
import axios from "axios";

import Image from "next/image";
import Link from "next/link";

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
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  border: ".2px solid black",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const truncate = (str, max, suffix) =>
  str.length < max
    ? str
    : `${str.substr(
        0,
        str.substr(0, max - suffix.length).lastIndexOf(" ")
      )}${suffix}`;

const Main = () => {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [q, setQ] = React.useState("");
  const [searchParam] = React.useState("title");
  const [all, setAll] = React.useState(false);
  const [ten, setTen] = React.useState(true);
  const [twenty, setTwenty] = React.useState(false);
  const [fifty, setFifty] = React.useState(false);
  const [alignment, setAlignment] = React.useState("10");
  const [showMore, setShowMore] = React.useState(false);

  const apiUrl = "https://jsonplaceholder.typicode.com/posts";

  // temporary using first img
  const postImage =
    "https://via.placeholder.com/300x140.webp?text=sanjish.blog";

  React.useEffect(() => {
    axios(apiUrl)
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

  const {
    handleAll,
    handleTen,
    handleTwenty,
    handleFifty,
    handleToggleChange,
  } = filteringFunctions();

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
          value={alignment}
          exclusive
          onChange={handleToggleChange}
        >
          <ToggleButton onClick={handleAll} value="All">
            All
          </ToggleButton>
          <ToggleButton onClick={handleTen} value={10}>
            10
          </ToggleButton>
          <ToggleButton onClick={handleTwenty} value={20}>
            20
          </ToggleButton>
          <ToggleButton onClick={handleFifty} value={50}>
            50
          </ToggleButton>
        </ToggleButtonGroup>
      </Paper>

      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error.message}</div>
      ) : (
        <div>
          <Masonry
            columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
            spacing={2}
            defaultHeight={450}
            defaultColumns={4}
            defaultSpacing={2}
            sx={{ m: 0, p: 0 }}
          >
            {search(data)
              .slice(0, ten ? 10 : twenty ? 20 : fifty ? 50 : 100) // default is 10
              .map(({ id, title, body, userId }) => (
                <Item key={id} data-user-id={userId} data-post-id={id}>
                  <Card>
                    <CardActionArea>
                      <Link href="/post/[id]" as={`/post/${id}`}>
                        <a style={{color: "#333", textDecoration: "none"}}>
                          <CardMedia
                            component="div"
                            alt="The Alternative Text for Img"
                            height="140"
                            title="The Title of Img"
                          >
                            <Image
                              src={postImage}
                              width={300}
                              height={200}
                              objectFit="cover"
                            />
                          </CardMedia>
                          <CardContent>
                            <Typography
                              sx={{ textTransform: "capitalize" }}
                              gutterBottom
                              variant="h5"
                              component="h2"
                            >
                              {title}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="p"
                            >
                              {showMore ? body : truncate(body, 80, "...")}
                            </Typography>
                          </CardContent>
                        </a>
                      </Link>
                    </CardActionArea>
                    <CardActions>
                      <Button size="small" color="primary">
                        Share
                      </Button>
                      <Button
                        onClick={() => setShowMore(!showMore)}
                        size="small"
                        color="primary"
                      >
                        {showMore ? "Show less" : "Show more"}
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
    const handleAll = (e) => {
      e.preventDefault();
      setAll(!all);
      setTen(false);
      setTwenty(false);
      setFifty(false);
    };

    const handleTen = (e) => {
      e.preventDefault();
      setTen(!ten);
      setAll(false);
      setTwenty(false);
      setFifty(false);
    };

    const handleTwenty = (e) => {
      e.preventDefault();
      setTwenty(!twenty);
      setAll(false);
      setTen(false);
      setFifty(false);
    };

    const handleFifty = (e) => {
      e.preventDefault();
      setFifty(!fifty);
      setAll(false);
      setTen(false);
      setTwenty(false);
    };

    const handleToggleChange = (e) => {
      setAlignment(e.target.value);
    };

    return {
      handleAll,
      handleTen,
      handleTwenty,
      handleFifty,
      handleToggleChange,
    };
  }
};

export default Main;
