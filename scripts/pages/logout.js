import(`${BASE_LINK}/scripts/components/AuthPageNavbar.js`)
window.addEventListener("pageready", function() {
	if (user) {
		import(`${BASE_LINK}/scripts/components/LogoutConfirm.js`)
		document.body.innerHTML += `
		<logout-confirm></logout-confirm>
	`
	} else {
		window.location = "./index.html"
	}
})