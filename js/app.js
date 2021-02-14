const api = new API()
const ui = new UI()

const swapBtn = document.getElementById("swapBtn")
const quoteBtn = document.getElementById('quote')

//Events
swapBtn.addEventListener('click', () => {
    const node1 = document.getElementsByClassName("swap")[0]
    const node2 = document.getElementsByClassName("swap")[1]
	node1.before(node2)

	if (node1.value != "" && node2.value != "") {
		getQuoteResult()
	}

})
quoteBtn.addEventListener('click', () => {
    getQuoteResult()
})


//Functions

function getQuoteResult() {
	const value1 = document.getElementsByTagName("select")[0].value
    const value2 = document.getElementsByTagName("select")[1].value
    api.getResults(value1, value2)
}