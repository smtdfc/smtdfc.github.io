import(`${BASE_LINK}/scripts/components/AuthPageNavbar.js`)

let registerBtn = selector.byId("register-btn")
let registerNote = selector.byId("register-note")
let redirect = getParameterByName("redirect")
selector.byId("form-register").on("submit", function(e) {
	e.preventDefault()
	registerBtn.disable = true
	registerNote.HTML = ""
	registerNote.classList.add("d-none")
	let inputs = selector.byId("form-register").selectAll("input")
	let username = inputs.index(0)
	let password = inputs.index(1)
	let confirmPassword = inputs.index(2)
	if(password.val != confirmPassword.val){
		registerNote.classList.remove("d-none")
		registerNote.text = "Password not match"
		registerBtn.disable = false
		return 
	}
	Authentication.register(username.val, password.val)
		.then(() => {
			selector.byQuery(".main").classList.add("active")
			window.location =`./login.html?user=${username.val}`
		})

		.catch((err) => {
			registerNote.classList.remove("d-none")
			registerNote.text = err.err.message
		})

		.finally(() => {
			registerBtn.disable = false
		})
})