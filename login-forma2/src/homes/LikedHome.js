import React from "react";

const LikedHomes = (props) => {
  const { token, removeAllLikedHomes, likedHomes, removeLikedHome } = props;
  if (token !== "") {
    return (
      <section className="interested">
        <div style={{ overflow: "auto", height: "130px" }}>
          <h3>
            {likedHomes !== null ? likedHomes.length : 0} liked apartments
          </h3>
          {likedHomes !== null &&
            likedHomes.map((home) => {
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
                        style={{
                          float: "right",
                          width: "15px",
                          height: "15px",
                        }}
                      ></img>
                    </div>
                  </div>
                </article>
              );
            })}
        </div>
        <button onClick={() => removeAllLikedHomes()}>Clear all</button>
      </section>
    );
  }
  return <div></div>;
};

export default LikedHomes;
