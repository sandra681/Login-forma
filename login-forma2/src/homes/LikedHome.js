import axios from "axios";
import React, { useEffect, useState } from "react";
import authHeader from "../services/auth-header";

const LikedHomes = (props) => {
  const { token, removeAllLikedHomes, likedHomes, removeLikedHome } = props;
  const backendUrl = "http://127.0.0.1:8000/images/";
  const [imageName, setImageName] = useState ("");
  
    const {
      image
    }=props
    
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/fileupload/" + image, {
        headers: authHeader(),
      })
      .then((response) => {
        setImageName(response.data[0].filename);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  if (token !== "") {
    return (
      <section   className="interested">
        <div  style={{overflow:"auto" , height:"130px"}}>
        <h3>{likedHomes.length} liked apartments</h3>
        {likedHomes.map((home) => {
          return (
            
            <article key={home.id} className="in_apart">
              <img src={backendUrl + imageName} alt={home.name} />
              <div >
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
        </div>
        <button onClick={() => removeAllLikedHomes()}>Clear all</button>
      </section>
    );
  }
  return <div></div>;
};

export default LikedHomes;
