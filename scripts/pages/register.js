let selector = new Turtle.Selector()
let theme = new Turtle.Storage("theme")
let redirect = getParameterByName("redirect")

selector.byId("dark-mode").on("change", async function(event) {
	let value = event.target.checked
	if (value) {
		await theme.set("mode", "dark")
		document.body.style.setProperty("--body-bg", "#1F1B24")
		document.body.style.setProperty("--body-color", "white")
	} else {
		await theme.set("mode", "light")
		document.body.style.setProperty("--body-bg", "#ffffff")
		document.body.style.setProperty("--body-color", "black")
	}
})
selector.byId("form-register").on("submit", async function(event) {
	event.preventDefault()
	let formRegister = selector.byId("form-register")
	let inputs = formRegister.selectAll("input")
	let username = inputs.index(0).val
	let password = inputs.index(1).val
	let confirmPassword = inputs.index(2).val
	selector.byId("register-btn").disable = true
	selector.byId("register-note").styles.display = "none"
	if (password != confirmPassword) {
		selector.byId("register-btn").disable = false
		selector.byId("register-note").styles.display = "block"
		selector.byId("register-note").text = "Password not match"
		return
	}

	Authentication.register(username, password)
		.then((results) => {
			selector.byQuery(".overlay.main").classList.add("active")
			if (redirect == null) {
				window.location = "./index.html"
			} else {
				window.location = redirect
			}
		})

		.catch((err) => {
			selector.byId("register-note").styles.display = "block"
			selector.byId("register-note").text = err.err
		})

		.finally(() => {
			selector.byId("register-btn").disable = false
		})
})
async function main() {
	let mode = await theme.get("mode")
	if (mode == "dark") {
		selector.byId("dark-mode").checked = true
		document.body.style.setProperty("--body-bg", "#1F1B24")
		document.body.style.setProperty("--body-color", "white")
	} else {
		selector.byId("dark-mode").checked = false
		document.body.style.setProperty("--body-bg", "#ffffff")
		document.body.style.setProperty("--body-color", "black")
	}
}

main()