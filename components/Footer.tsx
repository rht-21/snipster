import React from "react";

const Footer = () => {
  return (
    <footer className="h-12 flex items-center justify-start px-m sm:justify-center text-foreground/60">
      &copy; Snipster 2024 | Developed by
      <a
        href="https://rht21.xyz/"
        target="_blank"
        className="ml-1 duration-200 text-red hover:text-foreground"
      >
        RHT21
      </a>
    </footer>
  );
};

export default Footer;
