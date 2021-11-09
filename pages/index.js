import React, { useState, useEffect } from "react";
import Head from "next/head";
import axios from "axios";

export default function Blog() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const url = "https://jsonplaceholder.typicode.com/posts";

  useEffect(() => {
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

  if (loading) return <h1>Loading data from url: {url}...</h1>;
  if (error) return "Error!";

  return (
    <>
      <Head>
        <title>Sanjish-blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ul>
        {data &&
          data.map((post) => (
            <li key={post.id}>
              <h2>{post.title}</h2>
              <div>{post.body}</div>
            </li>
          ))}
      </ul>
    </>
  );
}
