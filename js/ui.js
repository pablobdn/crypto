class UI {
    showResults(data, value1, value2) {
        let amount = document.getElementById("amount").value
        if (amount == "") amount = 1
        setTimeout(() => {
            this.spinner('none')
            const result = data [value1] [value2]
            const resultsDiv = document.getElementById("results")
            const priceAux = (result.PRICE*amount)
            const price = numeral(priceAux).format('0,0.0000')
            const message = `
            <p$>Resultado de la conversión</p$>
            <p>${amount} ${value1} = ${price} ${value2}</p>
        `
            resultsDiv.innerHTML = message
        }, 600)
    }

    spinner(display) {
        const spinner = document.getElementById('spinner')
        spinner.style.display = display
    }
}