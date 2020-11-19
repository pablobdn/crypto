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
let cryptoList;


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

    for (coin of cryptoList) {
        const coinName = coin.textContent

        if (coinName.toLowerCase().indexOf(inputValue) > -1) {
            coin.style.display = "block"
            results.style.display = "block"
        } else {
            coin.style.display = "none"
        }
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
        let resultado = ""
        for (const [key, value] of array) {
            resultado += `<li class="result" value=${key} id="result">${value.CoinName} (${key})</li>`
        }
        result.innerHTML = resultado
        results.style.display = "none"
        cryptoList = document.getElementsByTagName('li')
    })
    .catch(error => console.log(error))

async function getResults(e) {
    e.preventDefault()
    let cryptoValue = cryptoInput.value
    let currencyValue = currencySelect.value
    if (cryptoValue == "" || currencyValue == "") {
        document.getElementById("error").style.display = "block"
        const resultsDiv = document.getElementById("results")
        resultsDiv.innerHTML = ""
    } else {
        document.getElementById("error").style.display = "none"
        spinner.style.display = "block"
        const cryptoSelected = keySelected
        const currencySelected = currencySelect.options[currencySelect.selectedIndex].value
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptoSelected}&tsyms=${currencySelected}&api_key=${apiKey}`
        const results = await fetch(url)
            .then(response => response.json())
            .then(data => {
                showResults(data.RAW, currencySelected, cryptoSelected)
            })
            .catch(error => console.log(error))
    }
}

function showResults(data, currency, crypto) {
    let amount = document.getElementById("amount").value
    if (amount == "") amount = 1
    setTimeout(() => {
        spinner.style.display = "none"
        const result = data[crypto][currency]
        const resultsDiv = document.getElementById("results")
        const message = `
        <p$>Resultado de la conversión</p$>
        <p>${amount} ${crypto} = ${(result.PRICE*amount).toFixed(2)} ${currency}</p>
    `
        resultsDiv.innerHTML = message
    }, 1000)
}