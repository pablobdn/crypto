class UI {
    constructor() {
        this.init()
    }

    init() {
        this.createList()
    }

    createList() {   
        const response = api.getCryptoList()
            .then (cryptos => {
                const resultsList = document.getElementById('crypto-results')
                cryptos.forEach( crypto => {
                    const li = document.createElement('li')
                    li.setAttribute('id', 'result')
                    li.setAttribute('symbol', crypto[1].Symbol)
                    li.innerText = `${crypto[1].CoinName} (${crypto[1].Symbol})`
                    resultsList.appendChild(li)   
                })
                const spinner = document.getElementById('spinner')
                spinner.style.display= 'none'
                const main = document.getElementById('main')
                main.style.visibility = 'visible'
            })
    }

    filterCryptos(e) {
        const cryptoResults = document.getElementById('crypto-results')
        const cryptoList = document.getElementsByTagName('li')
        const input = e.target.value.toLowerCase()
        
        for (let crypto of cryptoList) {
            const nameCoin = crypto.textContent.toLowerCase()
            
            if(nameCoin.indexOf(input) > -1) {
                cryptoResults.style.display = 'block'
                crypto.style.display = 'block'
            } else {
                crypto.style.display = 'none'
            }
        }
    }

    updateInputValues(e) {
        const cryptoInput = document.getElementById('crypto-input')
        const crypto = e.target
        cryptoInput.value = crypto.textContent
        cryptoInput.setAttribute('symbol', crypto.getAttribute('symbol'))
        document.getElementById('crypto-results').style.display = 'none'
    }

    showResults(data, value1, value2) {
        let amount = document.getElementById("amount").value
        if (amount == "") amount = 1
        setTimeout(() => {
            this.spinner('none')
            const result = data [value1] [value2]
            const resultsDiv = document.getElementById("results")
            const priceAux = (result.PRICE*amount)
            const price = numeral(priceAux).format('0,0.00')
            const message = `
            <p$>Resultado de la conversión</p$>
            <p>${amount} ${value1} = ${price} ${value2}</p>
        `
            resultsDiv.innerHTML = message
        }, 1000)
    }

    spinner(display) {
        const spinner = document.getElementById('loading-result')
        spinner.style.display = display
    }
}