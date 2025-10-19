let randomQuotes = [
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

// obtain the last seen quote from session storage
let savedQuote = sessionStorage.getItem("quote") ?? "No last viewed quote";

// obtain the quotes array from local storage
let quotes = localStorage.getItem("quotes");

console.log(savedQuote);

if (quotes) {
    quotes = JSON.parse(quotes);
    if (Array.isArray(quotes)) {
        randomQuotes = quotes;
    }
}
console.log(randomQuotes);
const displayContainer = document.getElementById("quoteDisplay");

function populateCategories(quote) {
    quote.map((q) => {
        console.log(q)
        const p = document.createElement("p");
        p.classList = "current-quote";
        p.textContent = q.text;
        p.style.display = "block";
        displayContainer.appendChild(p);
    })
}

// show random quotes on the screen but when  a category is selected
// filter all quotes and show only that fit that category
const showRandomQuote = (quote = null) => {
    displayContainer.innerHTML = "";
    if (quote.length > 0) {
        populateCategories(quote)
    } else {
        let idx = Math.floor(Math.random() * randomQuotes.length);
        const p = document.createElement("p");
        p.classList = "current-quote";
        p.textContent = randomQuotes[idx].text;
        displayContainer.appendChild(p);
        savedQuote = randomQuotes[idx].text;
        sessionStorage.setItem("quote", savedQuote);
    }
}

const lastSeenContainer = document.querySelector(".last-seen");

// function called when the vrowser renders to display last seen quotes
const lastSeenQuote = () => {
    let p = document.createElement("p");
    p.textContent = savedQuote;
    lastSeenContainer.appendChild(p);
}

const showQuoteBtn = document.getElementById("newQuote");
showQuoteBtn.addEventListener("click", showRandomQuote);

function createAddQuoteForm() {
    let newQuoteDiv = document.querySelector(".new-container");
    newQuoteDiv.style.display = "flex";
}

function addQuote() {
    const quoteInput = document.getElementById("newQuoteText");
    const categoryInput = document.getElementById("newQuoteCategory");

    const inputText = quoteInput.value.trim();
    const categoryText = categoryInput.value.trim();

    randomQuotes.push({text: inputText, category: categoryText});
    localStorage.setItem("quotes", JSON.stringify(randomQuotes));

    quoteInput.value = "";
    categoryInput.value = "";

}

// save the quotes to local storage after upload
const saveQuotes = () => {
    localStorage.setItem("quotes", JSON.stringify(randomQuotes));
}

// function to import json from the user upload
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(event.target.result);
        console.log(importedQuotes);
        randomQuotes.push(...importedQuotes);
        saveQuotes();
        alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
}

let a = document.getElementById("d-link");
let blob = new Blob([JSON.stringify(randomQuotes)], { type: "application/json"})
let url = URL.createObjectURL(blob);
a.href = url;
a.download = "quotes.json";

//filters the  quotes by what the user selects from the dropdown
function filterQuotes() {
    let category = sessionStorage.getItem("category") ?? 0;
    console.log(category);
    let select = document.getElementById("categoryFilter");
    const option = new Option(category, category);
    let selectedCategory;
    if (category) {
        selectedCategory = category;
    } else {selectedCategory = select.value;}

    if(selectedCategory === "all") {
        showRandomQuote();
    } else {
        sessionStorage.setItem("category", selectedCategory);
        let filterQuote = randomQuotes.filter((quote, idx) => quote.category === selectedCategory);
        showRandomQuote(filterQuote);
    }
    
}
async function fetchQuotesFromServer() {
    const response = await fetch(MOCK_API_URL); // MOCK_API_URL is 'https://jsonplaceholder.typicode.com/posts?_limit=15'
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    const posts = await response.json();

    // Transform API data ({id, title, body}) into our format ({text, category})
    return posts.map(post => ({
        text: post.body, // Use the post body as the quote text
        // Use the first word of the title as the category
        category: post.title.split(' ')[0] 
    }));
}
lastSeenQuote();