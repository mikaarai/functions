// best practices recommended by tutor
// tells the browser wait until the entire html doc is fully loaded before running the JavaScript inside the block
// prevents errors like trying to grab elements that don’t exist because they haven’t loaded
// https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event

// Further explanation 
// document=variable. accessing html file or index.html not data.js
// addEventListener=preset function; when the content is fully loaded, if this event happens, do this function
// DOMContentLoaded=preset input; 
// () => { = syntax; my function code is coming after this. run a function. do this code.   
// green bracket = written code
// console.log("DOM fully loaded."); good practice to keep for maintenance 

document.addEventListener("DOMContentLoaded", () => {
	console.log("DOM fully loaded.");

// safety check to make sure data.js file was loaded correctly
// not loaded → error message 
// loaded → proceeds with the rest of my code
// if data.js is missing, it will warn me instead of crashing

// Further explanation 
// The typeof operator returns the type of a variable or an expression.
// x=y assigning x to y
// x==y comparing the two; true ro faulse
// x===y simlar to == but needs to identical or strictly equal to (2 === 2 is true (both value and type are the same) 
// 2 === "2" is false (different types, even though the values are numerically equal))
// 2 + 2 = 4 integer
// “2” + “2” = "22" string

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

// Further explanation
// const ctaBtn=constant CTA button 
// 'let' can change but 'const' cannot change variable ever
// getElementById = go to index.html and get the element and assign to tbe ("cta-explore")

	const ctaBtn = document.getElementById("cta-explore");
	const filterSection = document.getElementById("filter-section");

// if(1==1 && 2==2) means true
// if cta button exist and filterbutton exist and true 
// || or either one exist

	if (ctaBtn && filterSection) {
		ctaBtn.addEventListener("click", () => {
			filterSection.scrollIntoView({ behavior: "smooth" });
		});
	}


	// program filter 
	// connect index.html to js
	const filters = [
		{ id: "btn-all", program: "ALL" },
		{ id: "btn-cd", program: "CD" },
		{ id: "btn-dt", program: "DT" },
		{ id: "btn-sd", program: "SD" },
		{ id: "btn-pd", program: "PD" }
	];

	
	// forEach=loop; happening 5 times since i have 5 programs/filter option
filters.forEach(({ id, program }) => {
		// conenct to index.html
		const button = document.getElementById(id);
		
			button.addEventListener("click", () => {
				console.log(`🔍 Filter: ${program}`);

				// remove active from all, css, when not clicked remove background color
				filters.forEach(({ id }) => {
					const btn = document.getElementById(id);
					if (btn) btn.classList.remove("active");
				});

				// add active to clicked one, css, it was clicked
				button.classList.add("active");

				// apply filter, reset or show all or it will filter by program
				if (program === "ALL") {
					generateAlumniCards(data);
				} else {
					filterByProgram(program);
				}
			});
	});
});

// year filters
// looking for a range to change on dropdown 
	document.getElementById("yearFilter").addEventListener("change", (event) => {
		const selectedRange = event.target.value;
		filterByYearRange(selectedRange);
	  });
// start of the function	  
	  function filterByYearRange(range) {
		let filtered;

// this shows year earlier than 2019 but if not pull out the year number like 2025 under graduate
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
	//   result
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
// when cta-join button is clicked the link below will open on a new tab
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


