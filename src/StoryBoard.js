import React, { useState, useEffect, useRef } from "react";
import Story from "./Story";
import axios from "axios";

function StoryBoard() {
  // Tracks current page number
  const [page, setPage] = useState(1);
  //label to show loading
  const [loading, setLoading] = useState(false);
  // List of records
  const [storiesData, setStoriesData] = useState([]);

  // utility function to fetch data
  const loadImages = () => {
    setLoading(true);
    axios
      .get(
        `https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=10`
      )
      .then((res) => {
        setStoriesData([...storiesData, ...res.data]);
        setPage((p) => p + 1);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e.message);
        setLoading(false);
      });
  };
  // ref used to get the latest snapshot of this function
  const loader = useRef(loadImages);
  // updating to latest snapshot of function
  useEffect(() => {
    loader.current = loadImages;
  }, [loadImages]);

  // Observer reference that checks for scroll
  const observer = useRef(
    new IntersectionObserver(
      (entries, observer) => {
        const first = entries[0];
        if (first.isIntersecting) {
          loader.current();
        }
      },
      {
        threshold: 1, 
      }
    )
  );

  const [element, setElement] = useState(null);

  useEffect(() => {
    const currentElement = element;
    const currentObserver = observer.current;
    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [element]);

  return (
    <div className="parent">
      {storiesData.map((item, index) => {
        return <Story item={item} key={index} />;
      })}
      {/* using set function insted of ref itself to indicate when to render this element*/}
      <div ref={setElement}>
        <span style={{ display: loading ? "block" : "none" }}>Loading...</span>
      </div>
    </div>
  );
}

export default StoryBoard;
