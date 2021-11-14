import React from "react";

import Head from "next/head";
import Image from "next/image";

import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import TelegramIcon from "@mui/icons-material/Telegram";
import TwitterIcon from "@mui/icons-material/Twitter";

import Header from "../../Layout/Header";
import Footer from "../../Layout/Footer";

const postImage = "https://via.placeholder.com/600x440.webp?text=sanjish.blog";

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

function Post({ post }) {
  return (
    <>
      <Head>
        <title>{post.title} | sanjish.blog</title>
      </Head>

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="lg">
          <Header title="sanjishBlog" sections={sections} />
          <main style={{ margin: "2rem auto" }}>
            <Paper
              sx={{
                padding: "1.2rem",
                margin: "0 auto",
                maxWidth: "800px",
              }}
            >
              <Image
                src={postImage ? postImage : "https://source.unsplash.com/random"}
                width={1200}
                height={400}
                objectFit="cover"
              />
              <Typography
                sx={{ textTransform: "capitalize" }}
                gutterBottom
                variant="h4"
                component="h1"
              >
                {post.title}
              </Typography>
              <Typography
                variant="body"
                color="textSecondary"
                component="p"
                sx={{
                  fontSize: "1.2rem",
                }}
              >
                {post.body}
              </Typography>
            </Paper>
          </main>
        </Container>
        <Footer
          title="sanjishBlog"
          description="All Rights Reserved!"
          social={social}
        />
      </ThemeProvider>
    </>
  );
}

export async function getStaticPaths() {
  const posts = await fetch("https://jsonplaceholder.typicode.com/posts").then(
    (res) => res.json()
  );
  const paths = posts.map((post) => ({
    params: { id: post.id.toString() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const post = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`
  ).then((res) => res.json());
  return { props: { post } };
}

export default Post;
