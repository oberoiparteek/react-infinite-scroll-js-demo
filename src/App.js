import React from "react";
import StoryBoard from "./StoryBoard";
import "./style.css";

export default function App() {
  return (
    <div>
      <header>
        <nav
          className="navbar fixed-top navbar-light bg-light p-3"
        >
          <a className="navbar-brand h1" href="#">
            Infinite Scrolling Demo
          </a>
          <button
           className="btn btn-dark"
            onClick={(e) =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
          >
            Go to Top
          </button>
        </nav>
      </header>

      <section>
        <div className="container" id="postsHome">
          <StoryBoard />
        </div>
      </section>

      <footer className="fixed-bottom p-3 bg-dark text-white"><span>Thanks for your time</span></footer>
    </div>
  );
}
