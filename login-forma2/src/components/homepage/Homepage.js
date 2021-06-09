import React, { useState, useEffect } from "react";
import Categories from "../../common/Categories";
import Home from "../../homes/Home";
import { getSomeHomes } from "../../api/residentialBuildingsApi";
import LikedHomes from "../../homes/LikedHome";
// import SearchBox from "../common/SearchBox";

const Homepage = (props) => {
  const { userToken } = props;
  const [loadMore, setLoadMore] = useState(false);
  const [homes, setHomes] = useState([]);
  const [likedHomes, setLikedHomes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filterHomes, setFilterHomes] = useState([]);
  const [num, setNum] = useState(10);

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
  return (
    <div>
      <header>
        <div className="title">
          <h2>Find Home</h2>
          <div className="underline"></div>
        </div>
        <Categories categories={categories} categoryFilter={categoryFilter} />
      </header>
      <div className="box">
        <div>{/* <SearchBox /> */}</div>
        <main>
          <section className="menu section">
            <div>
              {filterHomes.map((home1) => {
                return (
                  <Home
                    key={home1.id}
                    removeHome={removeHome}
                    addLikedHome={addLikedHome}
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
            <LikedHomes
              userToken={userToken}
              removeAllLikedHomes={removeAllLikedHomes}
              likedHomes={likedHomes}
              removeLikedHome={removeLikedHome}
            />
          </div>
        </main>
      </div>
    </div>
  );
};
export default Homepage;
