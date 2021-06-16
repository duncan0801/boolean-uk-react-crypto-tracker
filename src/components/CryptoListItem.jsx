

function CryptoListItem({coin, isSelectedCripto, setSelectedCripto, index }) {
    return (
        <li 
        key={index} 
        >
            <button 
            className={isSelectedCripto(coin.id) ? "selected" : ""} 
            onClick={() => setSelectedCripto(coin.id)}>{coin.name}</button>
        </li>
    )
}

export default CryptoListItem