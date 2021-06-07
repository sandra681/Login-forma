import React from "react";

const LikedHomes = (props) => {
  const { removeAllLikedHomes, likedHomes, removeLikedHome } = props;
  return (
    <section className="interested">
      <h3>{likedHomes.length} liked apartments</h3>
      {likedHomes.map((home) => {
        return (
          <article key={home.id} className="in_apart">
            <img src={home.image} alt={home.name} />
            <div>
              <h4>{home.name}</h4>
              <div style={{ display: "contents" }}>
                <p>${home.price}</p>
                <img
                  src="http://localhost:3000/images/close.png"
                  alt="close"
                  onClick={() => removeLikedHome(home.id)}
                  style={{ float: "right", width: "15px", height: "15px" }}
                ></img>
              </div>
            </div>
          </article>
        );
      })}
      <button onClick={() => removeAllLikedHomes()}>Clear all</button>
    </section>
  );
};

export default LikedHomes;
