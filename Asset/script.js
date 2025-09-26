// best practices recommended by tutor
// tells the browser wait until the entire html doc is fully loaded before running the JavaScript inside the block
// prevents errors like trying to grab elements that don’t exist because they haven’t loaded
// https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded.");

  // safety check to make sure data.js file was loaded correctly
  if (typeof data === "undefined") {
    console.error("data is not loaded. Make sure data.js is linked correctly.");
    return;
  }
  console.log("data loaded:", data.length, "items");

  // section: back to top; grab button element
  const backToTopBtn = document.getElementById("back-to-top");

  // when user scrolls down more than 1000px, show the button
  window.addEventListener("scroll", () => {
    if (window.scrollY > 1000) {
      backToTopBtn.style.display = "block";
    } else {
      backToTopBtn.style.display = "none";
    }
  });

  // scroll to the top smoothly when the button is clicked
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // display all alumni by default
  generateAlumniCards(data);

  // CTA → scroll to filter section
  const ctaBtn = document.getElementById("cta-explore");
  const filterSection = document.getElementById("filter-section");
  if (ctaBtn && filterSection) {
    ctaBtn.addEventListener("click", () => {
      filterSection.scrollIntoView({ behavior: "smooth" });
    });
  }

  // program filter
  document.getElementById("programFilter").addEventListener("change", (event) => {
    const selectedRange = event.target.value;
    if (selectedRange === "all") {
      generateAlumniCards(data);
    } else {
      filterByProgram(selectedRange);
    }
  });

  // open Google Form in new tab
  const joinBtn = document.getElementById("cta-join");
  if (joinBtn) {
    joinBtn.addEventListener("click", () => {
      window.open(
        "https://docs.google.com/forms/d/e/1FAIpQLSdl-8kdkWzOacSq8_vS71pQwdvuvJLnnKCd-qklQf1pw_7Q9g/viewform",
        "_blank"
      );
    });
  }

  // search by name or role
  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const searchTerm = searchInput.value.toLowerCase();
      const filteredResults = data.filter((person) => {
        const nameMatch = person.fullName && person.fullName.toLowerCase().includes(searchTerm);
        const roleMatch = person.role && person.role.toLowerCase().includes(searchTerm);
        return nameMatch || roleMatch;
      });
      generateAlumniCards(filteredResults);
    });
  }

  // year filters
  document.getElementById("yearFilter").addEventListener("change", (event) => {
    const selectedRange = event.target.value;
    filterByYearRange(selectedRange);
  });

  // open-to… filter
  document.getElementById("openToFilter").addEventListener("change", (event) => {
    const selected = event.target.value;
    if (selected === "all") {
      generateAlumniCards(data);
    } else {
      const filtered = data.filter((person) => person[selected] === true);
      generateAlumniCards(filtered);
    }
  });

  // footer CTA
  const footerJoinBtn = document.getElementById("footer-cta");
  if (footerJoinBtn) {
    footerJoinBtn.addEventListener("click", () => {
      window.open(
        "https://docs.google.com/forms/d/e/1FAIpQLSdl-8kdkWzOacSq8_vS71pQwdvuvJLnnKCd-qklQf1pw_7Q9g/viewform",
        "_blank"
      );
    });
  }
});

// start of the function
function filterByYearRange(range) {
  let filtered;

  // if user selects "All", show everything (reset)
  if (range === "all") {
    generateAlumniCards(data);
    return;
  }

  // if user selects "Earlier", match exact text for older grads
  if (range === "earlier") {
    filtered = data.filter((person) => {
      const grad = person.graduated;
      return grad === "2019" || grad === "Earlier than 2018";
    });
  } else {
    const [start, end] = range.split("-").map(Number);
    filtered = data.filter((person) => {
      const year = parseInt(person.graduated);
      return !isNaN(year) && year >= start && year <= end;
    });
  }

  // result
  generateAlumniCards(filtered);
}

// filter by program
function filterByProgram(program) {
  const filteredData = data.filter((person) => person.program === program);
  generateAlumniCards(filteredData);
}

// generate cards
function generateAlumniCards(alumniData) {
  const container = document.getElementById("alumni-container");

  if (!container) {
    console.error("Alumni container not found.");
    return;
  }

  container.innerHTML = "";
  console.log(`Rendering ${alumniData.length} cards`);

  alumniData.forEach((person) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <div class="chat-tag">
        ${person.openToChat ? `
          <div class="chat-tag"><img src="Asset/chat-tag.svg"><span>Open to chat</span></div>` : ""}
        ${person.openToWork ? `
          <div class="chat-tag"><img src="Asset/work-tag.svg"><span>Open to work</span></div>` : ""}
        ${person.openToMentor ? `
          <div class="chat-tag"><img src="Asset/mentor-tag.svg"><span>Open to mentor</span></div>` : ""}
        ${person.hiring ? `
          <div class="chat-tag"><img src="Asset/hiring-tag.svg"><span>Hiring</span></div>` : ""}
      </div>

      <h3>${person.fullName || "No Name"}</h3>
      <h4>${person.degree || "No Degree"}, ${person.program || "No Program"}</h4>
      <p>🎓 ${person.graduated || "N/A"}</p>
      <p>👨‍⚕️ ${person.role || "N/A"}</p>
      <p>🎨 ${person.hobby || "N/A"}</p>

      <div class="card-social">
        ${person.linkedin ? `<a href="${person.linkedin}" target="_blank" class="social-icon linkedin" aria-label="LinkedIn"><img src="Asset/linkedin-icon.svg" alt="LinkedIn"></a>` : ""}
        ${person.email ? `<a href="mailto:${person.email}" class="social-icon email" aria-label="Email"><img src="Asset/email-icon.svg" alt="Email"></a>` : ""}
        ${person.portfolio ? `<a href="${person.portfolio}" target="_blank" class="social-icon portfolio" aria-label="Portfolio"><img src="Asset/portfolio-icon.svg" alt="Portfolio" /></a>` : ""}
      </div>
    `;

    container.appendChild(card);
  });
}
