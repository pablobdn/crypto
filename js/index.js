//Variables
const apiKey = "21cfa41fc3855296cd1844c0a955818c8d3e7927968d014f84b6fe22a340e9f8"
const currencySelect = document.getElementById("currency")
const cryptoInput = document.getElementById("crypto-input");
const btn = document.getElementById("quote")
const results = document.getElementById("crypto-results")
const result = document.querySelector("li#result")
const spinner = document.getElementById("spinner")
const main = document.getElementById("main-section")
const swapBtn = document.getElementById("swapBtn")
let cryptoList;


//Events
cryptoInput.addEventListener("keyup", searchCrypto)
cryptoInput.addEventListener("blur", () => {
    let inputValue = cryptoInput.value
    if (inputValue == "") {
        results.style.display = "none"
    }
})
swapBtn.addEventListener("click", () => {
    const node1 = document.getElementsByClassName("swap")[0]
    const node2 = document.getElementsByClassName("swap")[1]
    node1.before(node2)
})
btn.addEventListener("click", () => {
    currencySelect.setAttribute("key", currencySelect.value)
    const node1 = document.getElementsByClassName("node")[0].getAttribute("key")
    const node2 = document.getElementsByClassName("node")[1].getAttribute("key")
    getResults(node1, node2)
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
    let keySelected = e.target.attributes.value.textContent
    const coinSelected = e.target.textContent
    cryptoInput.value = coinSelected
    cryptoInput.setAttribute("key", keySelected)
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


async function getResults(value1, value2) {
    if (value1 == "" || value2 == "") {
        document.getElementById("error").style.display = "block"
        const resultsDiv = document.getElementById("results")
        resultsDiv.innerHTML = ""
    } else {
        document.getElementById("error").style.display = "none"
        spinner.style.display = "block"
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${value1}&tsyms=${value2}&api_key=${apiKey}`
        const results = await fetch(url)
            .then(response => response.json())
            .then(data => {
                showResults(data.RAW, value1, value2)
            })
            .catch(error => console.log(error))
    }
}

function showResults(data, value1, value2) {
    let amount = document.getElementById("amount").value
    if (amount == "") amount = 1
    setTimeout(() => {
        spinner.style.display = "none"
        const result = data [value1] [value2]
        const resultsDiv = document.getElementById("results")
        const message = `
        <p$>Resultado de la conversión</p$>
        <p>${amount} ${value1} = ${(result.PRICE*amount).toFixed(5)} ${value2}</p>
    `
        resultsDiv.innerHTML = message
    }, 1000)
}