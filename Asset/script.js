// SECTION: script runs only after the webpage's content is fully loaded. Prevent error. Checking if data exist.
// If data is missing, this prints an error message in the browser console to help with debugging.
document.addEventListener("DOMContentLoaded", function () {
    if (typeof data === "undefined") {
        console.error("Data is not loaded. Check if data.js is properly linked.");
        return;
    }

    // connects alumni data from data js
    generateAlumniCards(data);

    // filter option by CD, DT, SD. show the program that was clicked.
    document.getElementById("btn-cd").addEventListener("click", function () {
        filterByProgram("CD");
    });

    document.getElementById("btn-dt").addEventListener("click", function () {
        filterByProgram("DT");
    });

    document.getElementById("btn-sd").addEventListener("click", function () {
        filterByProgram("SD");
    });
});

// SECTION: filter function by program
function filterByProgram(program) {
    //goes through each person in the data and checks the program if they matches
    const filteredData = data.filter(person => person.program === program);

    // will display the alumni cards only for the selected program
    generateAlumniCards(filteredData);
}

// SECTION: get an HTML element with the ID
// If (!container)... checks if the container element exists on the page.
function generateAlumniCards(alumniData) {
    let container = document.getElementById("alumni-container");

    if (!container) {
        console.error("Alumni container not found.");
        return;
    }

    // ensures when new data is loaded, old cards are removed.
    container.innerHTML = "";
    // loops each item (representing an individual person) in the alumniData array.
    alumniData.forEach(person => {
        let card = document.createElement("div");
        card.className = "card";

        // innerHTML is used to set the content inside the div.
        card.innerHTML = `
            <h3>${person.fullName || "No Name"}</h3>
            <p>${person.program || "No Program"}, ${person.degree || "No Degree"}</p>
            <p>Role: ${person.role || "N/A"}</p>
            <p>Hobby: ${person.hobby || "N/A"}</p>
            <div class="icons">
                ${person.linkedin ? `<a href="${person.linkedin}" target="_blank">🔗 LinkedIn</a>` : ""}
                ${person.portfolio ? `<a href="${person.portfolio}" target="_blank">🌐 Portfolio</a>` : ""}
            </div>
            <a class="message-btn" href="mailto:${person.email}">📩 Message</a>
        `;

        container.appendChild(card);
    });
}
