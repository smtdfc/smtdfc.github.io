const configs = {
	base: "https://glen-oasis-approach.glitch.me",
	theme: new Turtle.Storage("theme"),
	themMode: null
}
const BASE_LINK = window.location.origin
const selector = new Turtle.Selector()
let app = null
let user = null

function getParameterByName(name, url = window.location.href) {
	name = name.replace(/[\[\]]/g, '\\$&');
	var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

window.onoffline = function(){
	document.querySelector("body").style.visibility = "visible";
	document.querySelector("body").innerHTML = "No internet "
}

document.onreadystatechange = function() {
	if (document.readyState !== "complete") {
		try {
			document.querySelector("body").style.visibility = "hidden";
			document.querySelector("#loader").style.visibility = "visible";
		} catch {}
	} else {
		
		try {
			document.querySelector("#loader").style.display = "none";
			document.querySelector("body").style.visibility = "visible";
		} catch {}
		if(window.navigator.onLine)
			main()
		else
			document.querySelector("body").innerHTML = "No internet "
	}
};

async function main() {
	await import("./axios.min.js")
	await import("./api.js")
	app = window.initApp({
		base: configs.base
	})
	configs.themMode = await configs.theme.get("mode")
	if (configs.themMode == "dark") {
		document.body.style.setProperty("--body-bg", "#1F1B24")
		document.body.style.setProperty("--body-color", "white")
	} else {
		document.body.style.setProperty("--body-bg", "#ffffff")
		document.body.style.setProperty("--body-color", "black")
	}
	try{
	user = await app.auth.getUser()
	}catch(err){
		user = null
	}
	let event = new CustomEvent("pageready")
	window.dispatchEvent(event)
}