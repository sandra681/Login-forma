import React, { useState, useEffect } from "react";
import Categories from "../../common/Categories";
import Home from "../../homes/Home";
import { deleteHome, getCategories } from "../../api/residentialBuildingsApi";
import LikedHomes from "../../homes/LikedHome";
// import SearchBox from "../common/SearchBox";
import SearchBar from "../SearchBar";
import "./Homepage.css";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "react-bootstrap";
import { getApartments } from "../../actions/apartments";

const Homepage = (props) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const isAdmin = useSelector((state) => state.userReducer);

  const [categories, setCategories] = useState([]); //Za sve kategorije to uzimamo dmah na pocetku

  const [likedHomes, setLikedHomes] = useState([]);

  const [filterHomes, setFilterHomes] = useState([]); //Ove za sve

  const [page, setPage] = useState(1); //koja je strana u pitanju
  const [pageCount, setPageCount] = useState(1);

  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("name");
  const [order, setOrder] = useState("asc");
  // const [input, setInput] = useState("");
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    getCategories().then((result) => {
      const niz = result.data.map((one) => one.category);
      setCategories(["All", ...niz]);
    });
  }, []);

  useEffect(() => {
    dispatch(getApartments(filter, sort, order, search, page))
      .then((response) => {
        console.log(response.data.data);
        setFilterHomes(response.data.data);
        setPageCount(response.data["last_page"]);
      })
      .catch((error) => console.log(error));
    // getFilteredHomes(filter, sort, order, search, page).then((result) => {
    //   setFilterHomes(result.data.data);
    //   setPageCount(result.data["last_page"]);
    // });
  }, [sort, order, filter, search, page]);

  function addHome() {
    props.history.push("/form-home/");
  }
  let items = [];

  for (let i = 1; i < pageCount + 1; i++) {
    items.push(
      <Pagination.Item key={i} active={page === i} onClick={() => setPage(i)}>
        {i}
      </Pagination.Item>
    );
  }

  async function updateInput(input) {
    setSearch(input);
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
    setPage(1);
    setFilter(category);
  }
  //Ovo ne radi
  function handleDeleteHome(id) {
    deleteHome(id).then((response) => {
      if (response.status === 204) {
        setPage(10);
        setTimeout(() => {}, 2000);
        return;
      } else {
        setPage(10);
        console.log("Failed to delete");
        return;
      }
    });
  }

  return (
    <div className="homepage">
      <header className="head">
        <div className="title">
          <h2>
            {" "}
            Find your<br></br>Perfect home
          </h2>
          {/* <div className="underline"></div> */}
        </div>
        <div className="filter-container">
          <div className="aa"></div>

          <div className="category">
            <Categories
              categories={categories}
              categoryFilter={categoryFilter}
            />
          </div>
        </div>
        <div className="search">
          <SearchBar input={search} onChange={updateInput}></SearchBar>
        </div>
      </header>
      <div className="slider">
        <h2> SLider</h2>
      </div>

      {/* <div className="filter-container">
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
      </div> */}
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

      <div className="btn-add-home">
        {isAdmin.isAdmin && (
          <button
            type="button"
            className=" btn btn-danger"
            onClick={() => addHome()}
          >
            Add Home
          </button>
        )}
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
                    home1={home1}
                    history={props.history}
                    {...home1}
                  />
                );
              })}
            </div>
            <Pagination>
              <Pagination.First onClick={() => setPage(1)} />
              <Pagination.Prev
                onClick={() => {
                  page === 1 ? setPage(1) : setPage(page - 1);
                }}
              />
              {items}
              <Pagination.Next
                onClick={() =>
                  page === pageCount ? setPage(page) : setPage(page + 1)
                }
              />
              <Pagination.Last onClick={() => setPage(pageCount)} />
            </Pagination>
          </section>

          <div>
            {!isAdmin.isAdmin && (
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
