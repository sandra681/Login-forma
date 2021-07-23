import React, { useState, useEffect } from "react";
import Home from "./Home";
import "../components/homepage/Homepage.css"
import { useDispatch, useSelector } from "react-redux";
import {  Pagination } from "react-bootstrap";
import { deleteLikedApartment } from "../actions/apartments";
import { BsChevronDoubleLeft, BsChevronDoubleRight, BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import apartmentServices from "../services/apartment.services";


function LikedHomesList() {

    
    const user = useSelector((state) => state.userReducer);
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
    const dispatch=useDispatch()
    const likedHomes = useSelector(
        (state) => state.apartmentsReducer
      ).likedApartments;

      useEffect(()=>{
        
        if(likedHomes){
          let pages=1
          let brojac=1
        for(let i=1;i<=likedHomes.length;i++){
          if(i===(12*brojac+1)){
            setPageCount(pages+1)
            pages++
            brojac++;
          }
        }
      }
      },[likedHomes, pageCount, page])
      
  for (let i = 1; i < pageCount + 1; i++) {
    if(i===1 || i===pageCount || i>=left && i<right){
    itemsNumbers.push(
      i
    );
    }  }
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
        window.location.reload(true)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getPaginatedData(){
    const startIndex=page*12-12;
    const endIndex=startIndex+12;
    if(likedHomes){
      return likedHomes.slice(startIndex, endIndex)
    }
    return
  }
  function message(){
    if(likedHomes.length===0){
      return <h3>You Don't Have Selected Apartments!</h3>
    }
    return
  }
  
    return (
        
     <div style={{ marginTop: "10vh" }}>

      <header className="head2">
        <div className="title">
          <h2>
            {" "}
            Your favorite<br></br>homes
          </h2>
          {/* <div className="underline"></div> */}
        </div>
        
      </header>

      <div className="message">
      {message()}
      </div>
      
        <div className="boxLista">
         
            {likedHomes && getPaginatedData().map((home1, index) => {   
                 let liked = false;
                  if (
                     likedHomes !== null && 
                     likedHomes.filter((one) => one.id === home1.id).length !== 0
                     ) {
                  liked = true;
                 }
                
                  return (
                      <div className="apartmanLista" key={index}>
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
      <div className="pagination" hidden={likedHomes.length===0 ? true : false}>     
      <Pagination>
              <Pagination.First onClick={() => setPage(1)} 
               disabled={checkPagePrev(page)}  >
                 
                 <BsChevronDoubleLeft  />
               </Pagination.First>              
              <Pagination.Prev
                onClick={() => {
                  page === 1 ? setPage(1) : setPage(page - 1);
                }}                
                hidden={checkPagePrev(page)}
              >
                <BsChevronLeft/>
              </Pagination.Prev>
              {itemsDots}              
              <Pagination.Next
                onClick={() =>
                  page === pageCount ? setPage(page) : setPage(page + 1)
                }
                hidden={checkPageNext(page)}
              >
                <BsChevronRight/>
              </Pagination.Next>

              <Pagination.Last onClick={() => setPage(pageCount)}
               disabled={checkPageNext(page)} >
                 <BsChevronDoubleRight/>
               </Pagination.Last>
            </Pagination>

        </div>
        
     
    </div>
    
    
    )
}

export default LikedHomesList
