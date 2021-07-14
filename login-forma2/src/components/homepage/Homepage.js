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
import {
  deleteAllLikedApartment,
  deleteApartment,
  deleteLikedApartment,
  getApartments,
  storeLikedApartments,
} from "../../actions/apartments";
import apartmentServices from "../../services/apartment.services";

const Homepage = (props) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const user = useSelector((state) => state.userReducer);

  const [categories, setCategories] = useState([]); //Za sve kategorije to uzimamo dmah na pocetku

  const likedHomes = useSelector(
    (state) => state.apartmentsReducer
  ).likedApartments;

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
        if (user.isAdmin) {
          let adminApartments = response.data.data.filter(
            (one) => (one.user_id = user.user.id)
          );
          setFilterHomes(adminApartments);
          setPageCount(response.data["last_page"]);
          return;
        }
        setFilterHomes(response.data.data);
        setPageCount(response.data["last_page"]);
      })
      .catch((error) => console.log(error));
    // getFilteredHomes(filter, sort, order, search, page).then((result) => {
    //   setFilterHomes(result.data.data);
    //   setPageCount(result.data["last_page"]);
    // });
  }, [sort, order, filter, search, page, user]);

  let items = [];

  for (let i = 1; i < pageCount + 1; i++) {
    items.push(
      <Pagination.Item
        key={i}
        active={page === i}
        onClick={() => setPage(i)}
        activeLabel={false}
      >
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

  function removeHome(id) {
    setFilterHomes(filterHomes.filter((home) => home.id !== id));
  }
  const addLikedHome = (id) => {
    if (token === null) {
      props.history.push("/login");
    } else {
      if (
        likedHomes !== null &&
        likedHomes.filter((home) => home.id === id).length > 0
      ) {
        return;
      }
      dispatch(storeLikedApartments(user.user.id, id))
        .then(() => {
          // dispatch(getAllLikedApartmentsOfUser(user.user.id)).then(()=>console.log("ubacen")).catch((error)=>console.log(error));
          console.log("Liked home is stored");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  function categoryFilter(category) {
    if (category === "All") {
      setFilter("");
      return;
    }
    setPage(1);
    setFilter(category);
  }
  function deleteHome(id) {
    dispatch(deleteApartment(id))
      .then(() => {
        window.location.reload();
        console.log("Uspesno izbrisan");
      })
      .catch((error) => console.log(error));
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
      {/* <div className="slider">
        <p> slider </p>
      </div> */}

      {/* <div className="filter-container">
>>>>>>> 8de4233d2178abf254091bb4a56fa9745c7b0202
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
      <div className="box">
        <main>
          <section className="menu section">
            <div>
              {filterHomes.map((home1, index) => {
                let liked = false;
                if (
                  likedHomes !== null &&
                  likedHomes.filter((one) => one.id === home1.id).length !== 0
                ) {
                  liked = true;
                }
                return (
                  <Home
                    key={index}
                    removeHome={removeHome}
                    addLikedHome={addLikedHome}
                    deleteHome={deleteHome}
                    home1={home1}
                    history={props.history}
                    liked={liked}
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
        </main>
      </div>
      <div>
        {/* {!user.isAdmin && (
          <LikedHomes
            removeAllLikedHomes={removeAllLikedHomes}
            likedHomes={likedHomes}
            removeLikedHome={removeLikedHome}
          />
        )} */}
      </div>
    </div>
  );
};
export default Homepage;
