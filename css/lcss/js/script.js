const consoleLoadBtn = document.getElementById("consoleloadbtn");
consoleLoadBtn.addEventListener("click", loadConsoles);

function loadConsoles() {
    const apiURL = "https://ozarktechwebdev.com/api/consoles.json";
    const xhr = new XMLHttpRequest();
    xhr.open("GET", apiURL);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);

            console.log(data);
            console.log(data.consoles);
        }
    };

    xhr.send();
}