const apiKey = "21cfa41fc3855296cd1844c0a955818c8d3e7927968d014f84b6fe22a340e9f8"
const currencySelect = document.getElementById("currency")
const cryptoSelect = document.getElementById("crypto");
const btn = document.getElementById("quote")

//Events
btn.addEventListener("click", getResults)

const getCryptos = async () => {
    const url = `https://min-api.cryptocompare.com/data/all/coinlist?=${apiKey}`
    const urlGetCryptos = await fetch(url)
    const cryptos = await urlGetCryptos.json()

    return cryptos
}

getCryptos()
    .then ( crypto => {
        const array = Object.entries(crypto.Data).sort()
        for ( const [key, value] of array) {
            const cryptoName = document.createElement('option')
            cryptoName.innerHTML = value.CoinName
            cryptoName.value = key
            cryptoSelect.appendChild(cryptoName)
        }

        console.log(array)
    })

async function getResults(e) {
    e.preventDefault()
    const currencySelected = currencySelect.options[currencySelect.selectedIndex].value
    const cryptoSelected = cryptoSelect.options[cryptoSelect.selectedIndex].value
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptoSelected}&tsyms=${currencySelected}&api_key=${apiKey}`
    const results = await fetch(url)
        .then( response => response.json())
        .then( data => { showResults(data.RAW, currencySelected, cryptoSelected) } )
    }

function showResults (data, currency, crypto) {
    const result = data[crypto][currency]
    const resultsDiv = document.getElementById("results")
    const message = `
        <p>Resultado de la conversion</p>
        <p>1 ${crypto} = ${result.PRICE} ${currency}</p>
    `
    resultsDiv.innerHTML = message
}

