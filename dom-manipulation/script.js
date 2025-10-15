const randomQuotes = [
    {
        text: "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.",
        category: "philosophical"
    },
    {
        text: "One, remember to look up at the stars and not down at your feet. Two, never give up work. Work gives you meaning and purpose and life is empty without it. Three, if you are lucky enough to find love, remember it is there and don't throw it away.",
        category: "philosophical"
    },
    {
        text: "It is better to remain silent at the risk of being thought a fool, than to talk and remove all doubt of it.",
        category: "wisdom"
    },
    {
        text: "Whenever you find yourself on the side of the majority, it is time to reform (or pause and reflect).",
        category: "wisdom"
    },
    {
        text: "The truth is, unless you let go, unless you forgive yourself, unless you forgive the situation, unless you realize that the situation is over, you cannot move forward.",
        category: "motivational"
    },
]
const displayContainer = document.getElementById("quoteDisplay");


const handleAddQuote = () => {
    displayContainer.innerHTML = "";
    let idx = Math.floor(Math.random() * randomQuotes.length);
    const p = document.createElement("p");
    p.textContent = randomQuotes[idx].text;
    displayContainer.appendChild(p);
}

const showQuoteBtn = document.getElementById("newQuote");
showQuoteBtn.addEventListener("click", handleAddQuote);


function addQuote() {
    const quoteInput = document.getElementById("newQuoteText");
    const categoryInput = document.getElementById("newQuoteCategory");

    const inputText = quoteInput.value.trim();
    const categoryText = categoryInput.value.trim();

    randomQuotes.push({text: inputText, category: categoryText});
    quoteInput.value = "";
    categoryInput.value = "";

}