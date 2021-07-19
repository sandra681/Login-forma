import React, { useState, useEffect } from "react";
import Home from "./Home";
import "../components/homepage/Homepage.css"
import { useDispatch, useSelector } from "react-redux";
import {  Pagination } from "react-bootstrap";
import { deleteLikedApartment, getAllLikedApartmentsOfUser } from "../actions/apartments";



function LikedHomesList() {

    const token = JSON.parse(localStorage.getItem("token"));
    const user = useSelector((state) => state.userReducer);
    const [sLikedApartment, setSLikedApartment]=useState([])
    const [page, setPage] = useState(1);
     const [pageCount, setPageCount] = useState(1);
     let activePrev = false;
     let activeNext = false;
     let itemsNumbers = [];
    let space=2;
    let left=page-space;
    let right=page+space+1;
    let itemsDots=[]
    let l;

    const likedHomes = useSelector(
        (state) => state.apartmentsReducer
      ).likedApartments;

      const dispatch=useDispatch()
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
    return (
        
     <div style={{ marginTop: "10vh" }}>

        <div className="boxLista">
                {likedHomes && likedHomes.map((home1, index) => {
              let liked = false;
             if (
             likedHomes !== null && 
             likedHomes.filter((one) => one.id === home1.id).length !== 0
           ) {
             liked = true;
           }
           
          return (
            <div className="apartmanLista">
              <Home
                key={index}
                home1={home1}
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
               disabled={checkPagePrev(page)}/>        
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

        </div>
        
     
    </div>
    
    
    )
}

export default LikedHomesList
