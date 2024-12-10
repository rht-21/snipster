"use client";

import React from "react";
import HomeCard from "../ui/home-card";

const HomeCardsLayout = () => {
  return (
    <section className="flex items-center justify-center flex-col lg:flex-row gap-xs">
      <div className="flex flex-col sm:flex-row gap-xs flex-grow w-full">
        <HomeCard
          href="/explore"
          text="Explore More Snippets"
          className="hover:hue-rotate-90"
        />
        <HomeCard
          href="/snippets"
          text="View Created Snippets"
          className="hue-rotate-180 hover:hue-rotate-90"
        />
      </div>
    </section>
  );
};

export default HomeCardsLayout;
