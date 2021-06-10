import React, { useState, useEffect } from "react";
import Categories from "../../common/Categories";
import Home from "../../homes/Home";
import { getSomeHomes, deleteHome } from "../../api/residentialBuildingsApi";
import LikedHomes from "../../homes/LikedHome";
import { useHistory } from "react-router";
// import SearchBox from "../common/SearchBox";

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
    <div>
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
                    deleteHome={handleDeleteHome}
                    adminUser={adminUser}
                    editHome={editHome}
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
