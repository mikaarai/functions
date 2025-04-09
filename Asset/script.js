// best practices recommended by tutor
// tells the browser wait until the entire html doc is fully loaded before running the JavaScript inside the block
// prevents errors like trying to grab elements that don’t exist because they haven’t loaded
// https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event
document.addEventListener("DOMContentLoaded", () => {
	console.log("DOM fully loaded.");

// safety check to make sure data.js file was loaded correctly
// not loaded → error message 
// loaded → proceeds with the rest of my code
// if data.js is missing, it will warn me instead of crashing

	if (typeof data === "undefined") {
		console.error("data is not loaded. Make sure data.js is linked correctly.");
		return;
	}

	console.log("data loaded:", data.length, "items");



// display all alumni by default
	generateAlumniCards(data);

// when tap it prompts you to go to filter
// why i need it? so that the user know what's the first thing to do
// https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView
	const ctaBtn = document.getElementById("cta-explore");
	const filterSection = document.getElementById("filter-section");

	if (ctaBtn && filterSection) {
		ctaBtn.addEventListener("click", () => {
			filterSection.scrollIntoView({ behavior: "smooth" });
		});
	}

	// proram filter 
	const filters = [
		{ id: "btn-all", program: "ALL" },
		{ id: "btn-cd", program: "CD" },
		{ id: "btn-dt", program: "DT" },
		{ id: "btn-sd", program: "SD" },
		{ id: "btn-pd", program: "PD" }
	];

	filters.forEach(({ id, program }) => {
		const button = document.getElementById(id);
		if (button) {
			button.addEventListener("click", () => {
				console.log(`🔍 Filter: ${program}`);

				// remove active from all
				filters.forEach(({ id }) => {
					const btn = document.getElementById(id);
					if (btn) btn.classList.remove("active");
				});

				// add active to clicked one
				button.classList.add("active");

				// apply filter
				if (program === "ALL") {
					generateAlumniCards(data);
				} else {
					filterByProgram(program);
				}
			});
		}
	});
});

	// year filters
	document.getElementById("yearFilter").addEventListener("change", (event) => {
		const selectedRange = event.target.value;
		filterByYearRange(selectedRange);
	  });
	  
	  function filterByYearRange(range) {
		let filtered;
	  
		if (range === "earlier") {
		  filtered = data.filter(person => {
			const grad = person.graduated;
			return grad === "2019" || grad === "Earlier than 2018";
		  });
		} else {
		  const [start, end] = range.split("-").map(Number);
		  filtered = data.filter(person => {
			const year = parseInt(person.graduated);
			return !isNaN(year) && year >= start && year <= end;
		  });
		}
	  
		generateAlumniCards(filtered);
	  }	  
	  
  

// search engine by name or role 
// user can easily search by name or role depending on their goal
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input?utm_source=chatgpt.com
document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search-input");
  
    if (searchInput) {
      searchInput.addEventListener("input", () => {
        const searchTerm = searchInput.value.toLowerCase();
  
        const filteredResults = data.filter(person => {
          const nameMatch = person.fullName && person.fullName.toLowerCase().includes(searchTerm);
          const roleMatch = person.role && person.role.toLowerCase().includes(searchTerm);
          return nameMatch || roleMatch;
        });
  
        generateAlumniCards(filteredResults);
      });
    }
  });
  
// open tab with google survey link for people to join the community
// https://developer.mozilla.org/en-US/docs/Web/API/Window/open
  document.addEventListener("DOMContentLoaded", () => {
	const joinBtn = document.getElementById("cta-join");
	if (joinBtn) {
		joinBtn.addEventListener("click", () => {
			window.open(
				"https://docs.google.com/forms/d/e/1FAIpQLSdl-8kdkWzOacSq8_vS71pQwdvuvJLnnKCd-qklQf1pw_7Q9g/viewform",
				"_blank"
			);
		});
	}
});


// filter by program 
function filterByProgram(program) {
	const filteredData = data.filter(person => person.program === program);
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

	alumniData.forEach(person => {
		const card = document.createElement("div");
		card.className = "card";

		card.innerHTML = `
			<h3>${person.fullName || "No Name"}</h3>
			<p>${person.program || "No Program"}, ${person.degree || "No Degree"}</p>
			<p>👨‍⚕️ ${person.role || "N/A"}</p>
			<p>🎨 ${person.hobby || "N/A"}</p>
			
			<div class="card-social">
			${person.linkedin ? `<a href="${person.linkedin}" target="_blank" class="social-icon linkedin" aria-label="LinkedIn"><img src="Asset/linkedin-icon.png" alt="LinkedIn"></a>` : ""}
			${person.email ? `<a href="mailto:${person.email}" class="social-icon email" aria-label="Email"><img src="Asset/email-icon.webp" alt="Email"></a>` : ""}
 			${person.portfolio ? `<a href="${person.portfolio}" target="_blank" class="social-icon portfolio" aria-label="Portfolio"><img src="Asset/portfolio-icon.svg" alt="Portfolio" /></a>` : ""}
  			</div>
`;

		container.appendChild(card);
	});
}


