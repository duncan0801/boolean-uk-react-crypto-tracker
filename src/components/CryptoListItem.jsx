import {capitliseWord} from "../helpers"

function CryptoListItem({coin, isSelectedCripto, setSelectedCripto, index }) {
    return (
        <li 
        key={index} 
        className={isSelectedCripto(coin.id) ? "selected" : ""} 
        onClick={() => setSelectedCripto(coin)}>
            <button>{capitliseWord(coin.id)}</button>
        </li>
    )
}

export default CryptoListItem