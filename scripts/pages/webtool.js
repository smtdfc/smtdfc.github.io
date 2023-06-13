import(`${BASE_LINK}/scripts/components/navbar.js`)
let tool = getParameterByName("tool")
window.addEventListener("pageready", function() {
	import(`${BASE_LINK}/scripts/components/UserAvatar.js`)
	selector.byId("main").HTML = ""
})