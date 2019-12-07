import React from "react";
import logo from "./logo.svg";
import "./home.css";

function Home() {
  return (
    <div className="Home">
      <header className="Home-header">
        <img src={logo} className="Home-logo" alt="logo" />
        <a
          className="Home-link"
          href="https://webpack.js.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Webpack
        </a>
      </header>
    </div>
  );
}

export default Home;
