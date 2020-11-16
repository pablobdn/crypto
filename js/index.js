//Variables
const apiKey = "21cfa41fc3855296cd1844c0a955818c8d3e7927968d014f84b6fe22a340e9f8"
const currencySelect = document.getElementById("currency")
const cryptoInput = document.getElementById("crypto-input");
const btn = document.getElementById("quote")
const results = document.getElementById("crypto-results")
const result = document.querySelector("li#result")
const spinner = document.getElementById("spinner")
const main = document.getElementById("main-section")
let keySelected;


//Events
btn.addEventListener("click", getResults)
cryptoInput.addEventListener("keyup", searchCrypto)
cryptoInput.addEventListener("blur", () => {
    let inputValue = cryptoInput.value
    if (inputValue == "") {
        results.style.display = "none"
    }
})
result.addEventListener("click", updateInputValue)


//Functions
function searchCrypto() {

    let inputValue = cryptoInput.value.toLowerCase()

    const list = document.getElementsByTagName('li')

    for (let i = 0; i <= list.length; i++) {
        const coinName = list[i].textContent

        if (coinName.toLowerCase().indexOf(inputValue) > -1) {
            list[i].style.display = "block"
            results.style.display = "block"
        } else {
            list[i].style.display = "none"
        }
    }

    if (inputValue == "") {
        results.style.display = "none"
    }
}

function updateInputValue(e) {
    keySelected = e.target.attributes.value.textContent
    const coinSelected = e.target.textContent
    cryptoInput.value = coinSelected
    results.style.display = "none"
}

const getCryptos = async () => {
    const url = `https://min-api.cryptocompare.com/data/all/coinlist?=${apiKey}`
    const urlGetCryptos = await fetch(url)
    const cryptos = await urlGetCryptos.json()
    return cryptos
}

getCryptos()
    .then(crypto => {
        const array = Object.entries(crypto.Data).sort()
        const info = []
        let resultado = ""
        for (const [key, value] of array) {
            info.push({
                "name": value.CoinName.toLowerCase(),
                "key": key
            })
            resultado += `<li class="result" value=${key} id="result">${value.CoinName} (${key})</li>`
        }
        result.innerHTML = resultado
        results.style.display = "none"
    })

async function getResults(e) {
    e.preventDefault()
    const cryptoSelected = keySelected
    const currencySelected = currencySelect.options[currencySelect.selectedIndex].value
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptoSelected}&tsyms=${currencySelected}&api_key=${apiKey}`
    const results = await fetch(url)
        .then(response => response.json())
        .then(data => {
            showResults(data.RAW, currencySelected, cryptoSelected)
        })
}

function showResults(data, currency, crypto) {
    const result = data[crypto][currency]
    const resultsDiv = document.getElementById("results")
    const message = `
        <p$>Resultado de la conversion</p$>
        <p>1 ${crypto} = ${result.PRICE.toFixed(2)} ${currency}</p>
    `
    resultsDiv.innerHTML = message
}