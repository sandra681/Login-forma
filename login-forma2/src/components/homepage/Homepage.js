import React, { useState, useEffect } from "react";
import Categories from "../../common/Categories";
import Home from "../../homes/Home";
import { getSomeHomes } from "../../api/residentialBuildingsApi";
import LikedHomes from "../../homes/LikedHome";
// import SearchBox from "../common/SearchBox";
import data from '../../data';
import SearchBar from "../SearchBar";
import _ from 'lodash'
import { ThreeSixty } from "@material-ui/icons";

const Homepage = (props) => {
  const { currentUser } = props;
  const [loadMore, setLoadMore] = useState(false);
  const [homes, setHomes] = useState([]); 
  const [likedHomes, setLikedHomes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [num, setNum] = useState(10);
  const [input, setInput]=useState('')
   
   

  

    async function updateInput  (input) {
     if(input===''){
       setHomes(data)
       setInput('')
       return ;
     }
      const filtered = homes.filter(street => {
       return street.street.toLowerCase().includes(input.toLowerCase())
      })
      setInput(input);
      setHomes(filtered); //setFilterHomes
   }


   function sortByInput(e){
     const value=e.target.value;
     console.log(value)
     const order=value.endsWith('asc') ? "asc" : "desc"

     console.log(order)
     var sortHome
     if(value.startsWith('price')){
       sortHome= _.orderBy(homes, ['price'],[order])
     }else{
      sortHome= _.orderBy(homes, ['name'],[order])
     }
      
    
  setHomes(sortHome)
       
   
   }
   

useEffect(()=> {
  setHomes(data);
  setCategories(["all", ...new Set(homes.map((one) => one.category))])
},[]);
  // useEffect(() => {
  //   if (loadMore === true || num === 10) {
  //     setNum(num + 10);
  //     getSomeHomes(num).then(
  //       (result) => {
  //         setHomes(result);
  //         setLoadMore(false);
  //         setCategories(["all", ...new Set(result.map((one) => one.category))]);
  //       },
  //       (error) => {
  //         console.log(error);
  //       }
  //     );
  //   }
  // }, [num, loadMore]);
  function removeAllLikedHomes() {
    setLikedHomes([]);
  }
  function removeLikedHome(id) {
    setLikedHomes(likedHomes.filter((home) => home.id !== id));
  }
  function removeHome(id) {
    setHomes(homes.filter((home) => home.id !== id));
  }
  const addLikedHome = (id) => {
    if (likedHomes.filter((home) => home.id === id).length > 0) {
      return;
    }
    const likedhome = [
      ...likedHomes,
      homes.filter((home) => home.id === id)[0],
    ];
    setLikedHomes(likedhome);
    console.log(likedHomes);
  };

  function categoryFilter(category) {
    if (category === "all") {
      setHomes(homes);
      return;
    }
    setHomes(homes.filter((home) => home.category === category));
  }
  return (
    <div className="homepage">
      <header className="head" 
      
      /* style={{backgroundImage:` url("https://assets.architecturaldigest.in/photos/60084bc8d0435267a8df97f8/16:9/w_2560%2Cc_limit/The-Drawing-Studio-mumbai-interior-design_2-1366x768.jpg")`,
  height: "500px",
  maxWidth: "2000px",
  backgroundSize:"cover",
  backgroundRepeat:"no-repeat"
 }} */
 >
      
        <div className="title">
          <h2 >Find Home</h2>
          <div className="underline"></div>
        </div>
        
        <div className="search">
        <SearchBar input={input} onChange={updateInput}></SearchBar>
        </div>
      </header>

    

      
      <div className="filter-container">
      <div className="aa"></div>

      <div className="category">
       <Categories categories={categories} categoryFilter={categoryFilter} />
    </div>
     
        <div className="sort">
        
      
         <select className="sort-select" onChange={e=>{sortByInput(e)}}>
           <option value="" disabled selected>Sort By</option>
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
              {homes.map((home1) => {
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
              currentUser={currentUser}
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
