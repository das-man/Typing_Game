// just me picking up my lost memories...
// quote api 
const url = "http://api.quotable.io/random";

// get element from HTML
const quoteDisplay = document.getElementById("quoteDisplay");
const input = document.getElementById("input");
const wordCount = document.getElementById("count");

// total correct word count
let count = 0;
// current quote correct word
let tempCount = 0;
// check if all words are correct in current quote
let fin = true;

// input =>
input.addEventListener("input", ()=>{
    // pick all current span
    let quoteArr = quoteDisplay.querySelectorAll("span");
    // pick all current input value
    let valueArr = input.value.split("");
    // reset temp count
    tempCount = 0;

    // for every char span in quote array =>
    quoteArr.forEach((charSpan, i)=>{
        // input value char
        let char = valueArr[i];

        // char is null/ right / wrong =>
        if (char == null) {
            charSpan.classList.remove("correct");
            charSpan.classList.remove("wrong");
            fin=false;
        } else if (char == charSpan.innerText) {
            charSpan.classList.remove("wrong");
            charSpan.classList.add("correct");
            fin=true;
        } else {
            charSpan.classList.remove("correct");
            charSpan.classList.add("wrong");
            fin=false;
        }

        // correct word count
        if (charSpan.classList == "correct") {
            tempCount++;
        }
    })

    wordCount.innerText = "Total word: " + (count+tempCount);

    // gen next quote
    if (fin) {
        count+=tempCount;
        wordCount.innerText = "Total word: " + count;
        getNextQuote();
    }
})

// fetch 一個random quote from api
function getRandomQuote() {
    return fetch(url)
    .then(res => res.json())
    .then(data => data.content);
};

async function getNextQuote() {
    // async await (wait for the data.content return after sending request to api)
    const quote = await getRandomQuote();
    
    // empty prev quote & input
    quoteDisplay.innerText = null;
    input.value = null; 
    
    // make span for each char of the quote
    quote.split("").forEach(char => {
        let charSpan = document.createElement("span");
        charSpan.innerText = char;
        // adding child(span) to display div
        quoteDisplay.appendChild(charSpan);
    });
}

getNextQuote();