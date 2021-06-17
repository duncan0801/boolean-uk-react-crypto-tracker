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
  const [secondsUntilUpdate, setSecondsUntilUpdate] = useState(10)
  
  let foundCoin = cryptoList.find(coin => coin.id === selectedCripto)
  const timeDifference = currentTime - convertToSeconds(foundCoin["last_updated"])

  useEffect(() => {
    setInterval(()=> setCurrentTime(getCurrentTime()), 1000)
  }, [timeDifference])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSecondsUntilUpdate(secondsUntilUpdate => secondsUntilUpdate - 1)
    }, 1000)
    return () => clearInterval(intervalId) //Has to retrun a fucntion for useEffect to clear up
  }, [])

  // PRICE UPDATE PROCESS
  // HAVE A SET COUNTDOWM
  // WHEN THE COUNTDOWN FINISHES, YOU FETCH THE PRICE CHANGE 
  // GET THE PRICE CHANGE AND UPDATE THE CRYPTO LIST ARRAY
  // Create an updated crypto List by mapping and saying if the id is correct then create a new object that has all the things from before plus the new data{...cryptoList, current_price: gbp, last_updated: last_updated_at}, if not then just retrun the item

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
        <div class="main-detail__update">
          <p>{`next update in ${secondsUntilUpdate}`}</p>
          <button class="main-detail__button">Pause update</button>
        </div>

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
