const consoleLoadBtn = document.getElementById("consoleloadbtn");
const loadStatus = document.getElementById("loadstatus");
const summaryLine = document.getElementById("summaryline");
const retroGameCards = document.getElementById("retrogamecards");

consoleLoadBtn.addEventListener("click", loadConsoles);

function loadConsoles() {

    loadStatus.textContent = "Loading...";
    retroGameCards.textContent = "";
    summaryLine.textContent = "";

    const apiURL = "https://ozarktechwebdev.com/api/consoles.json";
    const xhr = new XMLHttpRequest();
    xhr.open("GET", apiURL);

        xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);

            loadStatus.textContent = "";

            console.log(data);
            console.log(data.consoles);
            console.log(data.consoles.length);

            retroGameCards.textContent = "";

            for (let item of data.consoles) {

                const consoleCard = document.createElement("div");

                const consoleImage = document.createElement("img");
                consoleImage.src = item.image;
                consoleImage.alt = item.name;

                const consoleName = document.createElement("h2");
                consoleName.textContent = item.name;

                const consoleInfo = document.createElement("p");
                consoleInfo.textContent = item.manufacturer + " - " + item.year;

                consoleCard.appendChild(consoleImage);
                consoleCard.appendChild(consoleName);
                consoleCard.appendChild(consoleInfo);

                retroGameCards.appendChild(consoleCard);
                
            }

            let oldest = data.consoles[0];
            let newest = data.consoles[0];

            for (let i = 1; i < data.consoles.length; i++) {
                if (data.consoles[i].year < oldest.year) {
                    oldest = data.consoles[i];
                }

                if (data.consoles[i].year > newest.year) {
                    newest = data.consoles[i];
                }
            }

            summaryLine.textContent = data.consoles.length + " consoles - Oldest: " + oldest.name + " (" + oldest.year + ") - Newest: " + newest.name + " (" + newest.year + ")";
        }   else {
                loadStatus.textContent = "Error loading consoles. Status: " + xhr.status;
            }
        }
    };

    xhr.send();
}