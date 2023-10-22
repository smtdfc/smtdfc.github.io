const app = new Turtle.TurtleApp(document.getElementById("root"))

async function init() {
	await import("./components/container.js")
	app.render (`
		<main-container></main-container>
	`)
	await import("./router/main.js")
}

init()
