const url = "https://api.dictionaryapi.dev/api/v2/entries/en/hello";

const word = document.querySelector("#word");
const meaning = document.querySelector("#meaning");
const phonetic = document.querySelector("#phonetic");
const example = document.querySelector("#example");
const sound = document.querySelector("#listen");

const bar = document.querySelector(".bar");


const input = document.querySelector("#input");
const searchBtn = document.querySelector("#search-btn");
let audioUrl;





searchBtn.addEventListener("click", (e) => {

    //return when input is empty
    if (input.value.trim() === "") {
        return;
    }

    //get api when input is valid
    // console.log(input.value.trim() + " raw");
    getApiCall(input.value);
});

input.addEventListener("keydown", (e)=> {
    if(e.key === "Enter") {
         //return when input is empty
    if (input.value.trim() === "") {
        return;
    }

    //get api when input is valid
    // console.log(input.value.trim() + " raw");
    getApiCall(input.value);
    }
})


async function getApiCall(param) {
    try {
        let response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${param}`)

        let data = await response.json();

        //check if data is really returned
        if (!Array.isArray(data)) {
            alert("Word not found");
            return;
        }

        //take audio url
        audioUrl = data[0].phonetics.find(item => item.audio && item.audio !== "");


        displayUi(data);
    } catch (error) {
        console.log(error);

    }
}




function displayUi(data) {

    word.textContent = data[0].word;

    meaning.textContent = data[0].meanings[0].definitions[0].definition;

    phonetic.textContent = data[0].phonetic;

    example.textContent = data[0].meanings[0].definitions[0].example || "No example found...!";

    bar.classList.remove("hidden");
    sound.classList.remove("hidden");
    console.log(data);
}

sound.addEventListener("click", (e) => {
    if (audioUrl) {
        let audio = new Audio(
            audioUrl.audio
        );

        audio.play();
    }

})

window.onload = function (){
    bar.classList.add("hidden");
    sound.classList.add("hidden");
}