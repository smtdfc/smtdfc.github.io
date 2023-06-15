import(`${BASE_LINK}/scripts/components/AuthPageNavbar.js`)

let loginBtn = selector.byId("login-btn")
let loginNote = selector.byId("login-note")
let overlay1 = selector.byId("overlay1")
let redirect = getParameterByName("redirect")
let filledName = getParameterByName("user")

selector.byId("username").val = filledName
window.addEventListener("pageready", function() {
	if(!user){
		overlay1.classList.add("d-none")
	}else{
		window.location = "./index.html"
	}
})

selector.byId("form-login").on("submit",function(e){
	e.preventDefault()
	loginBtn.disable = true
	loginNote.HTML = ""
	loginNote.classList.add("d-none")
	let inputs = selector.byId("form-login").selectAll("input")
	let username = inputs.index(0)
	let password = inputs.index(1)
	app.auth.login(username.val,password.val)
		.then(()=>{
			selector.byQuery(".main").classList.add("active")
			if(!redirect){
				window.location = "./index.html"
			}else{
				window.location = redirect
			}
		})
		
		.catch((err)=>{
			loginNote.classList.remove("d-none")
			loginNote.text = err.message
		})
		
		.finally(()=>{
			loginBtn.disable = false
		})
})