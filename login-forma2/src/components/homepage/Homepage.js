import React, { useState, useEffect } from "react";
import Categories from "../../common/Categories";
import Home from "../../homes/Home";
import { getSomeHomes, deleteHome } from "../../api/residentialBuildingsApi";
import LikedHomes from "../../homes/LikedHome";
import { useHistory } from "react-router";
// import SearchBox from "../common/SearchBox";
import SearchBar from "../SearchBar";
import _ from "lodash";

const Homepage = (props) => {
  const { currentUser, adminUser } = props;
  const [loadMore, setLoadMore] = useState(false);
  const [homes, setHomes] = useState([]);
  const [likedHomes, setLikedHomes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filterHomes, setFilterHomes] = useState([]);
  const [num, setNum] = useState(10);
  const history = useHistory();

  function editHome() {
    history.push("/addpage");
  }

  useEffect(() => {
    if (loadMore === true || num === 10) {
      setNum(num + 10);
      getSomeHomes(num).then(
        (result) => {
          setFilterHomes(result);
          setHomes(result);
          setLoadMore(false);
          setCategories(["all", ...new Set(result.map((one) => one.category))]);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }, [num, loadMore]);
  const [input, setInput] = useState("");

  async function updateInput(input) {
    if (input === "") {
      setFilterHomes(filterHomes);
      setInput("");
      return;
    }
    const filtered = filterHomes.filter((street) => {
      return street.street.toLowerCase().includes(input.toLowerCase());
    });
    console.log(filtered);
    setInput(input);
    setFilterHomes(filtered); //setFilterHomes
  }

  function sortByInput(e) {
    const value = e.target.value;

    const order = value.endsWith("asc") ? "asc" : "desc";

    var sortHome;
    if (value.startsWith("price")) {
      sortHome = _.orderBy(filterHomes, ["price"], [order]);
    } else {
      sortHome = _.orderBy(filterHomes, ["name"], [order]);
    }

    setFilterHomes(sortHome);
  }

  // useEffect(() => {
  //   setHomes(filterHomes);
  //   setCategories(["all", ...new Set(homes.map((one) => one.category))]);
  // }, []);
  useEffect(() => {
    if (loadMore === true || num === 10) {
      setNum(num + 10);
      getSomeHomes(num).then(
        (result) => {
          setHomes(result);
          setLoadMore(false);
          setCategories(["all", ...new Set(result.map((one) => one.category))]);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }, [num, loadMore]);
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
    if (category === "all") {
      setFilterHomes(homes);
      return;
    }
    setFilterHomes(homes.filter((home) => home.category === category));
  }

  function handleDeleteHome(id) {
    deleteHome(id).then((response) => {
      if (response.status === 204) {
        setNum(10);
        setLoadMore(true);
        setTimeout(() => {}, 2000);
        return;
      } else {
        setNum(10);
        console.log("Failed to delete");
        return;
      }
    });
  }
  return (
    <div className="homepage">
      <header>
        <div className="title">
          <h2>Find Home</h2>
          <div className="underline"></div>
        </div>
        {adminUser && (
          <button
            type="button"
            className="btn btn-danger"
            style={{ marginLeft: "90vw" }}
            onClick={() => editHome()}
          >
            Add Home
          </button>
        )}
        <Categories categories={categories} categoryFilter={categoryFilter} />
      </header>
      <div className="filter-container">
        <div className="search">
          <SearchBar input={input} onChange={updateInput}></SearchBar>
        </div>
        <div className="sort">
          <select
            className="sort-select"
            onChange={(e) => {
              sortByInput(e);
            }}
          >
            <option value="" disabled selected>
              Sort By
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
                    adminUser={adminUser}
                    editHome={editHome}
                    home1={home1}
                    {...home1}
                  />
                );
              })}
            </div>
            <button className="loadMore" onClick={() => setLoadMore(true)}>
              Load more
            </button>
          </section>

          <div>
            {!adminUser && (
              <LikedHomes
                userToken={currentUser}
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
