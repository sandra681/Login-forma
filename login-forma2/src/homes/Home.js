import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import authHeader from "../services/auth-header";
const Home = (props) => {
  const { id, image, info, price, name, street, filename } = props.home1;
  const { removeHome, addLikedHome, deleteHome, liked } = props;
  const [readMore, setReadMore] = useState(false);
  const backendUrl = "http://127.0.0.1:8000/images/";
  const admin = useSelector((state) => state.userReducer).isAdmin;
  function editHome(id) {
    props.history.push("/form-home/" + id);
  }
  return (
    <article className="single-apartment">
      <img src={backendUrl + filename} alt={name}></img>
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
          <button
            className="delete-btn"
            onClick={() => addLikedHome(id)}
            disabled={liked}
          >
            {" "}
            interested
          </button>
        )}
      </footer>
    </article>
  );
};

export default Home;
