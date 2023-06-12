const BASE_LINK = window.location.origin
import(`${BASE_LINK}/scripts/components/navbar.js`)

let selector = new Turtle.Selector()
let theme = new Turtle.Storage("theme")
let mode = null
async function main() {
	mode = await theme.get("mode")
	if (mode == "dark") {
		document.body.style.setProperty("--body-bg", "#1F1B24")
		document.body.style.setProperty("--body-color", "white")
	} else {
		document.body.style.setProperty("--body-bg", "#ffffff")
		document.body.style.setProperty("--body-color", "black")
	}
}

document.onreadystatechange = function() {
	if (document.readyState !== "complete") {
		document.querySelector("body").style.visibility = "hidden";
		document.querySelector("#loader").style.visibility = "visible";
	} else {

		document.querySelector("#loader").style.display = "none";
		document.querySelector("body").style.visibility = "visible";
		main()
	}
};

function reveal() {
  var reveals = document.querySelectorAll(".reveal");

  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}

window.addEventListener("scroll", reveal);
setTimeout(()=>{
//	document.getElementById("l1").scrollIntoView()
})