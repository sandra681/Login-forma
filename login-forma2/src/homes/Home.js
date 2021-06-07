import React, { useState } from "react";

const Home = (props) => {
  const { id, image, info, price, name, street, removeHome, addLikedHome } =
    props;
  const [readMore, setReadMore] = useState(false);
  return (
    <article className="single-apartment">
      <img src={image} alt={name}></img>
      <footer>
        <div className="apartment-info">
          <h4>{name}</h4>
          <h4 className="apartment-price">${price}</h4>
        </div>
        <div className="apartment-contact">
          <p>{street}</p>
        </div>
        <p>
          {readMore ? info : `${info.substring(0, 200)}...`}
          <button onClick={() => setReadMore(!readMore)}>
            {readMore ? "show less" : "read more"}
          </button>
        </p>
        <button className="delete-btn" onClick={() => removeHome(id)}>
          {" "}
          not interested
        </button>
        <button className="delete-btn" onClick={() => addLikedHome(id)}>
          {" "}
          interested
        </button>
      </footer>
    </article>
  );
};

export default Home;
