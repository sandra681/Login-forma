import React, { useState, useEffect } from "react";
import Categories from "../../common/Categories";
import Home from "../../homes/Home";
import { getCategories } from "../../api/residentialBuildingsApi";
import SearchBar from "../SearchBar";
import "./Homepage.css";
import { useDispatch, useSelector } from "react-redux";
import {  Pagination } from "react-bootstrap";
import {
  deleteApartment,
  deleteLikedApartment,
  getApartments,
  storeLikedApartments,
} from "../../actions/apartments";

const Homepage = (props) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const user = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const apartments = useSelector((state) => state.apartmentsReducer);
  const likedHomes = [...apartments.likedApartments];
  const filterHomes = [...apartments.apartments];
  const {
    page,
    setPage,
    pageCount,
    setFilter,
    setSort,
    setOrder,
    search,
    setSearch,
  } = props;
  let activePrev = false;
  let activeNext = false;
 
  useEffect(() => {
    getCategories().then((result) => {
      const niz = result.data.map((one) => one.category);
      setCategories(["All", ...niz]);
    });
  }, []);


  /* useEffect(() => {
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
        console.log(response.data["last_page"])
      })
      .catch((error) => console.log(error));
    // getFilteredHomes(filter, sort, order, search, page).then((result) => {
    //   setFilterHomes(result.data.data);
    //   setPageCount(result.data["last_page"]);
    // });
  }, [sort, order, filter, search, page, user]); */
  let itemsNumbers = [];
  let space=2;
  let left=page-space;
  let right=page+space+1;
  let itemsDots=[]
  let l;


  for (let i = 1; i < pageCount + 1; i++) {
    if(i===1 || i===pageCount || i>=left && i<right){
    itemsNumbers.push(
      i
    );
    }

  }

for(let i of itemsNumbers){
  
  if(l){
    if(i-l===2){
      itemsDots.push(
        <Pagination.Item
        key={l+1}
        active={page === l+1}
        onClick={() => setPage(l+1)}
        activeLabel={false}
      >
        {l+1}
      </Pagination.Item>
        
      )
    }else if(i-l!==1){
      itemsDots.push(
        <Pagination.Item
      
        activeLabel={false}
      >
        {'...'}
      </Pagination.Item>
      
     
        )

    }
  }
  itemsDots.push(
    <Pagination.Item
        key={i}
        active={page === i}
        onClick={() => setPage(i)}
        activeLabel={false}
      >
        {i}
      </Pagination.Item>
   
  );
  l=i;
}

  function checkPagePrev(page) {
    if (page === 1) {
      activePrev = true;
    } else {
      activePrev = false;
    }
    return activePrev;
  }
  function checkPageNext(page) {
    if (page === pageCount) {
      activeNext = true;
    } else {
      activeNext = false;
    }
    return activeNext;
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
          console.log("Liked home is stored");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  function removeLikedHome(id) {
    if (user.user === null) return;
    dispatch(deleteLikedApartment(user.user.id, id))
      .then(() => {
        console.log("Obrisano");
      })
      .catch((error) => {
        console.log(error);
      });
  }
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
        {filterHomes &&
          filterHomes.length > 0 &&
          filterHomes.map((home1, index) => {
            //liked
            let liked = false;
            if (
              likedHomes !== null &&
              likedHomes.filter((one) => one.id === home1.id).length !== 0
            ) {
              liked = true;
            }


          return (
            <div className="apartman"  key={index}>
              <Home
                key={index}
               // removeHome={removeHome}
                addLikedHome={addLikedHome}
                deleteHome={deleteHome}
                home1={home1}
                history={props.history}
                liked={liked}
                removeLikedHome={removeLikedHome}
              />
            </div>
          );
        })}

      </div>


      <div className="pagination">
        
      <Pagination>
              <Pagination.First onClick={() => setPage(1)} 
               disabled={checkPagePrev(page)}  >
                
               </Pagination.First>
                
              
              <Pagination.Prev
                onClick={() => {
                  page === 1 ? setPage(1) : setPage(page - 1);
                  

                }}
                
                hidden={checkPagePrev(page)}
              />
              {itemsDots}
              
              <Pagination.Next
                onClick={() =>
                  page === pageCount ? setPage(page) : setPage(page + 1)
                }
                hidden={checkPageNext(page)}
              />
              <Pagination.Last onClick={() => setPage(pageCount)}
               disabled={checkPageNext(page)} />
            </Pagination>

      

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
    </div>
  );
};

export default Homepage;
