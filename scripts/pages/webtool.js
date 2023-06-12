const BASE_LINK = window.location.origin
import(`${BASE_LINK}/scripts/components/navbar.js`)

let tool = getParameterByName("tool")
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

	import("https://webtools3257.github.io/scripts/components/ListTool.js")
		.then(() => {
			if (!tool) {
				selector.byId("main").HTML = `
					<list-tool></list-tool>
				`
			}else{
				
			}
		})

		.catch(() => {
			selector.byId("main").HTML = `
				<h2>Cannot load content </h2>
			`
		})
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