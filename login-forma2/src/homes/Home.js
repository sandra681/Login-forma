import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import authHeader from "../services/auth-header";
const Home = (props) => {
  const {
    id,
    image,
    info,
    price,
    name,
    street,
    removeHome,
    addLikedHome,
    deleteHome,
  } = props;
  const [readMore, setReadMore] = useState(false);
  const backendUrl = "http://127.0.0.1:8000/images/";
  const [imageName, setImageName] = useState("");
  const admin = useSelector((state) => state.userReducer).isAdmin;
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
  function editHome(id) {
    props.history.push("/form-home/" + id);
  }
  return (
    <article className="single-apartment">
<<<<<<< HEAD
      <img src={backendUrl+ imageName} alt={name}></img>
=======
      <img src={backendUrl + imageName} alt={name}></img>
>>>>>>> designAH
      <footer>
        <div className="apartment-info">
          <h4>{name}</h4>
          <p>{props.home1.category}</p>
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
        {admin && (
          <button className="delete-btn" onClick={() => editHome(id)}>
            {" "}
            EDIT
          </button>
        )}
        {admin && (
          <button className="delete-btn" onClick={() => deleteHome(id)}>
            {" "}
            DELETE
          </button>
        )}
        {!admin && (
          <button className="delete-btn" onClick={() => removeHome(id)}>
            {" "}
            not interested
          </button>
        )}
        {!admin && (
          <button className="delete-btn" onClick={() => addLikedHome(id)}>
            {" "}
            interested
          </button>
        )}
      </footer>
    </article>
  );
};

export default Home;
