import React from "react";

function Story({ item }) {
  const { id, title, url, albumId } = item;
  return (
    <div className="box">
      <div className="header">
        Image {id} :: Album {albumId}
      </div>
      <div className="img">
        <img className="img-fluid rounded" loading="lazy" src={url} alt={`img_${id}`} />
      </div>
      <div className="description">
        <p>{title}</p>
      </div>
    </div>
  );
}

export default Story;
