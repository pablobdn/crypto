const api = new API()
const ui = new UI()

const cryptoInput = document.getElementById('crypto-input')
const cryptoChosen = document.querySelector("#crypto-results")
const swapBtn = document.getElementById("swapBtn")
const quoteBtn = document.getElementById('quote')

//Events
cryptoInput.addEventListener('keyup', ui.filterCryptos)
cryptoInput.addEventListener('blur', () => { //Hide the crypto results if input is empty
    if (cryptoInput.value == '') {
        document.getElementById('crypto-results').style.display = 'none'
    }
})
cryptoChosen.addEventListener('click', ui.updateInputValues)
swapBtn.addEventListener('click', () => {
    const node1 = document.getElementsByClassName("swap")[0]
    const node2 = document.getElementsByClassName("swap")[1]
    node1.before(node2)
})
quoteBtn.addEventListener('click', () => {
    const currencySelect = document.getElementById('currency')
    currencySelect.setAttribute("symbol", currencySelect.value)
    const node1 = document.getElementsByClassName("node")[0].getAttribute('symbol')
    const node2 = document.getElementsByClassName("node")[1].getAttribute('symbol')
    api.getResults(node1, node2)
})