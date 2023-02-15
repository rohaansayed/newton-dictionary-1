
const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");
const historyBtn = document.getElementById("history-btn");
const deleteHistoryBtn = document.createElement("button");


deleteHistoryBtn.innerHTML = "Delete History";
deleteHistoryBtn.style.marginLeft = "2px";

deleteHistoryBtn.addEventListener("click", () => {
    history = [];
    result.innerHTML = "";
});

historyBtn.parentNode.appendChild(deleteHistoryBtn);


let history = [];

btn.addEventListener("click", async () => {
    let inpWord = document.getElementById("inp-word").value;

    try {
        const response = await fetch(`${url}${inpWord}`);
        const data = await response.json();

        if (!data || !data.length) {
            result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
            return;
        }

        if (!data[0].meanings || !data[0].meanings.length) {
            result.innerHTML = `<h3 class="error">No meanings found for the word</h3>`;
            return;
        }

        if (!data[0].meanings[0].definitions || !data[0].meanings[0].definitions.length) {
            result.innerHTML = `<h3 class="error">No definitions found for the word</h3>`;
            return;
        }

        if (!data[0].phonetics || !data[0].phonetics.length) {
            result.innerHTML = `<h3 class="error">No phonetics found for the word</h3>`;
            return;
        }

        history.push({ word: inpWord, data: data[0] });

        result.innerHTML = `
        <div class="word">
                <h3>${inpWord}</h3>
                <button onclick="playSound()">
                    <i class="fas fa-volume-up"></i>
                </button>
            </div>
            <div class="details">
                <p>${data[0].meanings[0].partOfSpeech}</p>
                <p>/${data[0].phonetic}/</p>
            </div>
            <p class="word-meaning">
               ${data[0].meanings[0].definitions[0].definition}
            </p>
            <p class="word-example">
                ${data[0].meanings[0].definitions[0].example || ""}
            </p>`;
        sound.setAttribute("src", `https:${data[0].phonetics[0].audio}`);
    } catch (error) {
        result.innerHTML = `<h3 class="error">An error occurred: ${error}</h3>`;
    }
});
function displayHistory() {
    const history = JSON.parse(localStorage.getItem('history')) || [];
    const historyTable = document.getElementById('history-table').querySelector('tbody');
    historyTable.innerHTML = '';
  
    // Create a new column for each history item
    history.forEach((item, index) => {
      const newColumn = document.createElement('td');
      newColumn.classList.add('history-item');
      newColumn.textContent = item;
      const newRow = document.createElement('tr');
      newRow.appendChild(newColumn);
      historyTable.appendChild(newRow);
    });
  }
  

historyBtn.addEventListener("click", () => {
    result.innerHTML = `
    <table>
        <thead>
            <tr>
                <th>Word</th>
                <th>Part of Speech</th>
                <th>Phonetic</th>
                <th>Definition</th>
                <th>Example
                </th>
            </tr>
        </thead>
        <tbody>
            ${history
                .map(
                    (h) => `
                <tr>
                    <td>${h.word}</td>
                    <td>${h.data.meanings[0].partOfSpeech}</td>
                    <td>/${h.data.phonetic}/</td>
                    <td>${h.data.meanings[0].definitions[0].definition}</td>
                    <td>${h.data.meanings[0].definitions[0].example || ""}</td>
                </tr>
            `
                )
                .join("")}
        </tbody>
    </table>`;
});
function playSound() {
sound.play();
}


// const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
// const result = document.getElementById("result");
// const sound = document.getElementById("sound");
// const btn = document.getElementById("search-btn");
// const historyBtn = document.getElementById("history-btn");
// const deleteHistoryBtn = document.createElement("button");

// deleteHistoryBtn.innerHTML = "Delete History";
// deleteHistoryBtn.style.marginLeft = "2px";

// deleteHistoryBtn.addEventListener("click", () => {
//     history = [];
//     result.innerHTML = "";
// });

// historyBtn.parentNode.appendChild(deleteHistoryBtn);

// let history = [];

// btn.addEventListener("click", async () => {
//     let inpWord = document.getElementById("inp-word").value;

//     try {
//         const response = await fetch(`${url}${inpWord}`);
//         const data = await response.json();

//         if (!data || !data.length) {
//             result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
//             return;
//         }

//         if (!data[0].meanings || !data[0].meanings.length) {
//             result.innerHTML = `<h3 class="error">No meanings found for the word</h3>`;
//             return;
//         }

//         if (!data[0].meanings[0].definitions || !data[0].meanings[0].definitions.length) {
//             result.innerHTML = `<h3 class="error">No definitions found for the word</h3>`;
//             return;
//         }

//         if (!data[0].phonetics || !data[0].phonetics.length) {
//             result.innerHTML = `<h3 class="error">No phonetics found for the word</h3>`;
//             return;
//         }

//         history.push({ word: inpWord, data: data[0] });

//         result.innerHTML = `
//             <div class="word">
//                 <h3>${inpWord}</h3>
//                 <button onclick="playSound()">
//                     <i class="fas fa-volume-up"></i>
//                 </button>
//             </div>
//             <div class="details">
//                 <p>${data[0].meanings[0].partOfSpeech}</p>
//                 <p>/${data[0].phonetic}/</p>
//             </div>
//             <p class="word-meaning">
//                 ${data[0].meanings[0].definitions[0].definition}
//             </p>
//             <p class="word-example">
//                 ${data[0].meanings[0].definitions[0].example || ""}
//             </p>`;
//         sound.setAttribute("src", `https:${data[0].phonetics[0].audio}`);
//     } catch (error) {
//         result.innerHTML = `<h3 class="error">An error occurred: ${error}</h3>`;
//     }
// });

// function displayHistory() {
//     const history = JSON.parse(localStorage.getItem('history')) || [];
//     const historyContainer = document.getElementById('history-container');
//     historyContainer.innerHTML = '';

//     // Create a new div for each history item
//     history.forEach((item, index) => {
//         const newDiv = document.createElement('div');
//         newDiv.classList.add('history-item');
//         newDiv.innerHTML = `
//             <h3>${item.word}</h3>
//             <p><strong>Part of Speech:</strong> ${item.data.meanings[0].partOfSpeech}</p>
//             <p><strong>Phonetic:</strong> /${item.data.phonetic}/</p>
//             <p><strong>Definition:</strong> ${item.data.meanings[0].definitions[0].definition}</p>
//             <p><strong>Example:</strong> ${item.data.meanings[0].
