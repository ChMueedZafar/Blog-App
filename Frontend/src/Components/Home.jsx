// eslint-disable-next-line no-unused-vars
import React from "react";
import Hero from "../Home/Hero";
import Trending from "../Home/Tranding";
import Devotional from "../Home/Devetional";
import Creator from "../Home/Creator";

function Home() {
  return (
    <div>
      <Hero />
      <Trending />
      <Devotional />
      <Creator />
    </div>
  );
}

export default Home;