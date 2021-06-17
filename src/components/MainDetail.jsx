import { useEffect, useState } from "react";
import { getCriptoUpdateUrl } from "../constants";

// This function give us the current time in seconds
function getCurrentTime() {
  return Math.round(Date.now() / 1000);
}
/*
  Use this function with the updated_at timestamp you get from each coin item in the API response
 */
function convertToSeconds(dateValue) {
  // This guard is needed due to the API discrepancies in handling dates
  return typeof dateValue === "string"
    ? Math.round(Date.parse(dateValue) / 1000)
    : dateValue;
}


function MainDetail({selectedCripto, setCryptoList,  cryptoList}) {

  const [currentTime, setCurrentTime] = useState(getCurrentTime())
  const [updated, setUpdated] = useState({})
  let foundCoin = cryptoList.find(coin => coin.id === selectedCripto)
  const timeDifference = currentTime - convertToSeconds(foundCoin["last_updated"])

  useEffect(() => {
    setInterval(()=> setCurrentTime(getCurrentTime()), 1000)
  }, [timeDifference])

  useEffect(() => {
    setInterval(() => {
      fetch(getCriptoUpdateUrl(foundCoin.id))
        .then((res) => res.json())
        .then((data) => {
          let id = Object.keys(data)[0]
          const {gbp, last_updated_at } = data[id]

          
          // const cryptoIndex = cryptoList.findIndexOf(selectedCripto)
          // if(selectedCripto.id.current_price !== gbp) {
          //   setCryptoList([...cryptoList, ...cryptoList[cryptoIndex],  id.current_price ===  gbp])
          //   console.log(selectedCripto.id.current_price)
          //   console.log("price change!")
          //}
          
        }
        )
    }, 5000);
      
        // let id = foundCoin.id
        // updated.id.gbp !== foundCoin["current_price"] ? console.log("true") : console.log("false")

  }, [foundCoin["current_price"]])
  
  return (
    <>
      <section className="main-detail__central">
        <div className="main-detail__update">
          {/* This part is for the challenge */}
        </div>
        <div className="main-detail__name">
          <h2>{foundCoin.name}</h2>
          <p><span className="small">a.k.a </span>{foundCoin.symbol}</p>
        </div>
        <div className="main-detail__price">
        <p>{`£${foundCoin["current_price"]}`}</p>
        <p>{`Last updated ${timeDifference} seconds ago`}</p>
        </div>
      </section>
    </>
  );
}
export default MainDetail
