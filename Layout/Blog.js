import * as React from "react";

import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import TelegramIcon from "@mui/icons-material/Telegram";
import TwitterIcon from "@mui/icons-material/Twitter";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Masonry from '@mui/lab/Masonry';
import Typography from '@mui/material/Typography';

import Header from "./Header";
import MainFeaturedPost from "./MainFeaturedPost";
import FeaturedPost from "./FeaturedPost";
import Main from "./Main";
import Footer from "./Footer";

const sections = [
  { title: "Technology", url: "#" },
  { title: "Design", url: "#" },
  { title: "Culture", url: "#" },
  { title: "Business", url: "#" },
  { title: "Politics", url: "#" },
  { title: "Opinion", url: "#" },
  { title: "Science", url: "#" },
  { title: "Health", url: "#" },
  { title: "Style", url: "#" },
  { title: "Travel", url: "#" },
];

const mainFeaturedPost = {
  title: "Title of a longer featured blog post",
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: "https://source.unsplash.com/random",
  imageText: "main image description",
  linkText: "Continue…",
};

const featuredPosts = [
  {
    title: "Featured post",
    date: "Nov 12",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    image: "https://source.unsplash.com/random",
    imageLabel: "Image Text",
  },
  {
    title: "Post title",
    date: "Nov 11",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    image: "https://source.unsplash.com/random",
    imageLabel: "Image Text",
  },
];

const social = [
  {
    name: "GitHub",
    icon: GitHubIcon,
    url: "https://github.com/ahrary",
  },
  {
    name: "Twitter",
    icon: TwitterIcon,
    url: "https://twitter.com/ahraary",
  },
  {
    name: "Telegram",
    icon: TelegramIcon,
    url: "https://t.me/ahrary",
  },
  {
    name: "Facebook",
    icon: FacebookIcon,
    url: "https://fb.me/ahraary",
  },
];

const theme = createTheme();

const Blog = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="sanjishBlog" sections={sections} />
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
            <Typography variant="h3" gutterBottom>
              Blog Posts
            </Typography>
          <Masonry
            columns={4}
            spacing={2}
            defaultHeight={450}
            defaultColumns={4}
            defaultSpacing={2}
          >

            <Main title="Blog Posts" />
          </Masonry>
        </main>
      </Container>
      <Footer
        title="sanjishBlog"
        description="All Rights Reserved!"
        social={social}
      />
    </ThemeProvider>
  );
};

export default Blog;
