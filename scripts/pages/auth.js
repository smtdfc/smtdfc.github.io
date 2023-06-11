let selector = new Turtle.Selector()
let theme = new Turtle.Storage("theme")
let redirect = getParameterByName("redirect")

selector.byId("username").val = getParameterByName("user") ?? ""
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

selector.byId("form-login").on("submit", async function(event) {
	event.preventDefault()
	let formLogin = selector.byId("form-login")
	let inputs = formLogin.selectAll("input")
	let username = inputs.index(0).val
	let password = inputs.index(1).val
	selector.byId("login-btn").disable = true
	selector.byId("login-note").styles.display = "none"
	Authentication.login(username, password)
		.then((results) => {
			selector.byQuery(".overlay.main").classList.add("active")
			selector.byQuery(".overlay.main").HTML = `
					<div class="mt-75 d-flex justify-content-center"  >
						<div class="dot-loader">
							<span></span>
							<span></span>
							<span></span>
							<span></span>
						</div>
					</div>
					
					`
			if(redirect == null){
				window.location = "./index.html"
			}else{
				window.location = redirect
			}
		})

		.catch((err) => {
			selector.byId("login-note").styles.display = "block"
			selector.byId("login-note").text = err.err.message
		})
		
		.finally(() => {
			selector.byId("login-btn").disable = false
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
	let data = await Authentication.info()
	if(data != null){
		selector.byId("alert").HTML =`
			<div class="alert">
				You are logged in 
			</div>
		`
		
		selector.byQuery(".overlay.main").classList.add("active")
		selector.byQuery(".overlay.main").HTML =`
		<div class="mt-75 d-flex justify-content-center"  >
			<div class="dot-loader">
				<span></span>
				<span></span>
				<span></span>
				<span></span>
			</div>
		</div>
		
		`
		setTimeout(()=>{
			if (redirect == null) {
				window.location = "./index.html"
			} else {
				window.location = redirect
			}
		},3000)
		
	}
}

main()