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



// password screen
// grab the html element and hides it once password is type
const passwordScreen = document.getElementById("password-screen");
const passwordInput = document.getElementById("password-input");
const passwordSubmit = document.getElementById("password-submit");
const passwordError = document.getElementById("password-error");

// waiting for it to click then runs the function
passwordSubmit.addEventListener("click", () => {

	// checks if the value/password type is correct
  if (passwordInput.value === "helloparsons") {

	// hides password
    passwordScreen.style.display = "none";

	// if password is wrong, it shows error message
  } else {
    passwordError.style.display = "block";
  }
});



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

	
// section: back to top; grab button element
const backToTopBtn = document.getElementById("back-to-top");

// when user scrolls down more than 300px, show the button
// window.scrollY tells how far you’ve scrolled from the top
// it check the value on scroll, and show the button only when the scroll is past 300px
// https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollY
window.addEventListener("scroll", () => {
if (window.scrollY > 1000) {
backToTopBtn.style.display = "block";
} else {
backToTopBtn.style.display = "none";
}
});

// scroll to the top smoothly when the button is clicked
// top: scrolls to the top
// behavior: "smooth": makes it smooth
// https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollTo
backToTopBtn.addEventListener("click", () => {
window.scrollTo({
top: 0,
behavior: "smooth"
});
});


	
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
// getting the value from html
	document.getElementById("programFilter").addEventListener("change", (event) => {
		const selectedRange = event.target.value;	
		
		// apply filter, reset or show all or it will filter by program
		if (selectedRange === "all") {
			generateAlumniCards(data);
		} else {
			filterByProgram(selectedRange);
		}
	 	});


// open tab with google survey link for people to join the community
// when cta-join button is clicked the link below will open on a new tab
// https://developer.mozilla.org/en-US/docs/Web/API/Window/open
const joinBtn = document.getElementById("cta-join");
if (joinBtn) {
	joinBtn.addEventListener("click", () => {
		window.open(
			"https://docs.google.com/forms/d/e/1FAIpQLSdl-8kdkWzOacSq8_vS71pQwdvuvJLnnKCd-qklQf1pw_7Q9g/viewform",
			"_blank"
		);
	});
}



// search engine by name or role 
// user can easily search by name or role depending on their goal
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input?utm_source=chatgpt.com
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



// year filters
// looking for a range to change on dropdown 
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select


document.getElementById("yearFilter").addEventListener("change", (event) => {
	const selectedRange = event.target.value;
	filterByYearRange(selectedRange);
  });


// open to...filter
// this listens for a change event on the dropdown. when you select new option (like “Work” or “Mentor”), it calls the applyAllFilters() function to update the results
	  document.getElementById("openToFilter").addEventListener("change", (event) => {
		const selected = event.target.value;
	  
		if (selected === "all") {
		  generateAlumniCards(data);
		} else {
		  const filtered = data.filter(person => person[selected] === true);
		  generateAlumniCards(filtered);
		}
	  });



// footer
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


//if user selects "All", show everything (reset)
	  if (range === "all") {
		generateAlumniCards(data); 
		return; 
	  }


// if user selects "Earlier", match exact text for older grads
// } else: otherwise, split the range like "2020-2022" → [2020, 2022]
// const [start, end] = range.split("-").map(Number); → convert to numbers


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
  


// filter by program 
function filterByProgram(program) {
const filteredData = data.filter(person => person.program === program);
generateAlumniCards(filteredData);
}

// generate cards 
// note to open to chat tag: use template literals ` ` and a conditional (ternary) operator to decide whether to include "Open to chat" tag based on the data from data.js
// person.openToChat is a true or false
// ? = if it’s true, do this
// : = else, do this
// if true, it adds the chat tag HTML
// if false, it just adds an empty <div> to keep layout alignment

// template literals
// allows you to embed expressions like ${person.openToChat} inside backticks (`)
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals

// conditional ternary operator
// the ? : syntax lets you write if/else logic inside an expression 
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator


// open to chat = 	<div class="card-footer">


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
		</div>
`;

	container.appendChild(card);
});
}





