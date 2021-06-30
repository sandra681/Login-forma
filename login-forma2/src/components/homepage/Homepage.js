import React, { useState, useEffect } from "react";
import Categories from "../../common/Categories";
import Home from "../../homes/Home";
import {
  deleteHome,
  getCategories,
  getFilteredHomes,
} from "../../api/residentialBuildingsApi";
import LikedHomes from "../../homes/LikedHome";
// import SearchBox from "../common/SearchBox";
import SearchBar from "../SearchBar";
import "./Homepage.css";

const Homepage = (props) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const admin = false;
  const [categories, setCategories] = useState([]); //Za sve kategorije to uzimamo dmah na pocetku

  const [likedHomes, setLikedHomes] = useState([]);

  const [filterHomes, setFilterHomes] = useState([]); //Ove za sve

  const [num, setNum] = useState(10); //broj da se prikaze

  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("name");
  const [order, setOrder] = useState("asc");
  const [input, setInput] = useState("");

  const [remeberFiletrHomes, setRemeberFilterHomes] = useState(); //ovim pamtimo filtrirane za Search Adress

  useEffect(() => {
    getCategories().then((result) => {
      const niz = result.map((one) => one.category);
      setCategories(["All", ...niz]);
    });
  }, []);

  useEffect(() => {
    getFilteredHomes(filter, sort, order, num).then((result) => {
      setFilterHomes(result);
    });
  }, [sort, order, filter, num]);

  function editHome() {
    props.history.push("/addpage"); // i ovde proveriti oko history da li moze ovako ili je potrebno da uvezemo history
  }

  async function updateInput(input) {
    if (input === "") {
      setFilterHomes(remeberFiletrHomes);
      setInput("");
      //  return;
    }
    const filtered = filterHomes.filter((street) => {
      return street.street.toLowerCase().includes(input.toLowerCase());
    });
    setInput(input);
    setFilterHomes(filtered); //setFilterHomes
  }

  function sortByInput(e) {
    const value = e.target.value.split("_")[0];
    const order = e.target.value.split("_")[1];
    setSort(value);
    setOrder(order);
  }
  function removeAllLikedHomes() {
    setLikedHomes([]);
  }
  function removeLikedHome(id) {
    setLikedHomes(likedHomes.filter((home) => home.id !== id));
  }
  function removeHome(id) {
    setFilterHomes(filterHomes.filter((home) => home.id !== id));
  }
  const addLikedHome = (id) => {
    if (likedHomes.filter((home) => home.id === id).length > 0) {
      return;
    }
    const likedhome = [
      ...likedHomes,
      filterHomes.filter((home) => home.id === id)[0],
    ];
    setLikedHomes(likedhome);
    console.log(likedHomes);
  };

  function categoryFilter(category) {
    if (category === "All") {
      setFilter("");
      return;
    }
    setFilter(category);
  }

  function handleDeleteHome(id) {
    deleteHome(id).then((response) => {
      if (response.status === 204) {
        setNum(10);
        setTimeout(() => {}, 2000);
        return;
      } else {
        setNum(10);
        console.log("Failed to delete");
        return;
      }
    });
  }

  document.body.style.background = "#fff";
  return (
    <div className="homepage">
      <header
        className="head"

        /* style={{backgroundImage:` url("https://assets.architecturaldigest.in/photos/60084bc8d0435267a8df97f8/16:9/w_2560%2Cc_limit/The-Drawing-Studio-mumbai-interior-design_2-1366x768.jpg")`,
  height: "500px",
  maxWidth: "2000px",
  backgroundSize:"cover",
  backgroundRepeat:"no-repeat"
 }} */
      >
        <div className="title">
          <h2>Find Home</h2>
          <div className="underline"></div>
        </div>
        <div className="search">
          <SearchBar input={input} onChange={updateInput}></SearchBar>
        </div>
        {admin && (
          <button
            type="button"
            className="btn btn-danger"
            style={{ marginLeft: "90vw" }}
            onClick={() => editHome()}
          >
            Add Home
          </button>
        )}
      </header>

      <div className="filter-container">
        <div className="aa"></div>

        <div className="category">
          <Categories categories={categories} categoryFilter={categoryFilter} />
        </div>

        <div className="sort">
          <select
            defaultValue=""
            className="sort-select"
            onChange={(e) => {
              sortByInput(e);
            }}
          >
            <option value="" disabled>
              -Sort By-
            </option>
            <option value="name_asc">Name - A - Z</option>
            <option value="name_desc">Name - Z - A</option>
            <option value="price_asc">Price - Lowest to Highest</option>
            <option value="price_desc">Price - Highest to Lowest</option>
          </select>
        </div>
      </div>
      <div className="box">
        <main>
          <section className="menu section">
            <div>
              {filterHomes.map((home1) => {
                return (
                  <Home
                    key={home1.id}
                    removeHome={removeHome}
                    addLikedHome={addLikedHome}
                    deleteHome={handleDeleteHome}
                    admin={admin}
                    editHome={editHome}
                    home1={home1}
                    {...home1}
                  />
                );
              })}
            </div>
            <button
              className="loadMore"
              onClick={() => {
                setNum(num + 10);
              }}
            >
              Load more
            </button>
          </section>

          <div>
            {!admin && (
              <LikedHomes
                token={token}
                removeAllLikedHomes={removeAllLikedHomes}
                likedHomes={likedHomes}
                removeLikedHome={removeLikedHome}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
export default Homepage;
