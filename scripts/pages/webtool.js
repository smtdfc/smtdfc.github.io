import(`${BASE_LINK}/scripts/components/navbar.js`)
import(`${webtoolBase}/scripts/components/ListTool.js`)
let tool = getParameterByName("tool")
let topic = getParameterByName("topic")

function addScript(path) {
	let scriptTag = document.createElement("script")
	scriptTag.src = path
	document.body.appendChild(scriptTag)
}

window.addEventListener("pageready", async function() {
	import(`${BASE_LINK}/scripts/components/UserAvatar.js`)
	selector.byId("main").HTML = ""
	if (!tool) {
		init()
	} else {
		selector.byId("main").HTML = `
			<div class="circle-loader loader-sm "></div>
		`
		try {
			let link = `${webtoolBase}/${topic}/tools/${tool}/main.js`
			addScript(link)
			document.title = `${topic}/${tool}`
			selector.byId("main").HTML = `
				<tool-display></tool-display>
			`
		} catch (err) {
			selector.byId("main").HTML = `
					<div class="text-align-center">
						<h1>Oops!</h1>
						<h3>An error occurred !</h3>
						<br>
						<a class="link btn btn-primary"  href="${BASE_LINK}/webtool.html">Return</a>
					</div>
			`
		}
	}

})

async function init() {
	await getAllTool()
	Object.keys(listTopic).forEach(topicID => {
		selector.byId("main").HTML += `
			<list-tool topic="${topicID}" ></list-tool>
		`
	})
}