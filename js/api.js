class API {
    constructor() {
        this.api_key = '21cfa41fc3855296cd1844c0a955818c8d3e7927968d014f84b6fe22a340e9f8'
    }

    async getCryptoList() {
        const response = await fetch(`https://min-api.cryptocompare.com/data/all/coinlist?=${this.api_key}`)
        const crypoList = await response.json()
        return Object.entries(crypoList.Data).sort()
    }

    async getResults(symbol1, symbol2) {
        if (symbol1 == "" || symbol2 == "") {
            document.getElementById("error").style.display = "block"
            const resultsDiv = document.getElementById("results")
            resultsDiv.innerHTML = ""
        } else {
            document.getElementById("error").style.display = "none"
            ui.spinner('block')
            const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${symbol1}&tsyms=${symbol2}&api_key=${this.api_key}`
            const results = await fetch(url)
                .then(response => response.json())
                .then(data => {
                    ui.showResults(data.RAW, symbol1, symbol2)
                })
                .catch(error => console.log(error))
        }
    }
}