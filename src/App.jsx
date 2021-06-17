import { useEffect, useState } from "react";

import {CRIPTO_LIST, STATUS_UPDATES} from "./constants"

import MainDetail from "./components/MainDetail";
import CryptoListItem from "./components/CryptoListItem";
import NewsCard from "./components/NewsCard";




// 1. CREATE GET COINLIST FUNCTION
//    - CREATE A SIDE LIST COMPONENT
//    - ✔ USE THE 'CRIPTO_LIST' URL FOR THE FETCH
//    - ✔ USE THE useEffect FUNCTION SO THE FETCH ONLY RUNS ONCE 
//    - ✔ STORE IN STATE
//    - RENDER EACH LIST ITEM

function App() {
  // This piece of state keeps the id from the selected coin to be displayed in the MainDetail component
  const [selectedCripto, setSelectedCripto] = useState(null);
  const [cryptoList, setCryptoList] = useState([])
  const [statusUpdates, setStatusUpdates] = useState([])


  function getCryptoList() {
    return fetch(CRIPTO_LIST)
            .then(response => response.json())
            .then(data => {
              setCryptoList(data)
            
            })
  }

  function getNewsList() {
    return fetch(STATUS_UPDATES)
            .then(response => response.json())
            .then(data => {
              setStatusUpdates(data.status_updates)
            })
  }

  useEffect(() => {
    getCryptoList()
    getNewsList()
  }, [])
  

  // This function gives you whether a coin has been selected or not
  // You will need this for the SideListItem component
  function isSelectedCripto(id) {
    return selectedCripto === id;
  }

  return (
    /* These (<> </>) are called React Fragments, and allow us to return more than one top element */
    <>
      <aside className="side-list">
        <ul>
          {cryptoList.map((coin, index) => {
            
            return ( < CryptoListItem 
            coin={coin} 
            key={index}
            isSelectedCripto={isSelectedCripto} setSelectedCripto= {setSelectedCripto} />
            )
          })}
        </ul>
      </aside>
      <main className="main-detail">
        {selectedCripto
          ? <MainDetail
          selectedCripto={selectedCripto}
          cryptoList={cryptoList}
          setCryptoList={setCryptoList}
          />
          : "Select a coin bro!"}
          <ul>
            {statusUpdates.map((update, index) => {
              return <NewsCard
              key={index}
              newsItem={update} /> 
            })}
          </ul>
      </main>
    </>
  );
}

export default App;
