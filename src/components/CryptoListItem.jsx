

function CryptoListItem({coin, isSelectedCripto, setSelectedCripto}) {
    return (
        <li 
        >
            <button 
            className={isSelectedCripto(coin.id) ? "selected" : ""} 
            onClick={() => setSelectedCripto(coin.id)}>{coin.name}</button>
        </li>
    )
}

export default CryptoListItem