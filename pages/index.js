import React from "react";
import Head from "next/head";

import Blog from "../Layout/Blog"

const Index = () => {
  return (
    <>
      <Head>
        <title>Sanjish-blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Blog />
    </>
  );
};

export default Index;
